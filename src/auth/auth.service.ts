
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService
  ) {} 

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    // const hashedPassword = await this.hashString(pass);
    if(!user) {
      throw new UnauthorizedException("User not found");
    }

    if(!user.password){
      throw new UnauthorizedException("Complete your signup");
    }

    const match = await this.comparePassword(pass, user.password || "");

    if (!match) {
      throw new UnauthorizedException("Invalid password");
    }

    const payload = { sub:user._id, email: user.email, username: `${user.firstname} ${user.lastname}` };

    return {
        access_token: await this.jwtService.signAsync(payload,{ expiresIn: '10days' }),
    };
  }

  private async comparePassword(pass: string, hashedPassword: string): Promise<string> {
    const match = await bcrypt.compare(pass, hashedPassword);
    return match; // returns true if passwords match, false otherwise
  }

  async getUser(
    email: string,
  ): Promise<User> {
    const user = await this.usersService.findOne(email);
    return user;
  }
}