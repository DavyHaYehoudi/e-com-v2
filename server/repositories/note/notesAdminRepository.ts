import { query } from "../../config/req.js";
import { NotesAdminRow } from "./dao/notesAdmin.dao.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";
import { ProfileRow } from "../customer/dao/profile.dao.js";

export const getNotesAdminRepository = async (customerId: number) => {
  const sql1 = `SELECT * FROM customer WHERE id = ?`;
  const isCustomerExists = await query<ProfileRow[]>(sql1, [customerId]);

  if (isCustomerExists.length===0) {
    throw new NotFoundError(`Customer with ID ${customerId} not found`);
  }
  const sql2 = `
        SELECT *
        FROM notes_admin 
        WHERE customer_id = ?`;

  const rows = await query<NotesAdminRow[]>(sql2, [customerId]);
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
