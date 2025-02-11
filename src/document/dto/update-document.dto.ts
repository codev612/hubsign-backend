import { IsEmail, IsNotEmpty, IsString, IsDate, IsBoolean } from 'class-validator'
export class UpdateDocumentDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsString()
    @IsNotEmpty()
    filename:string;
    @IsString()
    @IsNotEmpty()
    filepath:string;
    @IsNotEmpty()
    recipients: string[];
    @IsString()
    @IsNotEmpty()
    status: string;
    @IsNotEmpty()
    canvas: object[];
    @IsNotEmpty()
    @IsBoolean()
    signingOrder: boolean;
    @IsNotEmpty()
    @IsDate()
    updatedAt: Date;
}