import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [UploadService, UploadResolver],
  exports: [UploadService],
})
export class UploadModule {}
