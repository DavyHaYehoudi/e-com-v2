import { CreateCollectionDTO } from "../../dto/collection/collection.dto";
import * as collectionService from "../../repositories/collection/collectionRepository.js";

// Récupérer toutes les informations sur la collection
export const getAllCollectionsService = async () => {
  return await collectionService.getAllCollectionsRepository();
};

// Créer une nouvelle collection
export const createCollectionService = async (
  collectionData: CreateCollectionDTO
) => {
  const newCollection = await collectionService.createCollectionRepository(
    collectionData
  );
  return newCollection;
};

// Mettre à jour les informations de la collection
export const updateCollectionService = async (
  collectionId: number,
  updatedFields: Record<string, any>
) => {
  await collectionService.updateCollectionRepository(
    collectionId,
    updatedFields
  );
};

// Supprimer une collection
export const deleteCollectionService = async (collectionId: number) => {
  await collectionService.deleteCollectionRepository(collectionId);
};
