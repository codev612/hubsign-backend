import { Mongoose } from 'mongoose';
import { SignatureSchema } from './schemas/signature.schema';

export const signatureProviders = [
  {
    provide: 'SIGNATURE_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Signature', SignatureSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];