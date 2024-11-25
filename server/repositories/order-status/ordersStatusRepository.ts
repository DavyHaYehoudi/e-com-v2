import { query } from "../../config/req.js";
import { RowOrdersStatus } from "./dao/orderStatus.dao.js";
// Récupérer les statuts des commandes
export async function getOrdersStatusRepository() {
  const sql = `
        SELECT *
        FROM order_status`;
  const result = await query<RowOrdersStatus[]>(sql);

  return result;
}
