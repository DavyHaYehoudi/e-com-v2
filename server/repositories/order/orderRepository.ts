import { RowDataPacket } from "mysql2";
import { query } from "../../config/req.js";
import { BadRequestError } from "../../exceptions/CustomErrors.js";
import { OrderRow } from "./dao/order.dao.js";
import { OrderInputDTO } from "../../controllers/order/entities/dto/order.dto.js";

// ADMIN - Récupérer toutes les commandes
export const getAllOrdersRepository = async () => {
  const sql = `SELECT * FROM \`order\``;
  const results = await query<OrderRow[]>(sql);
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
  const sql = `SELECT * FROM \`order\`
  WHERE customer_id =?`;
  const results = await query<OrderRow[]>(sql, [customerId]);
  return results;
};
// ADMIN CUSTOMER - Récupérer une commande en particulier
export const getOneOrderFromAdminRepository = async (orderId: number) => {
  const sql = `SELECT * FROM \`order\`
  WHERE id =?`;
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
  const sql = `SELECT * FROM \`order\`
  WHERE id =? AND customer_id =?`;
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
    throw new Error(`Order with ID ${orderId} does not exist.`);
  }

  // Construction de la requête SQL dynamique
  let sql = `UPDATE \`order\` SET `;
  const params: any[] = [];

  // Ajout des parties dynamiques de la requête selon les champs présents dans updates
  if (updates.order_status_id !== undefined) {
    sql += `order_status_id = ?, `;
    params.push(updates.order_status_id);
  }

  if (updates.payment_status_id !== undefined) {
    sql += `payment_status_id = ?, `;
    params.push(updates.payment_status_id);
  }

  if (updates.notes_admin !== undefined) {
    sql += `notes_admin = ?, `;
    params.push(updates.notes_admin);
  }

  // Retirer la dernière virgule et espace
  sql = sql.slice(0, -2);

  // Ajout de la condition WHERE
  sql += ` WHERE id = ?`;
  params.push(orderId);

  // Exécution de la requête de mise à jour
  await query(sql, params);
};
