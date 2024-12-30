import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema({
  user: String,
  email: String,
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
  },
});
