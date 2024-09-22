import { z } from "zod";

// DTO pour la mise à jour du cashback
export const updateCashBackSchema = z.object({
  amountCashBack: z.number(),
  reason: z.enum(['Loyalty', 'Birthday', 'Review', 'Referral', 'Order', 'Other']),
  increase: z.boolean(),
  reviewId: z.number().optional(), // reviewId est optionnel, mais nécessaire si reason = "Review"
}).refine((data) => data.reason !== 'Review' || data.reviewId, {
  message: "reviewId is required when reason is 'Review'",
  path: ['reviewId'],
});

export type UpdateCashBackDto = z.infer<typeof updateCashBackSchema>;
