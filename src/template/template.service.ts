
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Template, TemplateSummary } from './interface/template.interface';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { generateJWTId } from 'utils/jwt.util';
import { DOCUMENT_ACTION, INPROGRESS } from 'constants/document';

import * as fs from 'fs';
import * as path from 'path';

interface Owner {
    email: string;
    username: string;
}

@Injectable()
export class TemplateService {
    constructor(@Inject('TEMPLATE_MODEL') private readonly dbModel: Model<Template>) {}

    async findAll(owner:string): Promise<Template[]> {
        return this.dbModel.find({owner}).exec();
    }

    async findOne(id:string): Promise<Template[]> {
        return this.dbModel.findOne({uid:id});
    }

    async deleteMany(uids: string[]): Promise<number> {
        // Fetch documents before deleting to get file paths
        const documents = await this.dbModel.find({ uid: { $in: uids } });
    
        // Delete the documents from the database
        const result = await this.dbModel.deleteMany({ uid: { $in: uids } });
    
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

    async deleteOne(uid:string): Promise<Template> {
        console.log("ids", uid);
        const result = await this.dbModel.findOneAndDelete({uid});
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
        createDto: CreateTemplateDto
    ): Promise<Object> {
        try {
            const uid = generateJWTId();
            const template = await this.dbModel.findOne({name:createDto.name});
            if(template) {
                return {
                    statusCode: 500,
                    message: "Already exist"
                }
            }
            console.log(createDto);

            const createdTemplate = await this.dbModel.create({ uid, owner, ...createDto });
            return createdTemplate;
        } catch(error) {
            console.log(error);
            return {
                statusCode: 500,
                message: "Server error"
            }
        }
    }

    async copy(owner: Owner, uids: string[]): Promise<Template[]> {
        try {    
            const originalDocs = await this.dbModel.find({ uid: { $in: uids } }).lean();
            if (!originalDocs.length) {
                return [];
            }
    
            const copiedDocs = await Promise.all(originalDocs.map(async (originalDoc) => {
                const newUid = generateJWTId();
                
                // Remove _id to avoid duplicate key error
                const { _id, name, ...docData } = originalDoc;
            
                // Find existing copies with a similar name
                const existingCopies = await this.dbModel.find({ name: new RegExp(`^${name}-copy(\\d*)$`, "i") }).lean();
            
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
            
                const copiedDoc = {
                    ...docData,
                    uid: newUid,
                    name: newName, // Set new unique name
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            
                return this.dbModel.create(copiedDoc);
            }));
                      
    
            return copiedDocs;
        } catch (error) {
            console.error("Error copying templates:", error);
            return [];
        }
    }

    async update(
        updateTemplateDto: UpdateTemplateDto
    ): Promise<Template> {
        updateTemplateDto.updatedAt = new Date();

        const updatedDocument = await this.dbModel.findOneAndUpdate(
            {uid:updateTemplateDto.uid},
            {...updateTemplateDto}
        );

        // console.log(contact)
        return updatedDocument;
    }
}