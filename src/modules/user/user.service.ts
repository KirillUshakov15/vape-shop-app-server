import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>
    ) {}

    async create(email: string){
        const candidate = await this.userEntity.findOne({where: {email}})

        if(!candidate) await this.userEntity.save({email})
    }

    async setPassword(email: string, password: string){
        return await this.userEntity.update({email}, {password})
    }

    async findByEmail(email: string){
        return await this.userEntity.findOne({where: {email}})
    }
}