import { Document } from 'mongoose';

export interface Contact extends Document {
    readonly user: string;
    readonly email: string;
    readonly name: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date;
}