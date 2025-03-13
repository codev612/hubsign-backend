import { IsNotEmpty, IsString, IsDate, IsBoolean } from 'class-validator'
export class CreateTemplateDto {
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
    activity: object[];
    @IsNotEmpty()
    @IsBoolean()
    signingOrder: boolean;
    @IsDate()
    createdAt: Date;
}