import { RowDataPacket } from 'mysql2';

export interface AddressRow extends RowDataPacket {
  id: number;
  company: string;
  email: string;
  phone: string;
  street_number: string;
  address1: string;
  address2: string;
  city: string;
  postal_code: string;
  country: string;
  customer_id: number;
}