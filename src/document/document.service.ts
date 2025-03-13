
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Document, DocumentSummary } from './interfaces/document.interface';
import { Model } from 'mongoose';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { generateJWTId } from 'utils/jwt.util';
import { DOCUMENT_ACTION, DOCUMENT_STATUS, INPROGRESS } from 'constants/document';

import * as fs from 'fs';
import * as path from 'path';

interface Owner {
    email: string;
    username: string;
}

@Injectable()
export class DocumentService {
    constructor(@Inject('DOCUMENT_MODEL') private readonly documentModel: Model<Document>) {}

    async findAll(owner:string): Promise<Document[]> {
        return this.documentModel.find({owner}).exec();
    }

    async findPending(owner:string): Promise<DocumentSummary[]> {
        const result = this.documentModel.find({ owner, status: { $ne: DOCUMENT_STATUS.completed } })
                                        .select('uid name owner filename recipients status sentAt activity signing order updatedAt createdAt') // Specify the fields you need
                                        .lean()
                                        .exec();
        return result
    }

    async findCompeted(owner:string): Promise<DocumentSummary[]> {
        const result = this.documentModel.find({ owner, status: DOCUMENT_STATUS.completed })
                                        .select('uid name owner filename recipients status sentAt activity signing order updatedAt createdAt') // Specify the fields you need
                                        .lean()
                                        .exec();
        return result
    }

    async findOne(id:string): Promise<Document[]> {
        return this.documentModel.findOne({uid:id});
    }

    async deleteMany(uids: string[]): Promise<number> {
        // Fetch documents before deleting to get file paths
        const documents = await this.documentModel.find({ uid: { $in: uids } });
    
        // Delete the documents from the database
        const result = await this.documentModel.deleteMany({ uid: { $in: uids } });
    
        // Delete associated files
        documents.forEach((doc) => {
            if (doc.filepath) {
                const filePath = path.resolve(doc.filepath);
                try {
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                        console.log(`File deleted: ${filePath}`);
                    } else {
                        console.log(`File not found: ${filePath}`);
                    }
                } catch (error) {
                    console.error(`Error deleting file: ${error.message}`);
                }
            }
        });
    
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
        owner: Owner,
        createDocumentDto: CreateDocumentDto
    ): Promise<Object> {
        try {
            console.log(owner)
            const uid = generateJWTId();

            createDocumentDto.activity = [{
                action: DOCUMENT_ACTION.created,
                username: owner.username,
                at: Date.now,
            }];

            const createdDocument = await this.documentModel.create({ uid, owner:owner.email, ...createDocumentDto });
            return createdDocument;

        } catch(error) {
            console.log(error);
            return {
                statusCode: 500,
                message: "Server error"
            }
        }
    }

    async copy(owner: Owner, uids: string[]): Promise<Document[]> {
        try {
            console.log("Copying documents with UIDs:", uids);
    
            const originalDocs = await this.documentModel.find({ uid: { $in: uids } }).lean();
            if (!originalDocs.length) {
                return [];
            }
    
            const copiedDocs = await Promise.all(originalDocs.map(async (originalDoc) => {
                const newUid = generateJWTId();
                
                // Remove _id to avoid duplicate key error
                const { _id, name, filepath, ...docData } = originalDoc;
            
                // Find existing copies with a similar name
                const existingCopies = await this.documentModel.find({ name: new RegExp(`^${name}-copy(\\d*)$`, "i") }).lean();
            
                // Determine the highest copy number
                let copyNumber = 1;
                if (existingCopies.length > 0) {
                    const copyNumbers = existingCopies.map(doc => {
                        const match = doc.name.match(/-copy(\d+)$/);
                        return match ? parseInt(match[1], 10) : 1;
                    });
                    copyNumber = Math.max(...copyNumbers) + 1;
                }
            
                // Generate new name with incremented copy number
                const newName = `${name}-copy${copyNumber}`;
    
                // Copy the file if filepath exists
                let newFilePath = "";
                if (filepath) {
                    const ext = path.extname(filepath);
                    const dir = path.dirname(filepath);
                    console.log(ext,dir)
                    newFilePath = path.join(dir, `${Date.now()}_${originalDoc.name}`);
    
                    try {
                        fs.copyFileSync(filepath, newFilePath);
                        console.log(`File copied: ${filepath} -> ${newFilePath}`);
                    } catch (error) {
                        console.error(`Error copying file: ${error.message}`);
                    }
                }
    
                const copiedDoc = {
                    ...docData,
                    uid: newUid,
                    name: newName, // Set new unique name
                    filepath: newFilePath || "", // Set new file path if copied
                    status: DOCUMENT_STATUS.draft,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    activity: [
                        ...(docData.activity || []),
                        {
                            action: DOCUMENT_ACTION.created,
                            username: owner.username, // Ensure owner is accessible
                            at: new Date(),
                        },
                    ],
                };
            
                return this.documentModel.create(copiedDoc);
            }));
    
            return copiedDocs;
        } catch (error) {
            console.error("Error copying documents:", error);
            return [];
        }
    }
    
    async update(
        updateDocumentDto: UpdateDocumentDto
    ): Promise<Document> {
        updateDocumentDto.updatedAt = new Date(); //

        if(updateDocumentDto.status === INPROGRESS) {
            updateDocumentDto.sentAt = new Date();
        }

        const updatedDocument = await this.documentModel.findOneAndUpdate(
            {uid:updateDocumentDto.uid},
            {...updateDocumentDto}
        );

        // console.log(contact)
        return updatedDocument;
    }
}