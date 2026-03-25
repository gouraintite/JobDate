import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().optional(),
  school: z.string().optional(),
  domains: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  bio: z.string().max(500).optional(),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
