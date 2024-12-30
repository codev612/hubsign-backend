
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
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { UpdateContactDto } from './dto/update-contact.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Contact } from './interfaces/contact.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req): Promise<Contact[]> {
    return this.contactService.findAll(req.user.email);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param() params: any): Promise<Contact[]> {
    return this.contactService.findOne(params.id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete()
  DeleteMany(@Body('ids') ids: string[]): Promise<Number> {
    return this.contactService.deleteMany(ids);
  }

  @HttpCode(HttpStatus.OK)
  @Post('update')
  addContact(
    @Body('email') email: string, 
    @Body() updateContactDto: UpdateContactDto
  ) {
    // console.log(req.user.email)
    return this.contactService.add(email, updateContactDto);
  }

  @Post('update/:id')
  updateContact(
    @Param() params: any, 
    @Body() updateContactDto: UpdateContactDto
  ) {
    // console.log(req.user.email)
    return this.contactService.update(params, updateContactDto);
  }
}
