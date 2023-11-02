import {IsNotEmpty, IsString} from "class-validator";

export class PartnershipRequestDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    phoneNumber: string;
}