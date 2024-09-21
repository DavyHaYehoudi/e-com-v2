import { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "../../config/req.js";
import {
  CartItemGiftCardRow,
  CartItemToAmountRow,
} from "../customer/dao/cart.dao.js";
import { DiscountPercentageRow } from "../discount/dao/discount.dao.js";
import { ShippingMethodTarifs } from "../delivery/dao/delivery.dao.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";

export async function getCartItemsRepository(
  customerId: number
): Promise<CartItemToAmountRow[]> {
  const sqlCart = `
    SELECT * FROM cart WHERE customer_id = ?`;
  const resultsCart = await query<RowDataPacket[]>(sqlCart, [customerId]);
  const cartId = resultsCart[0].id;
  if(!cartId) {
    throw new NotFoundError("Cart not found");
  }

  const sql = `
      SELECT 
        ci.id, ci.quantity, p.name, p.price, p.weight, p.is_published, p.is_archived
      FROM cart_item ci
      JOIN product p ON ci.product_id = p.id
      WHERE ci.cart_id = ? AND p.is_published = TRUE AND p.is_archived = FALSE;
    `;
  const items = await query<RowDataPacket[]>(sql, [cartId]);
  return items as CartItemToAmountRow[];
}
export async function getCartGiftCardsRepository(
  customerId: number
): Promise<CartItemGiftCardRow[]> {
  const sqlCart = `
    SELECT * FROM cart WHERE customer_id = ?`;
  const resultsCart = await query<RowDataPacket[]>(sqlCart, [customerId]);
  const cartId = resultsCart[0].id;
  if(!cartId) {
    throw new NotFoundError("Cart not found");
  }

  const sql = `
      SELECT id, quantity, amount
      FROM cart_gift_card
      WHERE cart_id = ?;
    `;
  const giftCards = await query<RowDataPacket[]>(sql, [cartId]);
  return giftCards as CartItemGiftCardRow[];
}
export async function getApplicableDiscountsRepository(
  targetId: number,
  targetType: "product" | "category" | "collection"
): Promise<DiscountPercentageRow | null> {
  const sql = `
      SELECT 
        discount_percentage 
      FROM discount
      WHERE target_id = ? AND target_table = ? 
        AND start_date <= CURDATE() 
        AND end_date >= CURDATE()
      ORDER BY discount_percentage DESC 
      LIMIT 1;
    `;
  const discounts = await query<RowDataPacket[]>(sql, [targetId, targetType]);
  return discounts.length > 0 ? (discounts[0] as DiscountPercentageRow) : null;
}
export async function getGiftCardBalancesRepository(
  giftCardIds: number[]
): Promise<number> {

  const sql = `
    SELECT SUM(balance) as total_balance 
    FROM gift_card 
    WHERE id IN (?) AND expiration_date >= CURDATE();
  `;
  const [result] = await query<RowDataPacket[]>(sql, [giftCardIds]);
  return result.total_balance || 0;
}
export async function getShippingRatesRepository(
  shippingMethodId: number,
  totalWeight: number
): Promise<ShippingMethodTarifs | null> {
  const sql = `
    SELECT price 
    FROM shipping_method_tarifs
    WHERE shipping_method_id = ? AND min_weight <= ? AND max_weight >= ?
    LIMIT 1;
  `;
  const rates = await query<RowDataPacket[]>(sql, [
    shippingMethodId,
    totalWeight,
    totalWeight,
  ]);
  return rates.length > 0 ? (rates[0] as ShippingMethodTarifs) : null;
}
export async function getPercentageByCodePromoRepository(code: string): Promise<{ discount_percentage: number } | null> {
  const sql = `
    SELECT discount_percentage 
    FROM code_promo
    WHERE code = ? 
      AND start_date <= CURDATE() 
      AND end_date >= CURDATE();
  `;
  const [result] = await query<RowDataPacket[]>(sql, [code]);
  return result ? { discount_percentage: result.discount_percentage } : null;
}