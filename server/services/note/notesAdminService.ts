import { NotesAdminInputDTO } from "../../dto/note/notesAdmin.dto.js";
import * as notesAdminRepository from "../../repositories/note/notesAdminRepository.js";

// Admin - Récupérer les notes sur un customer
export const getNotesAdminService = async (customerId: number) => {
  return await notesAdminRepository.getNotesAdminRepository(customerId);
};
//Admin - Mettre à jour les notes d'un customer
export const updateNotesAdminService = async (
  customerId: number,
  notesAdminData: NotesAdminInputDTO
) => {
  const isNotesAdmin = await notesAdminRepository.getNotesAdminRepository(
    customerId
  );

  if (isNotesAdmin) {
    await notesAdminRepository.updateNotesAdminRepository(
      customerId,
      notesAdminData
    );
  } else {
    await notesAdminRepository.createNotesAdminRepository(
      customerId,
      notesAdminData
    );
  }
};
