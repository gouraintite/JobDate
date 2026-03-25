import { z } from 'zod';

const contractTypeEnum = z.enum(['apprenticeship', 'internship', 'CDI', 'CDD']);

export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().datetime(),
  location: z.string().min(1),
  targetDomains: z.array(z.string()).default([]),
  contractTypes: z.array(contractTypeEnum).default([]),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
