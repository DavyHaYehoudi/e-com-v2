//req.ts
import mysql from "mysql2/promise";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { environment } from "../environment.js";

// Création du pool de connexions MySQL
const pool = mysql.createPool({
  host: environment.DB_HOST,
  user: environment.DB_USER,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,
});

export const query = async <T extends RowDataPacket[] | ResultSetHeader>(
  sql: string,
  params: any[] = []
): Promise<T> => {
  const [rows] = await pool.execute<T>(sql, params);
  return rows;
};
