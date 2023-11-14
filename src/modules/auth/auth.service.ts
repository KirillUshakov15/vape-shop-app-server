import {Injectable} from "@nestjs/common";
import {Response} from "express";
import {TokenService} from "../token/token.service";
import {trustedEmails} from "./trusted-emails";
import {MailService} from "../mail/mail.service";
import * as bcrypt from "bcryptjs"
import {ApiError} from "../../api-error/api-error";
import {AuthUserDto} from "./dto/auth-user.dto";
import {UserService} from "../user/user.service";
import {PartnershipRequestDto} from "./dto/partnership-request.dto";

@Injectable()
export class AuthService{

    constructor(
        private readonly tokenService: TokenService,
        private readonly mailService: MailService,
        private readonly userService: UserService
    ) {}

    async checkEmail(email: string){
        if(!trustedEmails.includes(email)){
            throw ApiError.NotFound('Указанный Вами email не найден')
        }

        const {generatedPassword, passwordHash} = await this.generatePassword();
        await this.userService.create(email)
        await this.userService.setPassword(email, passwordHash)
        await this.mailService.sendPassword(email, generatedPassword)
    }

    private async generatePassword(){
        const generatedPassword = Math.random().toString(36).slice(-8);
        const passwordHash = await bcrypt.hash(generatedPassword, 5);

        return {
            generatedPassword,
            passwordHash
        }
    }

    async login(authUserDto: AuthUserDto){
        const {email, password} = authUserDto;
        const user = await this.userService.findByEmail(email);

        if(user && user.password){
            const passwordsIsEqual = await bcrypt.compare(password, user.password);

            if(passwordsIsEqual){
                return await this.tokenService.generate(user)
            }
        }

        throw ApiError.BadRequest('Неверный email или пароль')
    }

    async logout(refreshToken: string){
        const userData = await this.tokenService.validate(refreshToken, process.env.REFRESH_TOKEN_KEY)
        await this.userService.setPassword(userData.email, null)
        await this.tokenService.delete(refreshToken)
    }

    async refreshAccess(refreshToken: string){
        if(!refreshToken) throw ApiError.Unauthorised()

        const tokenIsExist = await this.tokenService.find(refreshToken);
        const tokenIsValid = await this.tokenService.validate(refreshToken, process.env.REFRESH_TOKEN_KEY)

        if(!tokenIsValid || !tokenIsExist) throw ApiError.Unauthorised()

        const user = await this.userService.findByEmail(tokenIsValid.email);
        return this.tokenService.generate(user);
    }

    async sendPartnershipRequest(dto: PartnershipRequestDto){
        await this.mailService.sendPartnershipMail(dto);
    }

    saveCookie(res: Response, refreshToken: string){
        res.cookie('token', refreshToken, { httpOnly: true, secure: false });
    }
}