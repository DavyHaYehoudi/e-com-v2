import { Request, Response, NextFunction } from "express";
import * as collectionService from "../../services/collection/collectionService.js";
import {
  createCollectionSchema,
  updateCollectionSchema,
} from "../../dto/collection/collection.dto.js";

// Récupérer toutes les informations sur la collection
export const getAllCollectionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collections = await collectionService.getAllCollectionsService();
    if (!collections) {
      return res.status(404).json({ error: "Collections not found" });
    }
    res.json(collections);
  } catch (error) {
    next(error);
  }
};

// ADMIN - Créer une nouvelle collection
export const createCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collectionData = createCollectionSchema.parse(req.body);
    await collectionService.createCollectionService(collectionData);
    res.status(201).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ADMIN - Mettre à jour les informations de la collection
export const updateCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collectionId = parseInt(req.params.collectionId);
    const collectionData = updateCollectionSchema.parse(req.body);
    await collectionService.updateCollectionService(
      collectionId,
      collectionData
    );
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

// ADMIN - Supprimer une collection
export const deleteCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collectionId = parseInt(req.params.collectionId);
    await collectionService.deleteCollectionService(collectionId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
