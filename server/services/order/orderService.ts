import { OrderInputDTO } from "../../controllers/order/entities/dto/order.dto.js";
import {
  getAllOrdersRepository,
  getOneOrderFromAdminRepository,
  getOneOrderFromCustomerRepository,
  getOrdersOneCustomerRepository,
  updateOrderRepository,
} from "../../repositories/order/orderRepository.js";

// ADMIN - Récupérer toutes les commandes
export const getAllOrdersService = async () => {
  const orders = await getAllOrdersRepository();
  return orders;
};
// ADMIN CUSTOMER - Récupérer toutes les commandes d'un client
export const getOrdersOneCustomerService = async (customerId: number) => {
  const orders = await getOrdersOneCustomerRepository(customerId);
  return orders;
};
// ADMIN CUSTOMER - Récupérer une commande en particulier
export const getOneOrderFromAdminService = async (orderId: number) => {
  const order = await getOneOrderFromAdminRepository(orderId);
  return order;
};
// CUSTOMER - Récupérer une commande en particulier
export const getOneOrderFromCustomerService = async (
  orderId: number,
  customerId: number
) => {
  const order = await getOneOrderFromCustomerRepository(orderId, customerId);
  return order;
};  
// ADMIN - Modifier une commande
export const updateOrderService = async (
  orderId: number,
  updates: OrderInputDTO
) => {
  await updateOrderRepository(orderId, updates);
};
