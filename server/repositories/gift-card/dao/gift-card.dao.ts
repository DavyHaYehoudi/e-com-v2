import { RowDataPacket } from "mysql2";

export interface GiftCardRow extends RowDataPacket {
  id: number;
  first_holder_id: number | null; // Peut être NULL si le détenteur est supprimé
  code: string;
  initial_value: number;
  balance: number | null;
  is_issued_by_admin: boolean;
  expiration_date: string;
  order_id: number | null; // Peut être NULL si la carte est émise par admin
  created_at: string;
  updated_at: string;
}

export interface GiftCardUsageRow extends RowDataPacket {
  id: number; // Identifiant unique de l'utilisation
  gift_card_id: number; // Référence à la carte cadeau utilisée
  used_by_customer_id: number; // Référence au client ayant utilisé la carte cadeau
  amount_used: number; // Montant dépensé avec la carte cadeau
  used_at: Date; // Date et heure d'utilisation de la carte
  created_at: Date; // Date et heure de création de l'enregistrement
  updated_at: Date; // Date et heure de dernière mise à jour de l'enregistrement
}

export interface firstHolderIdRow extends RowDataPacket {
  id: number; // Identifiant unique de first_holder_id
}
export interface giftCardBalanceRow extends RowDataPacket {
  id: number;
  balance: number;
}
