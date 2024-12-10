import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  password: String,
  role: String,
  status: String,
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
