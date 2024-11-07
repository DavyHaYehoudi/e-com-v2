import { z } from "zod";

export const paymentAcceptedQuerySchema = z.object({
  bodyData: z
    .string()
    .nonempty("Le champ bodyData est requis"),
});

export type paymentAcceptedQueryDTO = z.infer<typeof paymentAcceptedQuerySchema>;
