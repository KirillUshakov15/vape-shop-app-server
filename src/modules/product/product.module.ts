import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductEntity} from "./product.entity";
import {ProductController} from "./product.controller";
import {ProductService} from "./product.service";
import {TokenModule} from "../token/token.module";

@Module({
    controllers: [ProductController],
    providers: [ProductService],
    imports: [
        TokenModule,
        TypeOrmModule.forFeature([
            ProductEntity
        ])
    ]
})
export class ProductModule {}