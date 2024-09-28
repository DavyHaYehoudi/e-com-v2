import { RowDataPacket } from "mysql2";

export interface CampaignRow extends RowDataPacket{
    id: number;
    subject: string;
    content: string;
    send_date: Date | null;
    status: string;
    total_sent: number;
    created_at: Date;
    updated_at: Date;
}