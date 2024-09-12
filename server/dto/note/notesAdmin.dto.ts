import { z } from "zod";


export const updateNotesAdminSchema = z.object({
    notes_admin: z.string()
  });

export type NotesAdminInputDTO = z.infer<
  typeof updateNotesAdminSchema
>;