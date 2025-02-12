import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SignatureController } from './signature.controller';
import { SignatureService } from './signature.service';
import { signatureProviders } from './signature.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    DatabaseModule, 
    AuthModule,
],
  controllers: [SignatureController],
  providers: [SignatureService, ...signatureProviders],
  exports: [SignatureService], // Export UsersService to be available in other modules
})
export class SignatureModule {}
