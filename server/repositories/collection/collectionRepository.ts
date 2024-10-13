import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import { CreateCollectionDTO } from "../../controllers/collection/entities/dto/collection.dto.js";
import { CollectionRow } from "./dao/collection.dao.js";
import {
  DuplicateEntryError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";

export const getAllCollectionsRepository = async () => {
  const sql = `
    SELECT 
      c.id AS collection_id, 
      c.label AS collection_label, 
      c.is_archived AS collection_is_archived, 
      c.created_at AS collection_created_at, 
      c.updated_at AS collection_updated_at,
      cat.id AS category_id, 
      cat.label AS category_label, 
      cat.is_archived AS category_is_archived, 
      cat.created_at AS category_created_at, 
      cat.updated_at AS category_updated_at
    FROM 
      collection c
    LEFT JOIN 
      category cat ON c.id = cat.parent_collection_id
    WHERE 
      c.is_archived = false AND (cat.is_archived = false OR cat.id IS NULL)
  `;

  const results = await query<CollectionRow[]>(sql);

  // Organisation des résultats pour regrouper les catégories sous leur collection
  const collectionsMap: { [key: number]: any } = {};

  results.forEach((row) => {
    const {
      collection_id,
      collection_label,
      collection_is_archived,
      collection_created_at,
      collection_updated_at,
      category_id,
      category_label,
      category_is_archived,
      category_created_at,
      category_updated_at,
    } = row;

    // Si la collection n'existe pas encore dans le map, on l'ajoute
    if (!collectionsMap[collection_id]) {
      collectionsMap[collection_id] = {
        id: collection_id,
        label: collection_label,
        is_archived: collection_is_archived,
        created_at: collection_created_at,
        updated_at: collection_updated_at,
        categories: [], // Initialisation d'un tableau pour les catégories
      };
    }

    // Si une catégorie est associée à cette collection, on l'ajoute
    if (category_id) {
      collectionsMap[collection_id].categories.push({
        id: category_id,
        label: category_label,
        is_archived: category_is_archived,
        created_at: category_created_at,
        updated_at: category_updated_at,
      });
    }
  });

  // Conversion du map en tableau
  return Object.values(collectionsMap);
};
export const createCollectionRepository = async (
  collectionData: CreateCollectionDTO
): Promise<CollectionRow> => {
  const sql = `
        INSERT INTO collection (label, is_archived)
        VALUES (?, ?)
      `;
  try {
    const result = await query<ResultSetHeader>(sql, [
      collectionData.label,
      collectionData.is_archived,
    ]);
    const newCollectionId = result.insertId;
    const sqlSelect = `
         SELECT * FROM collection WHERE id =?
       `;
    const [newCollection] = await query<CollectionRow[]>(sqlSelect, [
      newCollectionId,
    ]);
    return newCollection;
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new DuplicateEntryError(
        `Collection label '${collectionData.label}' already exists`
      );
    }
    throw error;
  }
};
export const updateCollectionRepository = async (
  collectionId: number,
  updatedFields: Record<string, any>
) => {
  const fields = Object.keys(updatedFields)
    .map((field) => `${field} = ?`)
    .join(", ");
  const values = Object.values(updatedFields);
  const sql = `UPDATE collection SET ${fields} WHERE id = ?`;
  try {
    const result = await query<ResultSetHeader>(sql, [...values, collectionId]);

    if (result.affectedRows === 0) {
      throw new NotFoundError(`Collection with ID ${collectionId} not found`);
    }
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new DuplicateEntryError(
        `Collection label '${updatedFields.label}' already exists`
      );
    }
    throw error;
  }
};

export const deleteCollectionRepository = async (collectionId: number) => {
  const sql = `
        DELETE FROM collection
        WHERE id = ?
      `;
  const result = await query<ResultSetHeader>(sql, [collectionId]);

  if (result.affectedRows === 0) {
    throw new NotFoundError(`Collection with ID ${collectionId} not found`);
  }
};
