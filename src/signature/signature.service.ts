
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Signature } from './interfaces/signature.interface';
import { Model } from 'mongoose';
import { CreateSignatureDto } from './dto/create-signature.dto';

@Injectable()
export class SignatureService {
    constructor(@Inject('SIGNATURE_MODEL') private readonly signatureModel: Model<Signature>) {}

    async findAll(user:string, type: string): Promise<Signature[]> {
        return this.signatureModel.find({user, type}).exec();
    }

    async deleteOne(id:string): Promise<Object>{
        return this.signatureModel.findByIdAndDelete(id).exec();
    }

    async add(
        createSignatureDto: CreateSignatureDto
    ): Promise<Object> {
        try {
            const createdSignature = await this.signatureModel.create({ ...createSignatureDto });
            return createdSignature;
        } catch(error) {
            console.log(error);
            return {
                statusCode: 500,
                message: "Server error"
            }
        }
    }
}