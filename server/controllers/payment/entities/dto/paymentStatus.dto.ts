import { z } from "zod";

export const paymentStatusSchema = z.object({
  confirmationNumber: z.string(),
  status: z.string(),
});
export type PaymentStatusDTO = z.infer<typeof paymentStatusSchema>;
