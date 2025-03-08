
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Document, DocumentSummary } from './interfaces/document.interface';
import { Model } from 'mongoose';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { generateJWTId } from 'utils/jwt.util';
import { INPROGRESS } from 'constants/document';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocumentService {
    constructor(@Inject('DOCUMENT_MODEL') private readonly documentModel: Model<Document>) {}

    async findAll(owner:string): Promise<Document[]> {
        return this.documentModel.find({owner}).exec();
    }

    async findPending(owner:string): Promise<DocumentSummary[]> {
        const result = this.documentModel.find({ owner })
                                        .select('uid name owner recipients status sentAt activity') // Specify the fields you need
                                        .lean()
                                        .exec();
        console.log(result);
        return result
    }

    async findOne(id:string): Promise<Document[]> {
        return this.documentModel.findOne({uid:id});
    }

    async deleteMany(ids:string[]): Promise<Number> {
        const result = await this.documentModel.deleteMany({ _id: { $in: ids } });
        return result.deletedCount;
    }

    async deleteOne(uid:string): Promise<Document> {
        console.log("ids", uid);
        const result = await this.documentModel.findOneAndDelete({uid});
        console.log(result.filepath);
        if (result && result.filepath) {
            const filePath = path.resolve(result.filepath);
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath); // Delete the file
                    console.log(`File deleted: ${filePath}`);
                } else {
                    console.log(`File not found: ${filePath}`);
                }
            } catch (error) {
                console.error(`Error deleting file: ${error.message}`);
            }
        } else {
            console.log("Document not found or has no file path");
        }

        return result;
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
        console.log(updateDocumentDto.status);
        if(updateDocumentDto.status === INPROGRESS) updateDocumentDto.sentAt = new Date();

        const updatedDocument = await this.documentModel.findOneAndUpdate(
            {uid:updateDocumentDto.uid},
            {...updateDocumentDto}
        );

        // console.log(contact)
        return updatedDocument;
    }
}