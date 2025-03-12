
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
import { Document, DocumentSummary } from './interfaces/document.interface';
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

  // @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('draft/:id')
  findOne(@Param() params: any): Promise<Document[]> {
    return this.documentService.findOne(params.id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('pending')
  findPending(
    @Request() req,
  ): Promise<DocumentSummary[]> {
    return this.documentService.findPending(req.user.email);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete('delete')
  DeleteMany(@Body() uids: string[]): Promise<Number> {
    return this.documentService.deleteMany(uids);
  }

  @UseGuards(AuthGuard)
  @Post('copy')
  Copy(
    @Request() req,
    @Body() uids: string[]
  ): Promise<Document[]> {
    return this.documentService.copy(req.user, uids);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  DeleteOne(@Param() params: any): Promise<Document> {
    return this.documentService.deleteOne(params.id);
  }

  @UseGuards(AuthGuard)
  @Post('add')
  add(
    @Request() req,
    @Body() createDto: CreateDocumentDto
  ) {
    return this.documentService.add(req.user, createDto);
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

  @UseGuards(AuthGuard)
  @Post('savedoc')
  update(
    @Body() updateDto: UpdateDocumentDto
  ) {
    // console.log(updateDocumentDto.uid)
    return this.documentService.update(updateDto);
  }
}
