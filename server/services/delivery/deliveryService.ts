import { CreateDeliveryDTO } from "../../dto/delivery/delivery.dto";
import * as deliveryService from "../../repositories/delivery/deliveryRepository.js";

// Récupérer toutes les méthodes de livraison
export const getAllDeliveriesRepository = async () => {
  return await deliveryService.getAllDeliveriesRepository();
};
// ADMIN - Créer une méthode de livraison
export const createDeliveryService = async (
  deliveryData: CreateDeliveryDTO
) => {
  const newDelivery = await deliveryService.createDeliveryRepository(
    deliveryData
  );
  return newDelivery;
};
// ADMIN - Mettre à jour une méthode de livraison
export const updateDeliveryService = async (
  deliveryId: number,
  updatedFields: Record<string, any>
) => {
  await deliveryService.updateDeliveryRepository(deliveryId, updatedFields);
};

// ADMIN - Supprimer une méthode de livraison
export const deleteDeliveryService = async (deliveryId: number) => {
  await deliveryService.deleteDeliveryRepository(deliveryId);
};
