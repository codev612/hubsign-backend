import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contacts/contacts.module';
import { UploadModule } from './upload/upload.module';
import { DocumentModule } from './document/document.module';
import { SignatureModule } from './signature/signature.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables from .env file
    UsersModule, 
    AuthModule,
    ContactModule,
    UploadModule,
    DocumentModule,
    SignatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
