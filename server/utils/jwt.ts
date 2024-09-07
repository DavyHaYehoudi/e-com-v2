import jwt from "jsonwebtoken";
import { environment } from "../types/environment.js";

// Générer un JWT
export const generateToken = (
  customerId: number,
  email: string,
  role: string
): string => {
  const token = jwt.sign(
    { id: customerId, email, role },
    environment.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};

// Vérifier un JWT
export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, environment.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
