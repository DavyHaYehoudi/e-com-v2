import jwt from "jsonwebtoken";
import { environment } from "../types/environment.js";

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

