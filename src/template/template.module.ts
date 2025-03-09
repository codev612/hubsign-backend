import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { templateProviders } from './template.provider';

import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    DatabaseModule, 
    AuthModule,
],
  controllers: [TemplateController],
  providers: [TemplateService, ...templateProviders],
  exports: [TemplateService], // Export UsersService to be available in other modules
})
export class TemplateModule {}
