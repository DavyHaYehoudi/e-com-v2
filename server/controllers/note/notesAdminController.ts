import { Request, Response, NextFunction } from "express";
import * as notesAdminService from "../../services/note/notesAdminService.js";
import { updateNotesAdminSchema } from "../../dto/note/notesAdmin.dto.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";

// Admin - Récupérer les notes sur un customer
export const getNotesAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const notes = await notesAdminService.getNotesAdminService(customerId);
    if (!notes) {
      throw new NotFoundError("Notes not found");
    }
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};
//Admin - Mettre à jour les notes d'un customer
export const updateNotesAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const validatedData = updateNotesAdminSchema.parse(req.body);
    await notesAdminService.updateNotesAdminService(customerId, validatedData);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
