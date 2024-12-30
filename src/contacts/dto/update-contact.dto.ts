import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
export class UpdateContactDto {
    @IsString()
    @IsNotEmpty()
    user: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    name: string;
    updatedAt: Date;
    deletedAt: Date;
  }