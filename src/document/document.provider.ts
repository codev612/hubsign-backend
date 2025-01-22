import { Mongoose } from 'mongoose';
import { DocumentSchema } from './schemas/document.schema';

export const documentProviders = [
  {
    provide: 'DOCUMENT_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Document', DocumentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];