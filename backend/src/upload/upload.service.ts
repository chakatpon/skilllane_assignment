import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  async uploadFile(file: FileUpload): Promise<string> {
    const { createReadStream, filename } = file;
    const filePath = join(__dirname, '../../uploads', filename);
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(filePath))
        .on('finish', () => resolve(`/uploads/${filename}`))
        .on('error', reject);
    });
  }
}
