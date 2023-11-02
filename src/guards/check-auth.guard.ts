import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {TokenService} from "../modules/token/token.service";
import {ApiError} from "../api-error/api-error";

@Injectable()
export class CheckAuthGuard implements CanActivate{
    constructor(private readonly tokenService: TokenService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try{
            const authHeader = req.headers.authorization;
            const typeToken = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            const tokenData = this.tokenService.validate(token, process.env.ACCESS_TOKEN_KEY);

            if(!typeToken || !tokenData){
                throw ApiError.Unauthorised();
            }

            req.user = tokenData;
            return true;
        }
        catch{
            throw ApiError.Unauthorised();
        }
    }

}