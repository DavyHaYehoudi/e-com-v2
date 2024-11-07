import { z } from "zod";

export const paymentAcceptedQuerySchema = z.object({
  confirmation_number: z
    .string()
    .nonempty("Le champ confirmation_number est requis"),
});
export type paymentAcceptedQueryDTO = z.infer<
  typeof paymentAcceptedQuerySchema
>;
