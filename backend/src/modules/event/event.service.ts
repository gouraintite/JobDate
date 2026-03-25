import { Event } from './event.model';
import { Company } from '../company/company.model';
import { CreateEventDto, UpdateEventDto } from './event.schemas';

export const listEvents = async (filters?: { domain?: string; contractType?: string }) => {
  const query: Record<string, unknown> = { isActive: true };
  if (filters?.domain) query.targetDomains = filters.domain;
  if (filters?.contractType) query.contractTypes = filters.contractType;
  return Event.find(query).populate('companyId', 'name logoUrl linkedinUrl').sort({ date: 1 });
};

export const getEventById = async (id: string) => {
  const event = await Event.findById(id).populate('companyId', 'name logoUrl linkedinUrl description');
  if (!event) throw Object.assign(new Error('Event not found'), { statusCode: 404 });
  return event;
};

export const createEvent = async (userId: string, dto: CreateEventDto) => {
  const company = await Company.findOne({ userId });
  if (!company) throw Object.assign(new Error('Company profile not found'), { statusCode: 404 });
  return Event.create({ ...dto, companyId: company._id });
};

export const updateEvent = async (userId: string, eventId: string, dto: UpdateEventDto) => {
  const company = await Company.findOne({ userId });
  if (!company) throw Object.assign(new Error('Company profile not found'), { statusCode: 404 });

  const event = await Event.findOneAndUpdate(
    { _id: eventId, companyId: company._id },
    { $set: dto },
    { new: true },
  );
  if (!event) throw Object.assign(new Error('Event not found'), { statusCode: 404 });
  return event;
};

export const deleteEvent = async (userId: string, eventId: string) => {
  const company = await Company.findOne({ userId });
  if (!company) throw Object.assign(new Error('Company profile not found'), { statusCode: 404 });

  const event = await Event.findOneAndDelete({ _id: eventId, companyId: company._id });
  if (!event) throw Object.assign(new Error('Event not found'), { statusCode: 404 });
};

export const getCompanyEvents = async (userId: string) => {
  const company = await Company.findOne({ userId });
  if (!company) throw Object.assign(new Error('Company profile not found'), { statusCode: 404 });
  return Event.find({ companyId: company._id }).sort({ date: -1 });
};
