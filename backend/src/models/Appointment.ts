import mongoose, { Document, Schema, Types } from 'mongoose';


export interface IAppointment extends Document {
  pet: Types.ObjectId;   
  owner: Types.ObjectId; 
  vet?: Types.ObjectId;  
  date: Date;
  timeSlot: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  vetNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}


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