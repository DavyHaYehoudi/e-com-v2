import { PaymentAmountResponse } from "../../controllers/payment/entities/dto/paymentAmount.dto";
import { CartItemToAmountRow } from "../../repositories/customer/dao/cart.dao";
import {
  getApplicableDiscountsRepository,
  getBestCategoryDiscountRepository,
  getBestCollectionDiscountRepository,
  getCartGiftCardsRepository,
  getCartItemsRepository,
  getGiftCardBalancesRepository,
  getPercentageByCodePromoRepository,
  getShippingRatesRepository,
} from "../../repositories/payment/paymentAmountRepository.js";

export async function getPaymentAmountService(
  customerId: number,
  shippingMethodId: number | null,
  giftCardIds: number[],
  codePromo: string | null
): Promise<PaymentAmountResponse> {
  const cartItems = await getCartItemsRepository(customerId);
  const giftCardsInCart = await getCartGiftCardsRepository(customerId);

  // Calcul des totaux ici, par exemple en utilisant une méthode séparée
  let total = 0;
  let cash_back = 0;

  // Calcul des totaux des articles du panier
  for (const item of cartItems) {
    // Vérifie la promotion directe sur le produit
    let discount = await getApplicableDiscountsRepository(
      item.product_id,
      "product"
    );

    if (!discount) {
      // Si aucune promotion sur le produit, cherche dans les catégories associées
      const categoryDiscount = await getBestCategoryDiscountRepository(
        item.product_id
      );
      discount = categoryDiscount || discount; // Si pas de promotion catégorie, reste null
    }

    if (!discount) {
      // Si aucune promotion sur le produit et la catégorie, cherche dans les collections associées
      const collectionDiscount = await getBestCollectionDiscountRepository(
        item.product_id
      );
      discount = collectionDiscount || discount;
    }

    const itemTotal = item.price * item.quantity;
    total += discount
      ? itemTotal * (1 - discount.discount_percentage / 100)
      : itemTotal;

    const cash_back_item = item.cash_back * item.quantity;
    cash_back += cash_back_item;
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
      total += Number(shippingRate.price);
    }
  }
  // Traitement du code promo si fourni
  if (codePromo) {
    const promo = await getPercentageByCodePromoRepository(codePromo);
    if (promo) {
      total *= 1 - promo.discount_percentage / 100;
    }
  }

  const amounts = { amount: parseFloat(total.toFixed(2)), cashBack: cash_back };
  return amounts;
}

function calculateTotalWeight(cartItems: CartItemToAmountRow[]) {
  return cartItems.reduce(
    (total, item) => total + (item.weight || 0) * item.quantity,
    0
  );
}
