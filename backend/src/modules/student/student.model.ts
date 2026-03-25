import { Schema, model, Document, Types } from 'mongoose';

export interface IStudent extends Document {
  userId: Types.ObjectId;
  firstName: string;
  lastName?: string;
  school?: string;
  domains: string[];
  interests: string[];
  cvUrl?: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  bio?: string;
  qrCodeToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    school: { type: String },
    domains: [{ type: String }],
    interests: [{ type: String }],
    cvUrl: { type: String },
    avatarUrl: { type: String },
    linkedinUrl: { type: String },
    bio: { type: String },
    qrCodeToken: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const Student = model<IStudent>('Student', studentSchema);
