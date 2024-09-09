import pool from "../database/database.js";

// Démarrer une transaction
export const beginTransaction = async () => {
    await pool.query('START TRANSACTION');
  };
  
  export const commitTransaction = async () => {
    await pool.query('COMMIT');
  };
  
  export const rollbackTransaction = async () => {
    await pool.query('ROLLBACK');
  };