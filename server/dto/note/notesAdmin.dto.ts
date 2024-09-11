import { z } from "zod";


export const updateNotesAdminSchema = z.object({
    notes_admin: z.string()
  });

export type NotesAdminInputSchema = z.infer<
  typeof updateNotesAdminSchema
>;