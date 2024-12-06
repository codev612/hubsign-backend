import { Document } from 'mongoose';

export interface User extends Document {
    readonly email: string;
    readonly firstname: number;
    readonly lastname: string;
    readonly phonenumber: string;
    readonly password: string;
    readonly role: string;
    readonly status: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date;
}