import * as mongoose from 'mongoose';

export const DocumentSchema = new mongoose.Schema({
  owner: String,
  name: String,
  filename: String,
  filepath: String,
  recipients: Array,
  activity: Array,
  status: String,
  canvas: Array,
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
