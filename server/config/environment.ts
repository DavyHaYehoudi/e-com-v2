import dotenv from 'dotenv';
dotenv.config();

interface Environment {
  PORT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PASS: string;
}

export const environment: Environment = {
  PORT: Number(process.env.PORT),
  DB_HOST: process.env.DB_HOST as string,
  DB_USER: process.env.DB_USER as string,
  DB_PASS: process.env.DB_PASS as string,
};

