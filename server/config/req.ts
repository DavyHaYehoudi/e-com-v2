//req.ts
import mysql from 'mysql2/promise';
import { environment } from '../types/environment.js';

// Création du pool de connexions MySQL
const pool = mysql.createPool({
  host: environment.DB_HOST,
  user: environment.DB_USER,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME
});

// Exécuter une requête SQL et retourner les résultats
export const query = async (sql: string, params: any[] = []) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};


