import { Injectable } from '@nestjs/common';
import { JWTPayload } from './app.interface';
import { generateJWTId } from 'utils/jwt.util';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to e-Sign system!';
  }

  generateJWTId (): string {
    return generateJWTId();
  };
}
