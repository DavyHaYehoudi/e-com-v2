import { CreateGiftCardDTO } from "../../dto/gift-card/gift-card.dto";
import * as giftCardService from "../../repositories/gift-card/giftCardRepository.js";

// Récupérer pour un customer toutes ses cartes cadeaux
export const getCustomerGiftCardsService = async (customerId: number) => {
  return await giftCardService.getCustomerGiftCardsRepository(customerId);
};
// ADMIN - Récupérer toutes les cartes cadeaux
export const getAllGiftCardsAdminService = async () => {
  return await giftCardService.getAllGiftCardsAdminRepository();
};
// ADMIN - Création d'une carte cadeau
export const createGiftCardService = async (
  giftCardData: CreateGiftCardDTO
) => {
  const newGiftCard = await giftCardService.createGiftCardAdminRepository(
    giftCardData
  );
  return newGiftCard;
};
// ADMIN - Suppression d'une carte cadeau
export const deleteGiftCardService = async (giftCardId: number) => {
  await giftCardService.deleteGiftCardRepository(giftCardId);
};
