import {Injectable} from "@nestjs/common";
import {CreateProductDto} from "./dto/create-product.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "./product.entity";
import {Repository} from "typeorm";
import {IProduct} from "./IProduct";
import {EditProductDto} from "./dto/edit-product.dto";
import * as fs from 'fs';
import {QueryProductDto} from "./dto/query-product.dto";

@Injectable()
export class ProductService{

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productEntity: Repository<ProductEntity>
    ) {}

    async create(createDto: CreateProductDto){
        return await this.productEntity.save(createDto);
    }

    async getAll(queryDto: QueryProductDto): Promise<IProduct[]>{
        const {searchText} = queryDto

        let products = await this.productEntity.find()

        if(searchText)
            products = products.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()))

        return products;
    }

    async edit(editDto: EditProductDto){
        const {id, imageUrl} = editDto

        const product = await this.productEntity.findOne({where: {id}})
        if(product.imageUrl && imageUrl) fs.unlinkSync(`./uploads/images/${product.imageUrl}`)

        await this.productEntity.update({id}, {...editDto})
        return await this.productEntity.findOne({where: {id}})
    }

    async delete(id: string){
        const product = await this.productEntity.findOne({where: {id}})
        if(product.imageUrl) fs.unlinkSync(`./uploads/images/${product.imageUrl}`)
        return await this.productEntity.delete(id)
    }
}