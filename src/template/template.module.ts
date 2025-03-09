import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
// import { TemplateController } from './document.controller';
import { TemplateController } from './template.controller';
// import { DocumentService } from './document.service';
import { TemplateService } from './template.service';
// import { documentProviders } from './document.provider';
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
export class DocumentModule {}
