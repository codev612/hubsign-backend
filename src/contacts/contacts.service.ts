
import { Injectable,Inject, UnauthorizedException } from '@nestjs/common';
import { Contact } from './interfaces/contact.interface';
import { Model } from 'mongoose';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(@Inject('CONTACT_MODEL') private readonly constactModel: Model<Contact>) {}

  async findAll(user:string): Promise<Contact[]> {
    return this.constactModel.find({user}).exec();
  }

  async findOne(id:string): Promise<Contact[]> {
    return this.constactModel.findById(id);
  }

  async deleteMany(ids:string[]): Promise<Number> {
    console.log("ids", ids);
    const result = await this.constactModel.deleteMany({ _id: { $in: ids } });
    return result.deletedCount;
  }

  async add(
    email: string,
    updateContactDto: UpdateContactDto
  ): Promise<Contact> {
    const contact = await this.constactModel.findOne({email});

    if(!contact) {
        const createdContact = await this.constactModel.create(updateContactDto);
        return createdContact;
    }

    updateContactDto.updatedAt = new Date(); //

    const updatedContact = await this.constactModel.findOneAndUpdate(
      { email }, // Find user by email
      updateContactDto, // Update data
      { new: true } // Return the updated document
    ).exec();

    // console.log(contact)
    return updatedContact;
  }

  async update(
    params: any,
    updateContactDto: UpdateContactDto
  ): Promise<Contact> {
    console.log("params",params)
    updateContactDto.updatedAt = new Date(); //

    const updatedContact = await this.constactModel.findByIdAndUpdate(
      params.id, // Find contact by id
      updateContactDto, // Update data
      { new: true } // Return the updated document
    ).exec();

    // console.log(contact)
    return updatedContact;
  }
}