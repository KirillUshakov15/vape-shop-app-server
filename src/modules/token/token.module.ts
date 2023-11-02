import {Module} from "@nestjs/common";
import {TokenService} from "./token.service";
import {TokenRepository} from "./token.repository";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TokenEntity} from "./token.entity";

@Module({
    providers: [TokenService, TokenRepository],
    imports: [
        JwtModule.register({}),
        TypeOrmModule.forFeature([
            TokenEntity
        ]),
    ],
    exports: [TokenService]
})
export class TokenModule {}