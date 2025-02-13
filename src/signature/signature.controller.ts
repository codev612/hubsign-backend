
import { 
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Delete,
    Request,
} from '@nestjs/common';

import { SignatureService } from './signature.service';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { Signature } from './interfaces/signature.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('signature')
export class SignatureController {
  constructor(private signatureService: SignatureService) {}

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  // @Get()
  // findAll(@Request() req): Promise<Document[]> {
  //   return this.documentService.findAll(req.user.email);
  // }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  findOne(
      @Request() req,
  ): Promise<Signature[]> {
      return this.signatureService.findAll(req.user.email, req.query.type);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete()
  DeleteOne(@Body('id') id: string): Promise<Object> {
    return this.signatureService.deleteOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  addSignature(
    @Request() req,
    @Body() createSignatureDto: CreateSignatureDto
  ) {
    createSignatureDto.user = req.user.email;
    return this.signatureService.add(createSignatureDto);
  }
}
