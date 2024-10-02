import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import {
  DuplicateEntryError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import { CreateCategoryDTO } from "../../controllers/category/entities/dto/category.dto.js";
import { CategoryRow } from "./dao/category.dao.js";
import { CollectionRow } from "../collection/dao/collection.dao.js";

export const getAllCategoriesRepository = async () => {
  const sql = `SELECT * FROM category`;
  const results = await query<CategoryRow[]>(sql);
  return results;
};
export const createCategoryRepository = async (
  categoryData: CreateCategoryDTO
): Promise<CategoryRow> => {
  const collectionId = categoryData.parent_collection_id;
  const sql1 = `SELECT * FROM collection WHERE id = ?`;
  const isCollectionExists = await query<CollectionRow[]>(sql1, [collectionId]);
  if (isCollectionExists.length === 0) {
    throw new NotFoundError(`Collection with ID ${collectionId} not found`);
  }
  const sql2 = `
        INSERT INTO category (label, parent_collection_id, is_archived)
        VALUES (?, ?, ?)
      `;
  try {
    const result = await query<ResultSetHeader>(sql2, [
      categoryData.label,
      categoryData.parent_collection_id,
      categoryData.is_archived,
    ]);
    const newCategoryId = result.insertId;
    const sql3 = `
     SELECT * FROM category WHERE id =?
   `;
    const [newCategory] = await query<CategoryRow[]>(sql3, [newCategoryId]);
    return newCategory;
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new DuplicateEntryError(
        `Category label '${categoryData.label}' already exists`
      );
    }
    throw error;
  }
};

export const updateCategoryRepository = async (
  categoryId: number,
  updatedFields: Record<string, any>
) => {
  // Véfification de l'id de la collection passé éventuellement pour modification
  const collectionId = updatedFields?.parent_collection_id;
  if (collectionId) {
    const sql2 = `SELECT * FROM collection WHERE id = ?`;
    const isCollectionExists = await query<CollectionRow[]>(sql2, [
      collectionId,
    ]);
    if (isCollectionExists.length === 0) {
      throw new NotFoundError(`Collection with ID ${collectionId} not found`);
    }
  }
  const fields = Object.keys(updatedFields)
    .map((field) => `${field} = ?`)
    .join(", ");
  const values = Object.values(updatedFields);
  const sql1 = `UPDATE category SET ${fields} WHERE id = ?`;
  try {
    const result = await query<ResultSetHeader>(sql1, [...values, categoryId]);
    if (result.affectedRows === 0) {
      throw new NotFoundError(`Category with ID ${categoryId} not found`);
    }
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new DuplicateEntryError(
        `Category label '${updatedFields.label}' already exists`
      );
    }
    throw error;
  }
};

export const deleteCategoryRepository = async (categoryId: number) => {
  const sql = `
        DELETE FROM category
        WHERE id = ?
      `;
  const result = await query<ResultSetHeader>(sql, [categoryId]);

  if (result.affectedRows === 0) {
    throw new NotFoundError(`Category with ID ${categoryId} not found`);
  }
};
