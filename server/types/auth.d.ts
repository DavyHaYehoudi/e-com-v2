import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
  id: number;
  email: string;
  role: string;
}

export interface AuthRow {
  email: string;
  digit_code: string;
  expires_at: Date;
}