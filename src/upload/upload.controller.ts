import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Bind,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { Express } from 'express';
  import * as fs from 'fs';
  import * as path from 'path';
  
  @Controller('upload')
  export class UploadController {
    @Post('document')
    @UseInterceptors(FileInterceptor('file'))
    @Bind(UploadedFile())
    async uploadFile(file: Express.Multer.File) {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'document');
  
        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
    
        // Create a unique filename to avoid conflicts
        const fileName = `${Date.now()}_${file.originalname}`;
        // Define the file path where the file will be saved
        const filePath = path.join(uploadDir, fileName);
        // Save the file to the server
        fs.writeFile(filePath, file.buffer, (err) => {
            if (err) {
                console.error('Error saving file:', err);
                throw new Error('Error saving file');
            }
            console.log(`File saved to ${filePath}`);
        });
        // Return a success response
        return {
            message: 'File uploaded successfully!',
            filename: fileName,
            filepath: filePath,
        };
    }
  }
  