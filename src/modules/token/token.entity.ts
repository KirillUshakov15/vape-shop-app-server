import {Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {IUser} from "../user/IUser";

@Entity('tokens')
export class TokenEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    refreshToken: string;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: IUser;
}