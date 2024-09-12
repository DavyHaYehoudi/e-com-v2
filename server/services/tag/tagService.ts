import { CreateTagDTO } from "../../dto/tag/tag.dto.js";
import * as tagService from "../../repositories/tag/tagRepository.js";

// Récupérer tous les tags
export const getAllTagsService = async () => {
  return await tagService.getAllTagsRepository();
};

// Créer un nouveau tag
export const createTagService = async (tagData: CreateTagDTO) => {
  const newTag = await tagService.createTagRepository(tagData);
  return newTag;
};

// Supprimer un tag
export const deleteTagService = async (tagId: number) => {
  await tagService.deleteTagRepository(tagId);
};
