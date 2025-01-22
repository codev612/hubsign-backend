
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Document } from './interfaces/document.interface';
import { Model } from 'mongoose';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentService {
    constructor(@Inject('DOCUMENT_MODEL') private readonly documentModel: Model<Document>) {}

    async findAll(owner:string): Promise<Document[]> {
        return this.documentModel.find({owner}).exec();
    }

    async findOne(id:string): Promise<Document[]> {
        return this.documentModel.findById(id);
    }

    async deleteMany(ids:string[]): Promise<Number> {
        console.log("ids", ids);
        const result = await this.documentModel.deleteMany({ _id: { $in: ids } });
        return result.deletedCount;
    }

    async add(
        owner: string,
        createDocumentDto: CreateDocumentDto
    ): Promise<Object> {
        try {
            const createdDocument = await this.documentModel.create({ owner, ...createDocumentDto });
            return createdDocument;
        } catch(error) {
            console.log(error);
            throw new UnauthorizedException("Server error");
        }
    }

    async update(
        params: any,
        updateDocumentDto: UpdateDocumentDto
    ): Promise<Document> {
        console.log("params",params)
        updateDocumentDto.updatedAt = new Date(); //

        const updatedDocument = await this.documentModel.findByIdAndUpdate(
        params.id, // Find contact by id
        updateDocumentDto, // Update data
        { new: true } // Return the updated document
        ).exec();

        // console.log(contact)
        return updatedDocument;
    }
}