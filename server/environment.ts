import dotenv from "dotenv";
dotenv.config();

interface Environment {
  PORT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  JWT_SECRET: string;

  PORT_SESSION: number;
  HOST_SESSION: string;
  EMAIL_USERNAME_SESSION: string;
  EMAIL_PASSWORD_SESSION: string;

  PORT_PAYMENT: number;
  HOST_PAYMENT: string;
  EMAIL_USERNAME_PAYMENT: string;
  EMAIL_PASSWORD_PAYMENT: string;

  PORT_MARKETING: number;
  HOST_MARKETING: string;
  EMAIL_USERNAME_MARKETING: string;
  EMAIL_PASSWORD_MARKETING: string;
}

export const environment: Environment = {
  PORT: Number(process.env.PORT),
  DB_HOST: process.env.DB_HOST as string,
  DB_USER: process.env.DB_USER as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_NAME: process.env.DB_NAME as string,
  JWT_SECRET: (process.env.JWT_SECRET as string) || "my-secret-key",

  PORT_SESSION: Number(process.env.PORT_SESSION),
  HOST_SESSION: process.env.HOST_SESSION as string,
  EMAIL_USERNAME_SESSION: process.env.EMAIL_USERNAME_SESSION as string,
  EMAIL_PASSWORD_SESSION: process.env.EMAIL_PASSWORD_SESSION as string,

  PORT_PAYMENT: Number(process.env.PORT_PAYMENT),
  HOST_PAYMENT: process.env.HOST_PAYMENT as string,
  EMAIL_USERNAME_PAYMENT: process.env.EMAIL_USERNAME_PAYMENT as string,
  EMAIL_PASSWORD_PAYMENT: process.env.EMAIL_PASSWORD_PAYMENT as string,

  PORT_MARKETING: Number(process.env.PORT_MARKETING),
  HOST_MARKETING: process.env.HOST_MARKETING as string,
  EMAIL_USERNAME_MARKETING: process.env.EMAIL_USERNAME_MARKETING as string,
  EMAIL_PASSWORD_MARKETING: process.env.EMAIL_PASSWORD_MARKETING as string,
};
