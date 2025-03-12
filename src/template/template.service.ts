
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Template, TemplateSummary } from './interface/template.interface';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { generateJWTId } from 'utils/jwt.util';
import { INPROGRESS } from 'constants/document';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TemplateService {
    constructor(@Inject('TEMPLATE_MODEL') private readonly dbModel: Model<Template>) {}

    async findAll(owner:string): Promise<Template[]> {
        return this.dbModel.find({owner}).exec();
    }

    async findPending(owner:string): Promise<TemplateSummary[]> {
        const result = this.dbModel.find({ owner })
                                        .select('uid name owner recipients status sentAt activity signing order') // Specify the fields you need
                                        .lean()
                                        .exec();
        return result
    }

    async findOne(id:string): Promise<Template[]> {
        return this.dbModel.findOne({uid:id});
    }

    async deleteMany(ids:string[]): Promise<Number> {
        const result = await this.dbModel.deleteMany({ _id: { $in: ids } });
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

    async update(
        updateTemplateDto: UpdateTemplateDto
    ): Promise<Template> {
        updateTemplateDto.updatedAt = new Date(); //
        console.log(updateTemplateDto.status);
        if(updateTemplateDto.status === INPROGRESS) updateTemplateDto.sentAt = new Date();

        const updatedDocument = await this.dbModel.findOneAndUpdate(
            {uid:updateTemplateDto.uid},
            {...updateTemplateDto}
        );

        // console.log(contact)
        return updatedDocument;
    }
}