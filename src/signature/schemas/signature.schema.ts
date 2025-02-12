import * as mongoose from 'mongoose';

export const SignatureSchema = new mongoose.Schema({
  user: String,
  dataUrl: String,
  type: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
