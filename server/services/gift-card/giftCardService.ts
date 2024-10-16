import { CreateGiftCardDTO } from "../../controllers/gift-card/entities/dto/gift-card.dto";
import * as giftCardService from "../../repositories/gift-card/giftCardRepository.js";

// Vérifier la validité d'une carte cadeau par son code
export const getGiftCardByCodeService = async (code: string) => {
  return await giftCardService.getGiftCardByCodeRepository(code);
};
// Récupérer pour un customer toutes ses cartes cadeaux
export const getCustomerGiftCardsService = async (customerId: number) => {
  return await giftCardService.getCustomerGiftCardsRepository(customerId);
};
// ADMIN - Récupérer toutes les cartes cadeaux
export const getAllGiftCardsAdminService = async (customerId?: string) => {
  return await giftCardService.getAllGiftCardsAdminRepository(customerId);
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
