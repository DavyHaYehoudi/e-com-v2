import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface RowOrdersStatus extends RowDataPacket {
    id: number;
    label: string;
    color: string;
  }
  