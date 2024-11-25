import { CreateGiftCardDTO } from "../../controllers/gift-card/entities/dto/gift-card.dto";
import * as giftCardService from "../../repositories/gift-card/giftCardRepository.js";
import { formatAmount } from "../../utils/format_amount.js";

// Vérifier la validité d'une carte cadeau par son code
export const getGiftCardByCodeService = async (code: string) => {
  const giftcard = await giftCardService.getGiftCardByCodeRepository(code);
  return {
    ...giftcard,
    balance: formatAmount(giftcard.balance),
    initial_value: formatAmount(giftcard.initial_value),
  };
};
// Récupérer pour un customer toutes ses cartes cadeaux
export const getCustomerGiftCardsService = async (customerId: number) => {
  const giftcards = await giftCardService.getCustomerGiftCardsRepository(
    customerId
  );
  return giftcards.map((giftcard) => ({
    ...giftcard,
    initial_value: formatAmount(giftcard.initial_value),
    balance: formatAmount(giftcard.balance),
    usage_history: giftcard.usage_history.map((item) => ({
      ...item,
      amount_used: formatAmount(item.amount_used),
    })),
  }));
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
