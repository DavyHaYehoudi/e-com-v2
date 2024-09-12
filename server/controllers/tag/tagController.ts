import { Request, Response, NextFunction } from "express";
import * as tagService from "../../services/tag/tagService.js";
import { createTagSchema } from "../../dto/tag/tag.dto.js";

// Récupérer tous les tags
export const getAllTagsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await tagService.getAllTagsService();
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

// ADMIN - Créer un nouveau tag
export const createTagController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tagData = createTagSchema.parse(req.body);
    await tagService.createTagService(tagData);
    res.status(201).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ADMIN - Supprimer un tag
export const deleteTagController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tagId = parseInt(req.params.tagId);
    await tagService.deleteTagService(tagId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
