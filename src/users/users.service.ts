import { Inject, Injectable, HttpException, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.userModel.create(createUserDto);
    return createdUser;
  }

  async update(userToken: string, updateUserDto: UpdateUserDto): Promise<User> {
    // If a new password is provided, hash it
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashString(updateUserDto.password);
    }
    // Set the updatedAt field to the current date
    updateUserDto.updatedAt = new Date(); //

    const updatedUser = await this.userModel.findOneAndUpdate(
      { userToken }, // Find user by email
      updateUserDto, // Update data
      { new: true } // Return the updated document
    ).exec();

    return updatedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // findOne to search by email
  async findOrCreate(email: string, createUserDto: CreateUserDto): Promise<User | string> {
    const existingUser = await this.userModel.findOne({ email }).exec(); // Check if user already exists

    if (existingUser) {
      // If user exists, throw ConflictException
      // throw new ConflictException('Already existing user');
      return existingUser;
    } else {
      createUserDto.userToken = await this.hashString(email);
      console.log(createUserDto);
      // If user does not exist, create a new user
      const createdUser = await this.create(createUserDto);
      return createdUser;
    }
  }

  private async hashString(sstring: string): Promise<string> {
    const saltRounds = 10; // You can adjust the salt rounds
    return await bcrypt.hash(sstring, saltRounds);
  }
}
