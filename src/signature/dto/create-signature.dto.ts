import { IsEmail, IsNotEmpty, IsString, IsDate, IsBoolean } from 'class-validator'
export class CreateSignatureDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    user:string;
    @IsString()
    @IsNotEmpty()
    dataUrl:string;
    @IsString()
    @IsNotEmpty()
    type:string;
    @IsDate()
    createdAt: Date;
}