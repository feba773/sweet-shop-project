// src/models/Sweet.ts

import { Schema, model } from 'mongoose';

// TypeScript interface for a Sweet document
export interface ISweet {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

// Mongoose schema for a Sweet
const sweetSchema = new Schema<ISweet>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
}, { timestamps: true });

const Sweet = model<ISweet>('Sweet', sweetSchema);

export default Sweet;