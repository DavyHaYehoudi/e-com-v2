import { z } from "zod";
import { parseISO, isValid, isBefore, isAfter } from "date-fns";

// Définir les dates limites pour l'anniversaire
const MIN_BIRTHDAY_DATE = new Date(1900, 0, 1); // 1900-01-01
const MAX_BIRTHDAY_DATE = new Date(); // Aujourd'hui

// Fonction utilitaire pour vérifier si une date est valide et dans une plage
const isValidBirthdayInRange = (dateString: string) => {
  const parsedDate = parseISO(dateString);
  if (!isValid(parsedDate)) return false;
  return (
    isAfter(parsedDate, MIN_BIRTHDAY_DATE) &&
    isBefore(parsedDate, MAX_BIRTHDAY_DATE)
  );
};

export const updateCustomerProfileSchema = z
  .object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(/^\d+$/, "Phone number should contain only digits.")
      .length(10)
      .optional(), // Numéro de téléphone doit être de 10 chiffres
    email_marketing_consent: z.boolean().optional(),
    birthday: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date format must be YYYY-MM-DD.")
      .refine(isValidBirthdayInRange, {
        message: "La date d'anniversaire doit être entre 1900 et aujourd'hui.",
      })
      .optional(),
  })
  .strict();

export type ProfileInputDTO = z.infer<typeof updateCustomerProfileSchema>;

export const updateAnyCustomerProfileSchema = z.object({
  is_active: z.boolean().optional(),
});
export type ProfileInputReservedAdminDTO = z.infer<
  typeof updateAnyCustomerProfileSchema
>;
