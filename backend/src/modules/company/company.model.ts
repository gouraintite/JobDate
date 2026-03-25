import { Schema, model, Document, Types } from 'mongoose';

export interface ICompany extends Document {
  userId: Types.ObjectId;
  name: string;
  description?: string;
  logoUrl?: string;
  linkedinUrl?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

const companySchema = new Schema<ICompany>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    logoUrl: { type: String },
    linkedinUrl: { type: String },
    website: { type: String },
  },
  { timestamps: true },
);

export const Company = model<ICompany>('Company', companySchema);
