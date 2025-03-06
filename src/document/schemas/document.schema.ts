import { DRAFT } from 'constants/document';
import * as mongoose from 'mongoose';

export const DocumentSchema = new mongoose.Schema({
  uid: String,
  owner: String,
  name: String,
  filename: String,
  filepath: String,
  recipients: Array,
  activity: Array,
  status: {
    type: String,
    default: DRAFT,
  },
  canvas: Array,
  signingOrder: Boolean,
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
