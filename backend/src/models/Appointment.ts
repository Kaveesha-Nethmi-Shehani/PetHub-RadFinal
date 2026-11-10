import mongoose, { Document, Schema, Types } from 'mongoose';

// 1. TypeScript Interface
export interface IAppointment extends Document {
  pet: Types.ObjectId;   // Relation to Pet
  owner: Types.ObjectId; // Relation to User (Owner)
  vet?: Types.ObjectId;  // Relation to User (Vet/Doctor)
  date: Date;
  timeSlot: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  vetNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Mongoose Schema
const appointmentSchema = new Schema<IAppointment>(
  {
    pet: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vet: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    vetNotes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IAppointment>('Appointment', appointmentSchema);