import {
  OrderFiltersDTO,
  OrderInputDTO,
  OrderTrackingAdminDTO,
  OrderTrackingCustomerDTO,
} from "../../controllers/order/entities/dto/order.dto.js";
import {
  createOrderTrackingRepository,
  getAddressesRepository,
  getAllOrdersRepository,
  getNotesAdminRepository,
  getOneOrderFromAdminRepository,
  getOneOrderFromCustomerRepository,
  getOrdersOneCustomerRepository,
  getOrderTrackingByOrderIdAndCustomerIdRepository,
  getOrderTrackingByOrderIdAndSenderRepository,
  getOrderTrackingByOrderIdRepository,
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
