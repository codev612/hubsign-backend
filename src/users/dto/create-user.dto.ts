import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    userToken: String;
    firstname: string;
    lastname: string;
    phonenumber: string;
    password: string;
    role: string;
    status: string;
    createdAt: Date;
  }