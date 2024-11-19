import { RowDataPacket } from "mysql2";

export interface RowPaymentsStatus extends RowDataPacket {
  id: number;
  label: string;
  color: string;
}
