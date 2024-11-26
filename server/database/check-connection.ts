// check-connection.ts
import pool from "./database.js";

export const checkConnection = async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to the database successfully!');
      connection.release();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to connect to the database:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

