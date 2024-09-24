import {
  OrderFiltersDTO,
  OrderInputDTO,
} from "../../controllers/order/entities/dto/order.dto.js";
import {
  getAddressesRepository,
  getAllOrdersRepository,
  getNotesAdminRepository,
  getOneOrderFromAdminRepository,
  getOneOrderFromCustomerRepository,
  getOrdersOneCustomerRepository,
  getOrderStatusLabel,
  getPaymentStatusLabel,
  updateOrderRepository,
} from "../../repositories/order/orderRepository.js";

// ADMIN - Récupérer toutes les commandes
export const getAllOrdersService = async (filters: OrderFiltersDTO) => {
  const orders = await getAllOrdersRepository(filters);
  return orders;
};
// ADMIN CUSTOMER - Récupérer toutes les commandes d'un client
export const getOrdersOneCustomerService = async (customerId: number) => {
  const orders = await getOrdersOneCustomerRepository(customerId);
  return orders;
};
// ADMIN - Récupérer une commande en particulier
export const getOneOrderFromAdminService = async (orderId: number) => {
  const order = await getOneOrderFromAdminRepository(orderId);
  const addresses = await getAddressesRepository(orderId);
  const notes = await getNotesAdminRepository(orderId);
  return {
    order,
    addresses,
    notes,
  };
};
// CUSTOMER - Récupérer une commande en particulier
export const getOneOrderFromCustomerService = async (
  orderId: number,
  customerId: number
) => {
  const order = await getOneOrderFromCustomerRepository(orderId, customerId);
  const addresses = await getAddressesRepository(orderId);
  return {
    order,
    addresses,
  };
};
// ADMIN - Modifier une commande
export const updateOrderService = async (
  orderId: number,
  updates: OrderInputDTO
) => {
  await updateOrderRepository(orderId, updates);
};
