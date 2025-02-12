
import { 
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Delete,
    Request,
    NotFoundException,
    Res
} from '@nestjs/common';
import { Express, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { DocumentService } from './document.service';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Document } from './interfaces/document.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  // @Get()
  // findAll(@Request() req): Promise<Document[]> {
  //   return this.documentService.findAll(req.user.email);
  // }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param() params: any): Promise<Document[]> {
    return this.documentService.findOne(params.id);
  }

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  // @Delete()
  // DeleteMany(@Body('ids') ids: string[]): Promise<Number> {
  //   return this.documentService.deleteMany(ids);
  // }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('add')
  addDocument(
    @Request() req,
    @Body() createDocumentDto: CreateDocumentDto
  ) {
    return this.documentService.add(req.user.email, createDocumentDto);
  }

  @Get('pdf/:filename')
  async getPdf(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'uploads', 'document', filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`,
    });

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }

  // @Post('update/:id')
  // updateContact(
  //   @Param() params: any, 
  //   @Body() updateDocumentDto: UpdateDocumentDto
  // ) {
  //   // console.log(req.user.email)
  //   return this.documentService.update(params, updateDocumentDto);
  // }
}
