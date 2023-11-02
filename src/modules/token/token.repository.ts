import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TokenEntity} from "./token.entity";
import {Repository} from "typeorm";

@Injectable()
export class TokenRepository{

    constructor(
        @InjectRepository(TokenEntity)
        private readonly tokenEntity: Repository<TokenEntity>
    ) {}

    public async save(refreshToken: string, userID: string){
        const token = await this.tokenEntity.findOneBy({user: {id: userID}});

        if(token){
            token.refreshToken = refreshToken;
            return await this.tokenEntity.save(token);
        }

        const newToken = this.tokenEntity.create({
            refreshToken: refreshToken, user: {id: userID}
        })
        return await this.tokenEntity.save(newToken)
    }

    public async find(refreshToken: string){
        return await this.tokenEntity.findOneBy({refreshToken})
    }

    public async delete(refreshToken: string){
        return await this.tokenEntity.delete({refreshToken})
    }
}