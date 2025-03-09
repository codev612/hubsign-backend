
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

import { TemplateService } from './template.service';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { Template, TemplateSummary } from './interface/template.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('document')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  // @Get()
  // findAll(@Request() req): Promise<Document[]> {
  //   return this.documentService.findAll(req.user.email);
  // }

  // @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('draft/:id')
  findOne(@Param() params: any): Promise<Template[]> {
    return this.templateService.findOne(params.id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('pending')
  findPending(
    @Request() req,
  ): Promise<TemplateSummary[]> {
    return this.templateService.findPending(req.user.email);
  }

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  // @Delete()
  // DeleteMany(@Body('ids') ids: string[]): Promise<Number> {
  //   return this.documentService.deleteMany(ids);
  // }

  @UseGuards(AuthGuard)
  @Delete(':id')
  DeleteOne(@Param() params: any): Promise<Template> {
    return this.templateService.deleteOne(params.id);
  }

  @UseGuards(AuthGuard)
  @Post('add')
  addOne(
    @Request() req,
    @Body() createDto: CreateTemplateDto
  ) {
    return this.templateService.add(req.user.email, createDto);
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
  updateOne(
    @Body() updateDto: UpdateTemplateDto
  ) {
    // console.log(updateDocumentDto.uid)
    return this.templateService.update(updateDto);
  }
}
