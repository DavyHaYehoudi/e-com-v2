import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import { CreateCollectionDTO } from "../../controllers/collection/entities/dto/collection.dto.js";
import { CollectionRow } from "./dao/collection.dao.js";
import {
  DuplicateEntryError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";

export const getAllCollectionsRepository = async () => {
  const sql = `SELECT * FROM collection`;
  const results = await query<CollectionRow[]>(sql);
  return results;
};
export const createCollectionRepository = async (
  collectionData: CreateCollectionDTO
): Promise<CollectionRow> => {
  const sql = `
        INSERT INTO collection (label, image_url, is_star, is_archived)
        VALUES (?, ?, ?, ?)
      `;
  try {
    const result = await query<ResultSetHeader>(sql, [
      collectionData.label,
      collectionData.image_url,
      collectionData.is_star,
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
