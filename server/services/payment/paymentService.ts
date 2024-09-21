import { CartItemToAmountRow } from "../../repositories/customer/dao/cart.dao";
import {
  getApplicableDiscountsRepository,
  getCartGiftCardsRepository,
  getCartItemsRepository,
  getGiftCardBalancesRepository,
  getPercentageByCodePromoRepository,
  getShippingRatesRepository,
} from "../../repositories/payment/paymentAmountRepository.js";

export async function getPaymentAmountService(
  customerId: number,
  shippingMethodId: number|null,
  giftCardIds: number[],
  codePromo: string|null
): Promise<number> {
  const cartItems = await getCartItemsRepository(customerId);
  const giftCardsInCart = await getCartGiftCardsRepository(customerId);

  // Calcul des totaux ici, par exemple en utilisant une méthode séparée
  let total = 0;

  // Calcul des totaux des articles du panier
  for (const item of cartItems) {
    const discount = await getApplicableDiscountsRepository(item.id, "product"); // ou autre type selon le besoin
    const itemTotal = item.price * item.quantity;
    total += discount
      ? itemTotal * (1 - discount.discount_percentage / 100)
      : itemTotal;
  }
  // Ajout des montants des cartes cadeaux dans le panier
  for (const giftCard of giftCardsInCart) {
    total += giftCard.amount * giftCard.quantity; // Ajouter le montant pour chaque carte cadeau dans le panier
  }
  // Ajout des soldes des cartes cadeaux
  if (giftCardIds && giftCardIds.length > 0) {
    const giftCardBalance = await getGiftCardBalancesRepository(giftCardIds);
    total -= giftCardBalance;
    total = Math.max(total, 0); // Le total ne doit pas être négatif
  }

  // Ajout des frais de livraison
  if (shippingMethodId) {
    const shippingRate = await getShippingRatesRepository(
      shippingMethodId,
      calculateTotalWeight(cartItems)
    );
    if (shippingRate) {
      total += shippingRate.price;
    }
  }
  // Traitement du code promo si fourni
  if (codePromo) {
    const promo = await getPercentageByCodePromoRepository(codePromo);
    if (promo) {
      total *= 1 - promo.discount_percentage / 100;
    }
  }

  return total;
}

function calculateTotalWeight(cartItems: CartItemToAmountRow[]) {
  return cartItems.reduce(
    (total, item) => total + (item.weight || 0) * item.quantity,
    0
  );
}
