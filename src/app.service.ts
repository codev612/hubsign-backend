import { Injectable } from '@nestjs/common';
import { JWTPayload } from './app.interface';
import { generateJWTId } from 'utils/jwt.util';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to hubSign system!';
  }

  generateJWTId (): string {
    return generateJWTId();
  };
}
