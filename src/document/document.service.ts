
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Document } from './interfaces/document.interface';
import { Model } from 'mongoose';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { generateJWTId } from 'utils/jwt.util';
import { INPROGRESS } from 'constants/document';

@Injectable()
export class DocumentService {
    constructor(@Inject('DOCUMENT_MODEL') private readonly documentModel: Model<Document>) {}

    async findAll(owner:string): Promise<Document[]> {
        return this.documentModel.find({owner}).exec();
    }

    async findOne(id:string): Promise<Document[]> {
        return this.documentModel.findOne({uid:id});
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
            const uid = generateJWTId();
            const createdDocument = await this.documentModel.create({ uid, owner, ...createDocumentDto });
            return createdDocument;
        } catch(error) {
            console.log(error);
            return {
                statusCode: 500,
                message: "Server error"
            }
        }
    }

    async update(
        updateDocumentDto: UpdateDocumentDto
    ): Promise<Document> {
        updateDocumentDto.updatedAt = new Date(); //

        const updatedDocument = await this.documentModel.findOneAndUpdate(
            {uid:updateDocumentDto.uid},
            {canvas:updateDocumentDto.canvas, status: INPROGRESS}
        )

        // console.log(contact)
        return updatedDocument;
    }
}