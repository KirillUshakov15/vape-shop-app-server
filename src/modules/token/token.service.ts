import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {TokenRepository} from "./token.repository";
import {ApiError} from "../../api-error/api-error";

@Injectable()
export class TokenService{

    constructor(
        private readonly jwt: JwtService,
        private readonly tokenRepository: TokenRepository,
    ) {}

    public async generate(payload) {
        const {password, avatarUrl, online, ...userData} = payload;

        const accessToken = this.jwt.sign(userData, {secret: process.env.ACCESS_TOKEN_KEY, expiresIn: '15m'})
        const refreshToken = this.jwt.sign(userData, {secret: process.env.REFRESH_TOKEN_KEY, expiresIn: '30d'})

        await this.tokenRepository.save(refreshToken, userData.id);

        return {
            userData,
            accessToken,
            refreshToken
        }
    }

    public validate(token: string, key: string){
        try {
            if(!token) throw ApiError.Unauthorised();

            return this.jwt.verify(token, {secret: key})
        }
        catch {
            return null
        }
    }

    public async find(refreshToken: string){
        return this.tokenRepository.find(refreshToken)
    }

    public async delete(refreshToken: string){
        return this.tokenRepository.delete(refreshToken)
    }
}