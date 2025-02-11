import { Document as MDocument } from 'mongoose';

export interface Document extends MDocument {
    readonly owner: string;
    readonly name: string;
    readonly filename: string;
    readonly filepath: string;
    readonly status: string;
    readonly signingOrder: boolean;
    readonly recipients: string[];
    readonly activity: object[];
    readonly canvas: object[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date;
}