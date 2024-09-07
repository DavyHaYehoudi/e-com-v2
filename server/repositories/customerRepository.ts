//customerRepository.ts
import { query } from "../config/req.js";
import { ResultSetHeader } from "mysql2";
import { CustomerRow } from "../types/customer.js";

// Récupérer les données du customer par email avec option pour les colonnes souhaitées
export const getCustomerByEmail = async (email: string) => {
  const sql = `SELECT * FROM customer WHERE email = ?`;
  const rows = await query(sql, [email]);
  const customers = rows as CustomerRow[];
  return customers[0] || null;
};

// Créer un customer
export const addCustomer = async (email: string) => {
  const sql = `INSERT INTO customer (email) 
                 VALUES (?)`;
  const result = await query(sql, [email]);
  return result;
};

//Mettre à jour un customer
export const updateCustomer = async (
  customerId: number,
  updatedFields: Record<string, any>
) => {
  const fields = Object.keys(updatedFields)
    .map((field) => `${field} = ?`)
    .join(", ");
  const values = Object.values(updatedFields);

  const sql = `UPDATE customer SET ${fields} WHERE id = ?`;
  const result = (await query(sql, [...values, customerId])) as ResultSetHeader;

  return result;
};
