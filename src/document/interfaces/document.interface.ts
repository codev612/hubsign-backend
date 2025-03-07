import { Document as MDocument } from 'mongoose';

export interface Document extends MDocument {
    readonly owner: string;
    readonly name: string;
    readonly filename: string;
    readonly filepath: string;
    readonly status: string; //"draft"|"inprogress"|"completed"
    readonly signingOrder: boolean;
    readonly recipients: string[];
    readonly activity: object[];
    readonly advanced: object;
    readonly cc: string[];
    readonly autoReminder: object;
    readonly customExpDay: number;
    readonly canvas: object[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly sentAt: Date;
    readonly deletedAt: Date;
}

export interface DocumentSummary {
    // uid: string;
    name: string;
    status: string;
    recipients: string[];
    activity: object[];
    sentAt: Date;
}