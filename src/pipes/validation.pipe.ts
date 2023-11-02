import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {ApiError} from "../api-error/api-error";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any>{
    async transform(value: any, metadata: ArgumentMetadata): Promise<any>{
        if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
            return value;
        }

        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);

        if(errors.length){
            let messages = errors.map(err => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`
            })
            console.log(messages)
            throw ApiError.BadRequest('Ошибка при валидации данных');
        }
        return value
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}