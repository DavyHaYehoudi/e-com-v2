import * as z from "zod";

export const AuthSchema = z
  .object({
    email: z.string().email(),
    confirmEmail: z.string().email(),
    otp: z.string().min(6).max(6),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Les emails doivent correspondre.",
    path: ["confirmEmail"],
  });

export type AuthFormValues = z.infer<typeof AuthSchema>;