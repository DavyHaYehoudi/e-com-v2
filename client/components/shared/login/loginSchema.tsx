// loginSchema.ts

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("L'email doit être valide"),
  otp: z.string().length(6, "Le code OTP doit avoir 6 chiffres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
