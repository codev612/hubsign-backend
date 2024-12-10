import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
export class UpdateUserDto {
    firstname: string;
    lastname: string;
    phonenumber: string;
    password: string;
    role: string;
    status: string;
    updatedAt: Date;
    deletedAt: Date;
  }