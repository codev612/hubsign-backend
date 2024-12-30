import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { constactProviders } from './contacts.provider';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule, 
    AuthModule,
],
  controllers: [ContactsController],
  providers: [ContactsService, ...constactProviders],
  exports: [ContactsService], // Export UsersService to be available in other modules
})
export class ContactModule {}
