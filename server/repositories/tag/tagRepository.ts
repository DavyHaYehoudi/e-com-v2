import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";
import { CreateTagDTO } from "../../dto/tag/tag.dto.js";
import { TagRow } from "../../types/tag/tag.js";

export const getAllTagsRepository = async () => {
  const sql = `SELECT * FROM tag`;
  const results = await query<TagRow[]>(sql);
  return results;
};
export const createTagRepository = async (tagData: CreateTagDTO) => {
  const sql = `
    INSERT INTO tag (label)
    VALUES (?)
  `;
  await query(sql, [tagData.label]);
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
