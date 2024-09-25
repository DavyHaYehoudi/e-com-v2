import { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "../../config/req.js";
import { BadRequestError } from "../../exceptions/CustomErrors.js";
import { OrderRow, OrderTrackingRow } from "./dao/order.dao.js";
import {
  OrderFiltersDTO,
  OrderInputDTO,
  OrderTrackingAdminDTO,
  OrderTrackingCustomerDTO,
} from "../../controllers/order/entities/dto/order.dto.js";

// ADMIN - Récupérer toutes les commandes
export const getAllOrdersRepository = async (filters: OrderFiltersDTO) => {
  let sql = `
    SELECT
      o.*,
      os.label AS order_status_label,
      ps.label AS payment_status_label
    FROM \`order\` o
    JOIN order_status os ON o.order_status_id = os.id
    JOIN payment_status ps ON o.payment_status_id = ps.id
    WHERE 1=1
  `;
  const params: any[] = [];

  // Ajout des filtres dynamiquement
  if (filters.customerId) {
    sql += ` AND customer_id = ?`;
    params.push(filters.customerId);
  }

  if (filters.order_status_id) {
    sql += ` AND order_status_id = ?`;
    params.push(filters.order_status_id);
  }

  if (filters.payment_status_id) {
    sql += ` AND payment_status_id = ?`;
    params.push(filters.payment_status_id);
  }

  if (filters.confirmation_number) {
    sql += ` AND confirmation_number = ?`;
    params.push(filters.confirmation_number);
  }

  // Exécution de la requête SQL avec les filtres appliqués
  const results = await query<OrderRow[]>(sql, params);
  return results;
};
// ADMIN CUSTOMER - Récupérer toutes les commandes d'un client
export const getOrdersOneCustomerRepository = async (customerId: number) => {
  // Vérification si le customerId existe dans la base de données
  const checkSql = `SELECT id FROM customer WHERE id = ? LIMIT 1`;
  const checkResult = await query<RowDataPacket[]>(checkSql, [customerId]);

  if (checkResult.length === 0) {
    throw new BadRequestError(`Customer with ID ${customerId} does not exist.`);
  }
  const sql = `
  SELECT
    o.*,
    os.label AS order_status_label,
    ps.label AS payment_status_label
  FROM \`order\` o
  JOIN order_status os ON o.order_status_id = os.id
  JOIN payment_status ps ON o.payment_status_id = ps.id
  WHERE o.customer_id = ?
`;
  const results = await query<OrderRow[]>(sql, [customerId]);
  return results;
};
// ADMIN CUSTOMER - Récupérer une commande en particulier
export const getOneOrderFromAdminRepository = async (orderId: number) => {
  const sql = `
    SELECT
      o.*,
      os.label AS order_status_label,
      ps.label AS payment_status_label
    FROM \`order\` o
    JOIN order_status os ON o.order_status_id = os.id
    JOIN payment_status ps ON o.payment_status_id = ps.id
    WHERE o.id = ?
  `;
  const results = await query<OrderRow[]>(sql, [orderId]);

  if (results.length === 0) {
    throw new BadRequestError(`Order with ID ${orderId} does not exist.`);
  }

  return results[0];
};
// CUSTOMER - Récupérer une commande en particulier
export const getOneOrderFromCustomerRepository = async (
  orderId: number,
  customerId: number
) => {
  const sql = `
    SELECT
      o.*,
      os.label AS order_status_label,
      ps.label AS payment_status_label
    FROM \`order\` o
    JOIN order_status os ON o.order_status_id = os.id
    JOIN payment_status ps ON o.payment_status_id = ps.id
    WHERE o.id = ? AND o.customer_id = ?
  `;
  const results = await query<OrderRow[]>(sql, [orderId, customerId]);

  if (results.length === 0) {
    throw new BadRequestError(`Order with ID ${orderId} does not exist.`);
  }

  return results[0];
};
// ADMIN - Modifier une commande
export const updateOrderRepository = async (
  orderId: number,
  updates: OrderInputDTO
) => {
  // Vérification si l'orderId existe dans la base de données
  const checkSql = `SELECT id FROM \`order\` WHERE id = ? LIMIT 1`;
  const checkResult = await query<RowDataPacket[]>(checkSql, [orderId]);

  if (checkResult.length === 0) {
    throw new BadRequestError(`Order with ID ${orderId} does not exist.`);
  }

  // Mise à jour de la commande (sans 'notes_admin' car la colonne a été supprimée)
  let sql = `UPDATE \`order\` SET `;
  const params: any[] = [];

  if (updates.order_status_id !== undefined) {
    sql += `order_status_id = ?, `;
    params.push(updates.order_status_id);
  }

  if (updates.payment_status_id !== undefined) {
    sql += `payment_status_id = ?, `;
    params.push(updates.payment_status_id);
  }

  // Retirer la dernière virgule et espace si nécessaire
  if (params.length > 0) {
    sql = sql.slice(0, -2);
    sql += ` WHERE id = ?`;
    params.push(orderId);

    // Exécution de la requête de mise à jour de la commande
    await query(sql, params);
  }

  // Si 'notes_admin' est présent, insérer ou mettre à jour la note dans la table 'notes_admin_on_order'
  if (updates.notes_admin !== undefined) {
    const notesSql = `
        INSERT INTO \`notes_admin_on_order\` (order_id, notes_admin)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE notes_admin = VALUES(notes_admin)
      `;
    const notesParams = [orderId, updates.notes_admin];

    // Exécution de la requête d'insertion/mise à jour dans 'notes_admin_on_order'
    await query(notesSql, notesParams);
  }
};
// ADMIN - Récupérer les notes sur la commande
export const getNotesAdminRepository = async (orderId: number) => {
  const sql = `SELECT * FROM \`notes_admin_on_order\` WHERE order_id = ?`;
  const result = await query<RowDataPacket[]>(sql, [orderId]);
  return result[0] || null;
};
// ADMIN CUSOMTER - Récupérer les adresses de livraison et de facturation de la commande
export const getAddressesRepository = async (orderId: number) => {
  const sql = `
      SELECT * 
      FROM order_address 
      WHERE order_id = ? 
      AND type IN ('shipping', 'billing')
    `;

  const result = await query<RowDataPacket[]>(sql, [orderId]);

  if (result.length === 0) {
    throw new BadRequestError(`No addresses found for order ID ${orderId}.`);
  }

  // Séparer les adresses de facturation et de livraison
  const billingAddress = result.find((address) => address.type === "billing");
  const shippingAddress = result.find((address) => address.type === "shipping");

  return {
    billingAddress,
    shippingAddress,
  };
};
// Repository pour récupérer le label du statut de commande
export const getOrderStatusLabelRepository = async (orderStatusId: number) => {
  const sql = `SELECT label FROM order_status WHERE id = ?`;
  const result = await query<RowDataPacket[]>(sql, [orderStatusId]);

  if (result.length === 0) {
    throw new BadRequestError(
      `Order status with ID ${orderStatusId} does not exist.`
    );
  }

  return result[0].label;
};
// Repository pour récupérer le label du statut de paiement
export const getPaymentStatusLabelRepository = async (
  paymentStatusId: number
) => {
  const sql = `SELECT label FROM payment_status WHERE id = ?`;
  const result = await query<RowDataPacket[]>(sql, [paymentStatusId]);

  if (result.length === 0) {
    throw new BadRequestError(
      `Payment status with ID ${paymentStatusId} does not exist.`
    );
  }

  return result[0].label;
};
// ADMIN CUSTOMER - Récupérer tous les tracking numbers pour une commande
export const getOrderTrackingByOrderIdAndSenderRepository = async (
  orderId: number,
  sender: "admin" | "customer"
): Promise<RowDataPacket | null> => {
  const sql = `
      SELECT * FROM \`order_tracking\`
      WHERE order_id = ? AND sender = ?
      LIMIT 1
    `;
  const result = await query<RowDataPacket[]>(sql, [orderId, sender]);
  return result.length > 0 ? result[0] : null;
};
// ADMIN CUSTOMER - Créer un tracking number pour une commande
export const createOrderTrackingRepository = async (
  orderId: number,
  customerId: number,
  trackingNumber: string,
  dateSending: string,
  sender: "admin" | "customer"
) => {
  const sql = `
      INSERT INTO \`order_tracking\` (order_id, customer_id, tracking_number, date_sending, sender)
      VALUES (?, ?, ?, ?, ?)
    `;
  const params = [orderId, customerId, trackingNumber, dateSending, sender];
  await query<ResultSetHeader>(sql, params);
};
// ADMIN CUSTOMER - Modifier un tracking number pour une commande
export const updateOrderTrackingRepository = async (
  orderId: number,
  customerId: number,
  trackingNumber: string,
  dateSending: string,
  sender: "admin" | "customer"
) => {
  const sql = `
      UPDATE \`order_tracking\`
      SET tracking_number = ?, date_sending = ?, customer_id = ?
      WHERE order_id = ? AND sender = ?
    `;
  const params = [trackingNumber, dateSending, customerId, orderId, sender];
  await query<ResultSetHeader>(sql, params);
};
// ADMIN - Récupérer tous les tracking numbers associés à une commande
export const getOrderTrackingByOrderIdRepository = async (
  orderId: number
): Promise<RowDataPacket[]> => {
  const sql = `
      SELECT * FROM \`order_tracking\`
      WHERE order_id = ?
    `;
  return await query<RowDataPacket[]>(sql, [orderId]);
};
// CUSTOMER - Récupérer tous les tracking numbers associés à une commande
export const getOrderTrackingByOrderIdAndCustomerIdRepository = async (
  orderId: number,
  customerId: number
): Promise<RowDataPacket[]> => {
  const sql = `
      SELECT * FROM \`order_tracking\`
      WHERE order_id = ? AND customer_id = ?
    `;
  return await query<RowDataPacket[]>(sql, [orderId, customerId]);
};
