import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import { CreateCollectionDTO } from "../../dto/collection/collection.dto.js";
import { CollectionRow } from "../../types/collection/collection.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";

export const getAllCollectionsRepository = async () => {
  const sql = `SELECT * FROM collection`;
  const results = await query<CollectionRow[]>(sql);
  return results;
};
export const createCollectionRepository = async (
  collectionData: CreateCollectionDTO
) => {
  const sql = `
        INSERT INTO collection (name, image_url, is_star)
        VALUES (?, ?, ?)
      `;
  await query(sql, [
    collectionData.name,
    collectionData.image_url,
    collectionData.is_star,
  ]);
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
  const result = await query<ResultSetHeader>(sql, [...values, collectionId]);

  // Vérification si une collection a été mise à jour
  if (result.affectedRows === 0) {
    throw new NotFoundError(`Collection with ID ${collectionId} not found`);
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
