import { z } from 'zod';

export const updateCompanySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().max(1000).optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
});

export type UpdateCompanyDto = z.infer<typeof updateCompanySchema>;
