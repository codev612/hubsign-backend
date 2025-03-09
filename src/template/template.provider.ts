import { Mongoose } from 'mongoose';
import { TemplateSchema } from './schemas/template.schema';

export const templateProviders = [
  {
    provide: 'TEMPLATE_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Template', TemplateSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];