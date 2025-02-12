import { Document as MDocument } from 'mongoose';

export interface Signature extends MDocument {
    readonly user: string;
    readonly dataUrl: string;
    readonly type: string;
    readonly createdAt: Date;
}