import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import {
  DuplicateEntryError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import { CreateTagDTO } from "../../controllers/tag/entities/dto/tag.dto.js";
import { TagRow } from "./dao/tag.dao.js";

export const getAllTagsRepository = async () => {
  const sql = `SELECT * FROM tag`;
  const results = await query<TagRow[]>(sql);
  return results;
};
export const createTagRepository = async (
  tagData: CreateTagDTO
): Promise<TagRow> => {
  const sql = `
    INSERT INTO tag (label)
    VALUES (?)
  `;
  try {
    const result = await query<ResultSetHeader>(sql, [tagData.label]);
    const newTagId = result.insertId;
    const sqlSelect = `
     SELECT * FROM tag WHERE id = ?
   `;
    const [newTag] = await query<TagRow[]>(sqlSelect, [newTagId]);
    return newTag;
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new DuplicateEntryError(
        `Tag label '${tagData.label}' already exists`
      );
    }
    throw error;
  }
};

export const deleteTagRepository = async (tagId: number) => {
  const sql = `
        DELETE FROM tag
        WHERE id = ?
      `;
  const result = await query<ResultSetHeader>(sql, [tagId]);

  if (result.affectedRows === 0) {
    throw new NotFoundError(`Tag with ID ${tagId} not found`);
  }
};
