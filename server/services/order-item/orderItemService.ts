import { UpdateOrderItemInputDTO } from "../../controllers/order-item/entities/dto/orderItem.dto.js";
import { getAllOrderItemsRepository, updateOrderItemRepository } from "../../repositories/order-item/orderItemRepository.js";

// ADMIN - Récupérer tous les orders items d'une commande
export const getAllOrderItemsService = async (orderId: number) => {
  const orderItems = await getAllOrderItemsRepository(orderId);
  return orderItems;
};
// ADMIN - Modifier un order item
export const updateOrderItemService = async (
  orderItemId: number,
  updates: UpdateOrderItemInputDTO
) => {
  await updateOrderItemRepository(orderItemId, updates);
};