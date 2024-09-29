//profileRepository.ts
import { query } from "../../config/req.js";
import { ResultSetHeader } from "mysql2";
import { ProfileRow } from "./dao/profile.dao.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";
import { FiltersSchemaDTO } from "../../controllers/customer/entities/dto/profile.dto.js";

// Récupérer les données du customer par email pour l'ouverture de session
export const getCustomerByEmailRepository = async (email: string) => {
  const sql = `SELECT * FROM customer WHERE email = ?`;
  const rows = await query<ProfileRow[]>(sql, [email]);
  const customers = rows;
  return customers[0] || null;
};
// Créer un customer
export const addProfileRepository = async (email: string) => {
  const sql = `INSERT INTO customer (email) VALUES (?)`;
  const result = await query<ResultSetHeader>(sql, [email]);
  if (result.affectedRows > 0) {
    return result.insertId;
  } else {
    throw new Error("L'insertion du client a échoué.");
  }
};
// Récupérer les données d'un customer
export const getCustomerByIdRepository = async (customerId: number) => {
  const sql = `
      SELECT *
      FROM customer 
      WHERE id = ?`;

  const rows = await query<ProfileRow[]>(sql, [customerId]);
  const customers = rows;
  return customers[0] || null;
};
// Mettre à jour un customer
export const updateProfileRepository = async (
  customerId: number,
  updatedFields: Record<string, any>
) => {
  const fields = Object.keys(updatedFields)
    .map((field) => `${field} = ?`)
    .join(", ");
  const values = Object.values(updatedFields);

  const sql = `UPDATE customer SET ${fields} WHERE id = ?`;
  await query(sql, [...values, customerId]);
};

// Admin - Récupérer tous les profils customers
export const getAllCustomersRepository = async (filters: FiltersSchemaDTO) => {
  // Initialisation des clauses WHERE
  const conditions: string[] = [];
  const params: any[] = [];

  // Filtre par nom/prénom (recherche partielle)
  if (filters.name) {
    conditions.push(
      `(LOWER(p.first_name) LIKE LOWER(?) OR LOWER(p.last_name) LIKE LOWER(?))`
    );
    params.push(
      `%${filters.name.toLowerCase()}%`,
      `%${filters.name.toLowerCase()}%`
    );
  }

  // Construction de la requête SQL de base
  let sql = `SELECT * FROM customer p`;

  // Ajout des conditions si elles existent
  if (conditions.length > 0) {
    sql += ` WHERE ` + conditions.join(" AND ");
  }

  const rows = await query<ProfileRow[]>(sql, params);
  const customers = rows;

  return customers;
};
// Admin - Récupérer les données de n'importe quel customer
export const getAnyCustomerByIdRepository = async (customerId: number) => {
  const sql = `
      SELECT *
      FROM customer 
      WHERE id = ?`;

  const rows = await query<ProfileRow[]>(sql, [customerId]);
  const customers = rows;
  return customers[0] || null;
};
//Admin - Mettre à jour un customer (désactiver)
export const updateAnyProfileRepository = async (
  customerId: number,
  updatedFields: Record<string, any>
) => {
  const fields = Object.keys(updatedFields)
    .map((field) => `${field} = ?`)
    .join(", ");
  const values = Object.values(updatedFields);
  const sql = `UPDATE customer SET ${fields} WHERE id = ?`;

  const result = await query<ResultSetHeader>(sql, [...values, customerId]);
  if (result.affectedRows === 0) {
    throw new NotFoundError(`Customer with ID ${customerId} not found`);
  }
};
// Admin - Récupérer tous les customer ayant consenti aux emails marketing
export const getCustomersWithEmailMarketingConsentRepository = async () => {
  const sql = `
      SELECT *
      FROM customer 
      WHERE email_marketing_consent = true`;

  const rows = await query<ProfileRow[]>(sql);
  const customers = rows;
  return customers;
};
