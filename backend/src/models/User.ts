// src/models/User.ts

import { Schema, model } from 'mongoose';

// TypeScript interface for a User document
export interface IUser {
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
}

// Mongoose schema for a User
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const User = model<IUser>('User', userSchema);

export default User;