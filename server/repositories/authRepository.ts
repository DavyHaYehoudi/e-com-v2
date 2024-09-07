//authRepository.ts
import { query } from "../config/req.js";
import { AuthRow } from "../types/auth.js";


// Insérer le code d'authentification
export const storeAuthCode = async (
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
export const verifyAuthCode = async (email: string, otp: string) => {
  const sql = `
    SELECT * FROM authentication 
    WHERE email = ? AND digit_code = ? AND expires_at > NOW()
  `;
  
  const rows = await query(sql, [email, otp]);
  const authRows = rows as AuthRow[];
  return authRows?.length > 0;
};
