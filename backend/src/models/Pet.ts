import mongoose, { Document, Schema, Types } from 'mongoose';


export interface IPet extends Document {
  owner: Types.ObjectId; 
  name: string;
  species: 'Dog' | 'Cat' | 'Bird' | 'Other';
  breed: string;
  age: number; 
  weight: number; 
  gender: 'Male' | 'Female';
  medicalHistory: string[];
  createdAt: Date;
  updatedAt: Date;
}

const petSchema = new Schema<IPet>(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    species: { type: String, enum: ['Dog', 'Cat', 'Bird', 'Other'], required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    medicalHistory: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IPet>('Pet', petSchema);