import { getOrdersStatusRepository } from "../../repositories/order-status/ordersStatusRepository.js";

// Fonction pour récupérer tous les statuts des commandes
export const getOrdersStatusService = async () => {
  return await getOrdersStatusRepository();
};
