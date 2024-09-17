import { JwtPayload } from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

export interface CustomJwtPayload extends JwtPayload {
  id: number;
  email: string;
  role: string;
}

export interface AuthRow extends RowDataPacket {
  email: string;
  digit_code: string;
  expires_at: Date;
}
