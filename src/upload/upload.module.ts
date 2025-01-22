
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule
  ],
  providers: [
  ],
  controllers: [UploadController],
  exports: [
  ],
})

export class UploadModule {}
