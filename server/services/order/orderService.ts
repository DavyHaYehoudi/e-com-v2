import {
  CreateOrderMessageDTO,
  OrderFiltersDTO,
  OrderInputDTO,
  OrderTrackingAdminDTO,
  OrderTrackingCustomerDTO,
  UpdateOrderMessageDTO,
} from "../../controllers/order/entities/dto/order.dto.js";
import {
  checkOrderOwnershipRepository,
  createOrderMessageRepository,
  createOrderTrackingRepository,
  deleteOrderMessageRepository,
  getAddressesRepository,
  getAllOrdersRepository,
  getNotesAdminRepository,
  getOneOrderFromAdminRepository,
  getOneOrderFromCustomerRepository,
  getOrderMessagesByOrderIdRepository,
  getOrdersOneCustomerRepository,
  getOrderTrackingByOrderIdAndCustomerIdRepository,
  getOrderTrackingByOrderIdAndSenderRepository,
  getOrderTrackingByOrderIdRepository,
  updateOrderMessageRepository,
  updateOrderRepository,
  updateOrderTrackingRepository,
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
// ADMIN - Récupérer tous les tracking numbers associés à une commande
export const getAllOrderTrackingByOrderIdForAdminService = async (
  orderId: number
) => {
  // Appel au repository pour récupérer tous les tracking numbers associés à l'orderId
  return await getOrderTrackingByOrderIdRepository(orderId);
};
// CUSTOMER - Récupérer tous les tracking numbers associés à une commande
export const getOrderTrackingByOrderIdForCustomerService = async (
  orderId: number,
  customerId: number // customerId récupéré depuis le token
) => {
  // Appel au repository pour récupérer les tracking numbers liés à ce customer et à cet orderId
  return await getOrderTrackingByOrderIdAndCustomerIdRepository(
    orderId,
    customerId
  );
};
// ADMIN - Créer ou mettre à jour un tracking number pour une commande
export const upsertOrderTrackingFromAdminService = async (
  orderId: number,
  trackingData: OrderTrackingAdminDTO
) => {
  const { customer_id, tracking_number, date_sending } = trackingData;

  // Vérifier si un tracking existe déjà pour cette commande par l'admin
  const existingTracking = await getOrderTrackingByOrderIdAndSenderRepository(
    orderId,
    "admin"
  );

  if (existingTracking) {
    // Si un tracking existe, le mettre à jour
    await updateOrderTrackingRepository(
      orderId,
      customer_id,
      tracking_number,
      date_sending,
      "admin"
    );
  } else {
    // Si aucun tracking n'existe, en créer un nouveau
    await createOrderTrackingRepository(
      orderId,
      customer_id,
      tracking_number,
      date_sending,
      "admin"
    );
  }
};
// CUSTOMER - Créer ou mettre à jour un tracking number pour une commande
export const upsertOrderTrackingFromCustomerService = async (
  orderId: number,
  customerId: number, // customerId récupéré du token
  trackingData: OrderTrackingCustomerDTO
) => {
  const { tracking_number, date_sending } = trackingData;

  // Vérifier que l'ordre appartient bien au customer
  const existingTracking = await getOrderTrackingByOrderIdAndSenderRepository(
    orderId,
    "customer"
  );

  if (existingTracking && existingTracking.customer_id === customerId) {
    // Si un tracking existe pour ce customer et cette commande, le mettre à jour
    await updateOrderTrackingRepository(
      orderId,
      customerId,
      tracking_number,
      date_sending,
      "customer"
    );
  } else {
    // Si aucun tracking n'existe ou si le customer_id ne correspond pas, créer un nouveau suivi
    await createOrderTrackingRepository(
      orderId,
      customerId,
      tracking_number,
      date_sending,
      "customer"
    );
  }
};
// Fonction pour créer un message
export const createOrderMessageService = async (
  orderId: number,
  data: CreateOrderMessageDTO,
  customerId: number | null
) => {
  if (customerId) {
    await checkOrderOwnershipRepository(orderId, customerId);
  }
  return await createOrderMessageRepository(orderId, data);
};
// Fonction pour mettre à jour un message (seulement si non lu)
export const updateOrderMessageService = async (
  messageId: number,
  data: UpdateOrderMessageDTO,
  orderId: number,
  customerId: number | null
) => {
  if (customerId) {
    await checkOrderOwnershipRepository(orderId, customerId);
  }
  return await updateOrderMessageRepository(messageId, data, orderId);
};
// Fonction pour supprimer un message (seulement si non lu)
export const deleteOrderMessageService = async (
  messageId: number,
  orderId: number,
  customerId: number | null
) => {
  if (customerId) {
    await checkOrderOwnershipRepository(orderId, customerId);
  }
  return await deleteOrderMessageRepository(messageId, orderId);
};
// Fonction pour récupérer tous les messages d'une commande
export const getOrderMessagesByOrderIdService = async (
  orderId: number,
  customerId: number | null
) => {
  if (customerId) {
    await checkOrderOwnershipRepository(orderId, customerId);
  }
  return await getOrderMessagesByOrderIdRepository(orderId);
};
