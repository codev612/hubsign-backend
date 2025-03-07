import { DEFAULT_EXP_DAY, DEFAULT_FIRST_REMIND_DAY, DEFAULT_REPEAT_REMIND_DAY, DRAFT } from 'constants/document';
import * as mongoose from 'mongoose';

export const DocumentSchema = new mongoose.Schema({
  uid: String,
  owner: String,
  name: String,
  filename: String,
  filepath: String,
  recipients: Array,
  activity: Array,
  advanced: {
    type: Object,
    default: {
      cc: false,
      autoReminder: false,
      customExpDay: false,
    }
  },
  cc: Array,
  autoReminder: {
    type: Object,
    default: {
      first: DEFAULT_FIRST_REMIND_DAY,
      repeat: DEFAULT_REPEAT_REMIND_DAY,
    }
  },
  customExpDay: {
    type: Number,
    default: DEFAULT_EXP_DAY,
  },
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
  sentAt: {
    type: Date
  },
  deletedAt: {
    type: Date,
  },
});
