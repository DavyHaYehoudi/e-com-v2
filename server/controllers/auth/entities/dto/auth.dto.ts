import { z } from 'zod';

export const authRequestSchema = z.object({
  email: z.string().email(), // Valide que c'est une chaîne de caractères et un email valide
  otp: z.string().length(6), // Valide que le OTP est une chaîne de 6 caractères
});

export type AuthRequestDTO = z.infer<typeof authRequestSchema>;
