import { RowDataPacket } from "mysql2";
import { query } from "../../config/req.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";

export const getPaymentAcceptedRepository = async (
  customerId: number,
  confirmation_number: string
): Promise<void> => {
  // Vérifier que la commande existe et appartient bien au client
  const sqlOrder = `SELECT * FROM \`order\` WHERE confirmation_number = ? AND customer_id = ?`;
  const resultsOrder = await query<RowDataPacket[]>(sqlOrder, [
    confirmation_number,
    customerId,
  ]);

  const orderId = resultsOrder[0].id;
  if (!orderId) {
    throw new NotFoundError("Order not found");
  }

  // Mettre à jour le statut de paiement
  await query(
    `UPDATE \`order\` SET payment_status_id = 1 WHERE confirmation_number = ? AND customer_id = ?`,
    [confirmation_number, customerId]
  );
};
