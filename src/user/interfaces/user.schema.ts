import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    userForeignKey: { type: String, unique: true },
    userPhoto: { type: String },
    cardPhoto: { type: String },
    phoneNumber: { type: String },
    name: { type: String },
    gender: { type: String },
  },
  { timestamps: true, collection: 'users' },
);
