//authRepository.ts
import { query } from "../../config/req.js";
import { AuthRow } from "./dao/auth.dao.js";

// Insérer le code d'authentification
export const storeAuthCodeRepository = async (
  email: string,
  authCode: string,
  expiresAt: Date
) => {
  const sql = `
    INSERT INTO authentication (email, digit_code, expires_at) 
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE digit_code = VALUES(digit_code), expires_at = VALUES(expires_at);
  `;
  await query(sql, [email, authCode, expiresAt]);
};

// Vérifier l'authentification (email + code + expiration)
export const verifyAuthCodeRepository = async (email: string, otp: string) => {
  const sql = `
    SELECT * FROM authentication 
    WHERE email = ? AND digit_code = ? AND expires_at > NOW()
  `;

  const rows = await query<AuthRow[]>(sql, [email, otp]);
  const authRows = rows;
  return authRows?.length > 0;
};
