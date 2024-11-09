import { RowDataPacket } from "mysql2";

export interface ShippingMethodRow extends RowDataPacket {
  id: number;
  name: string;
  is_active: boolean;
  is_default: boolean;
  is_free: boolean;
  icon_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface ShippingMethodTarifsRow extends RowDataPacket {
  id: number;
  price: number;
  shipping_method_id: number;
  min_weight: number;
  max_weight: number;
  created_at: Date;
  updated_at: Date;
}
export interface ShippingMethodClientFormat extends RowDataPacket {
  id: number;
  name: string;
  icon_url: string;
  price: number;
  min_weight: number;
  max_weight: number;
  is_active: boolean;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface ShippingMethodTarifs extends RowDataPacket {
  price: number;
}
