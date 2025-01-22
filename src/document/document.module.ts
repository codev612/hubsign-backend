import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { documentProviders } from './document.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    DatabaseModule, 
    AuthModule,
],
  controllers: [DocumentController],
  providers: [DocumentService, ...documentProviders],
  exports: [DocumentService], // Export UsersService to be available in other modules
})
export class DocumentModule {}
