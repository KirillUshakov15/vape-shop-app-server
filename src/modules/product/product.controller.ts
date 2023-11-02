import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post, Query,
    UploadedFile,
    UseGuards,
    UseInterceptors, UsePipes
} from "@nestjs/common";
import {CreateProductDto} from "./dto/create-product.dto";
import {ProductService} from "./product.service";
import {IProduct} from "./IProduct";
import {EditProductDto} from "./dto/edit-product.dto";
import {CheckAuthGuard} from "../../guards/check-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {FileType, storage} from "../../file-uploader/storage";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {QueryProductDto} from "./dto/query-product.dto";
import {ProductEntity} from "./product.entity";

@Controller('product')
export class ProductController{

    constructor(private readonly productService: ProductService) {}

    @Post('/')
    @UseGuards(CheckAuthGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('image', storage(FileType.IMAGE)))
    async create(
        @UploadedFile() image: Express.Multer.File,
        @Body() createDto: CreateProductDto
    ){
        return await this.productService.create({...createDto, imageUrl: image?.filename})
    }

    @Get('/all')
    async getAll(@Query() queryDto: QueryProductDto): Promise<IProduct[]>{
        return await this.productService.getAll(queryDto)
    }

    @Patch('/')
    @UseGuards(CheckAuthGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('image', storage(FileType.IMAGE)))
    async edit(
        @UploadedFile() image: Express.Multer.File,
        @Body() editDto: EditProductDto
    ){
        return await this.productService.edit({...editDto, imageUrl: image?.filename})
    }

    @Delete('/:id')
    @UseGuards(CheckAuthGuard)
    async delete(@Param('id') id: string){
        return await this.productService.delete(id)
    }

}