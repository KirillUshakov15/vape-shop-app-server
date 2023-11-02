import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    imageUrl: string;
}