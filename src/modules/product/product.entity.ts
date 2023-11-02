import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('products')
export class ProductEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({nullable: true, default: null})
    imageUrl: string;
}