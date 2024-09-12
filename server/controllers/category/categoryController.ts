import { Request, Response, NextFunction } from "express";
import * as categoryService from "../../services/category/categoryService.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../../dto/category/category.dto.js";

// Récupérer toutes les informations sur la catégorie
export const getAllCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getAllCategoriesService();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// ADMIN - Créer une nouvelle catégorie
export const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryData = createCategorySchema.parse(req.body);
    await categoryService.createCategoryService(categoryData);
    res.status(201).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ADMIN - Mettre à jour les informations de la catégorie
export const updateCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const categoryData = updateCategorySchema.parse(req.body);
    await categoryService.updateCategoryService(categoryId, categoryData);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

// ADMIN - Supprimer une catégorie
export const deleteCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    await categoryService.deleteCategoryService(categoryId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
