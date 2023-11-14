import {IsNotEmpty, IsString} from "class-validator";

export class EditProductDto{
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    imageUrl: string;
}