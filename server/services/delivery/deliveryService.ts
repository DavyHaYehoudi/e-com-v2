import { CreateDeliveryDTO } from "../../controllers/delivery/entities/dto/delivery.dto";
import * as deliveryService from "../../repositories/delivery/deliveryRepository.js";
import { formatAmount } from "../../utils/format_amount.js";

// Récupérer toutes les méthodes de livraison
export const getAllDeliveriesRepository = async () => {
  // Récupération de toutes les livraisons
  const deliveries = await deliveryService.getAllDeliveriesRepository();

  // Formatage des données de chaque livraison
  return deliveries.map((delivery) => ({
    ...delivery,
    free_from: formatAmount(delivery.free_from),
    rates: delivery.rates.map((rate) => ({
      ...rate,
      price: formatAmount(rate.price),
      min_weight: formatAmount(rate.min_weight),
      max_weight: formatAmount(rate.max_weight),
    })),
  }));
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
