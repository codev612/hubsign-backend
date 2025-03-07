import { IsEmail, IsNotEmpty, IsString, IsDate, IsBoolean } from 'class-validator'
export class UpdateDocumentDto {
    @IsString()
    @IsNotEmpty()
    uid:string;
    @IsNotEmpty()
    name:string;
    @IsString()
    @IsNotEmpty()
    filename:string;
    @IsString()
    @IsNotEmpty()
    filepath:string;
    @IsString()
    @IsNotEmpty()
    status: string;
    advanced: object;
    cc: string[];
    autoReminder: object;
    customExpDay: number;
    canvas: object[];
    @IsNotEmpty()
    recipients: string[];
    @IsNotEmpty()
    @IsBoolean()
    signingOrder: boolean;
    @IsNotEmpty()
    @IsDate()
    updatedAt: Date;
    @IsNotEmpty()
    @IsDate()
    sentAt: Date;
}