import {Body, Controller, Get, Post, Req, Res, UsePipes} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthUserDto} from "./dto/auth-user.dto";
import {Response, Request} from "express";
import {PartnershipRequestDto} from "./dto/partnership-request.dto";
import {ValidationPipe} from "../../pipes/validation.pipe";

@Controller('auth')
export class AuthController{

    constructor(private readonly authService: AuthService) {}

    @Post('/check-email')
    async checkEmail(@Body('email') email: string){
        return await this.authService.checkEmail(email)
    }

    @Post('/login')
    async login(@Body() authUserDto: AuthUserDto, @Res({ passthrough: true }) res: Response){
        const data = await this.authService.login(authUserDto)
        this.authService.saveCookie(res, data.refreshToken)
        return data;
    }

    @Get('/logout')
    async logout(@Req() req: Request){
        const {token} = req.cookies;
        return await this.authService.logout(token);
    }

    @Get('/refresh-access')
    async refreshAccess(@Req() req: Request, @Res({ passthrough: true }) res: Response){
        const {token} = req.cookies;
        const data = await this.authService.refreshAccess(token);
        this.authService.saveCookie(res, data.refreshToken)
        return data;
    }

    @Post('/partnership-request')
    @UsePipes(ValidationPipe)
    async sendPartnershipRequest(@Body() dto: PartnershipRequestDto){
        return await this.authService.sendPartnershipRequest(dto)
    }

}