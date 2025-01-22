import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
export class CreateDocumentDto {
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
    createdAt: Date;
}