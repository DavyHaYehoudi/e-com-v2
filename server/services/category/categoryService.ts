import { CreateCategoryDTO } from "../../dto/category/category.dto.js";
import * as categoryService from "../../repositories/category/categoryRepository.js";

// Récupérer toutes les informations sur la catégorie
export const getAllCategoriesService = async () => {
  return await categoryService.getAllCategoriesRepository();
};

// Créer une nouvelle catégorie
export const createCategoryService = async (
  categoryData: CreateCategoryDTO
) => {
  const newCategory = await categoryService.createCategoryRepository(
    categoryData
  );
  return newCategory;
};

// Mettre à jour les informations de la catégorie
export const updateCategoryService = async (
  categoryId: number,
  updatedFields: Record<string, any>
) => {
  await categoryService.updateCategoryRepository(categoryId, updatedFields);
};

// Supprimer une catégorie
export const deleteCategoryService = async (categoryId: number) => {
  await categoryService.deleteCategoryRepository(categoryId);
};
