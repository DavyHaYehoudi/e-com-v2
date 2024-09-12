import { query } from "../../config/req.js";
import { NotesAdminRow } from "../../types/note/notesAdmin.js";

export const getNotesAdminRepository = async (customerId: number) => {
  const sql = `
        SELECT *
        FROM notes_admin 
        WHERE customer_id = ?`;

  const rows = await query<NotesAdminRow[]>(sql, [customerId]);
  const customers = rows;
  return customers[0] || null;
};

export const updateNotesAdminRepository = async (
  customerId: number,
  notesAdminData: Record<string, any>
) => {
  const sql = `
      UPDATE notes_admin 
      SET notes_admin = ?
      WHERE customer_id = ? 
    `;
  await query(sql, [notesAdminData.notes_admin, customerId]);
};

export const createNotesAdminRepository = async (
  customerId: number,
  notesAdminData: Record<string, any>
) => {
  const sql = `
      INSERT INTO notes_admin (notes_admin, customer_id)
      VALUES (?, ?)
    `;
  await query(sql, [notesAdminData.notes_admin, customerId]);
};
