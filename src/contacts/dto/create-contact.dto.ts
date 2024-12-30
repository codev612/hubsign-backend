import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
export class CreateContactDto {
    user:string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    name: string;
    createdAt: Date;
  }