import { IsEmail, IsNotEmpty, IsString, IsDate, IsBoolean } from 'class-validator'
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
    @IsNotEmpty()
    @IsBoolean()
    signingOrder: boolean;
    activity: object[];
    @IsDate()
    createdAt: Date;
}