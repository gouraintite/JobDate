import { Schema, model, Document, Types } from 'mongoose';

export type ContractType = 'apprenticeship' | 'internship' | 'CDI' | 'CDD';

export interface IEvent extends Document {
  companyId: Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  location: string;
  targetDomains: string[];
  contractTypes: ContractType[];
  linkedinUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    targetDomains: [{ type: String }],
    contractTypes: [{ type: String, enum: ['apprenticeship', 'internship', 'CDI', 'CDD'] }],
    linkedinUrl: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Event = model<IEvent>('Event', eventSchema);
