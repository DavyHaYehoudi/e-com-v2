// database.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { environment } from '../environment.js';

dotenv.config();

const pool = mysql.createPool({
  host: environment.DB_HOST,
  user: environment.DB_USER,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  socketPath: '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock'
});

export default pool;
