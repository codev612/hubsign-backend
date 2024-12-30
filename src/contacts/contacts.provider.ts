import { Mongoose } from 'mongoose';
import { ContactSchema } from './schemas/contact.schema';

export const constactProviders = [
  {
    provide: 'CONTACT_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Contact', ContactSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];