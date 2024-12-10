import { Controller, Get, Post, Body, Header } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body('email') email: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(email, updateUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @Post('/emailcheck')
  // async findOne(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }

  @Post('/emailcheck')
  async findOne(
    @Body('email') email: string, 
    @Body() createUserDto: CreateUserDto // Include the DTO in the body for creating a new user
  ): Promise<User | string> {
    const result = await this.usersService.findOrCreate(email, createUserDto);
    return result;
  }
}