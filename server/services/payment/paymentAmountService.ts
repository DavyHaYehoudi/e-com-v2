import { PaymentAmountResponse } from "../../controllers/payment/entities/dto/paymentAmount.dto.js";
import { BadRequestError } from "../../exceptions/CustomErrors.js";
import { getCashBackBalanceRepository } from "../../repositories/cash-back/cashBackRepository.js";
import { CartItemToAmountRow } from "../../repositories/customer/dao/cart.dao.js";
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
import { formatAmount } from "../../utils/format_amount.js";

export async function getPaymentAmountService(
  customerId: number,
  shippingMethodId: number,
  giftCardIds: number[],
  codePromo: string | null,
  cashBackToSpend: number | null
): Promise<PaymentAmountResponse> {
  const cartItems = await getCartItemsRepository(customerId);
  const giftCardsInCart = await getCartGiftCardsRepository(customerId);

  // Calcul des totaux
  let totalAmountOrder = 0;
  let shippingPrice = 0;
  let codePromoAmount = 0;
  let codePromoPercentage = 0;
  let totalPromotionAmount = 0;
  let orderItems = [];
  let amountGiftCardUsed = 0;
  let cash_back_to_earn = 0;
  let overageCashBack = 0; // Montant de l'excédant du cashback utilisé par rapport au total de la commande qui restera >=0
  const balanceCashBackCustomer = await getCashBackBalanceRepository(
    customerId
  );
  const cash_back_to_spend = cashBackToSpend ? cashBackToSpend : 0;
  // Montant du nouveau solde du cashback après son utilisation
  let newBalanceCashBack = balanceCashBackCustomer - cash_back_to_spend;

  // Calcul des totaux des articles du panier
  for (const item of cartItems) {
    // Vérifie la promotion directe sur le produit
    let discount = await getApplicableDiscountsRepository(
      item.product_id,
      "product"
    );
    if (discount) {
      totalPromotionAmount +=
        (item.price * item.quantity * discount.discount_percentage) / 100;

      orderItems.push({
        productId: item.product_id,
        discount_percentage: discount.discount_percentage,
        price_before_discount: item.price,
        article_number: item.quantity,
      });
    }

    if (!discount) {
      // Si aucune promotion sur le produit, cherche dans les catégories associées
      const categoryDiscount = await getBestCategoryDiscountRepository(
        item.product_id
      );
      discount = categoryDiscount || discount; // Si pas de promotion catégorie, reste null
      if (categoryDiscount) {
        totalPromotionAmount +=
          (item.price * item.quantity * categoryDiscount.discount_percentage) /
          100;

        orderItems.push({
          productId: item.product_id,
          discount_percentage: categoryDiscount.discount_percentage,
          price_before_discount: item.price,
          article_number: item.quantity,
        });
      }
    }

    if (!discount) {
      // Si aucune promotion sur le produit et la catégorie, cherche dans les collections associées
      const collectionDiscount = await getBestCollectionDiscountRepository(
        item.product_id
      );
      discount = collectionDiscount || discount;
      if (collectionDiscount) {
        totalPromotionAmount +=
          (item.price *
            item.quantity *
            collectionDiscount.discount_percentage) /
          100;

        orderItems.push({
          productId: item.product_id,
          discount_percentage: collectionDiscount.discount_percentage,
          price_before_discount: item.price,
          article_number: item.quantity,
        });
      }
    }
    if (!discount) {
      orderItems.push({
        productId: item.product_id,
        discount_percentage: null,
        price_before_discount: item.price,
        article_number: item.quantity,
      });
    }

    const itemTotal = item.price * item.quantity;
    totalAmountOrder += discount
      ? itemTotal * (1 - discount.discount_percentage / 100)
      : itemTotal;

    const cash_back_item = item.cash_back * item.quantity;
    cash_back_to_earn += cash_back_item;
    newBalanceCashBack += cash_back_to_earn + cash_back_item;
  }
  // Ajout des montants des cartes cadeaux dans le panier
  for (const giftCard of giftCardsInCart) {
    totalAmountOrder += giftCard.amount * giftCard.quantity; // Ajouter le montant pour chaque carte cadeau dans le panier
  }
  // Ajout des frais de livraison
  const totalWeight = calculateTotalWeight(cartItems);
  const shippingRate = await getShippingRatesRepository(
    shippingMethodId,
    totalWeight
  );
  if (shippingRate) {
    shippingPrice += Number(shippingRate.price);
    totalAmountOrder += Number(shippingRate.price);
  }
  // Ajout des soldes des cartes cadeaux
  if (giftCardIds && giftCardIds.length > 0) {
    const giftCardBalance = await getGiftCardBalancesRepository(giftCardIds);
    amountGiftCardUsed = giftCardBalance;
    const delta = Number(totalAmountOrder - giftCardBalance);
    if (delta < 0) {
      amountGiftCardUsed += delta; // delta est négatif
    }
    totalAmountOrder -= giftCardBalance;
    totalAmountOrder = Math.max(totalAmountOrder, 0); // Le total ne doit pas être négatif
  }
  // Traitement du code promo si fourni
  if (codePromo) {
    const promo = await getPercentageByCodePromoRepository(codePromo);
    if (promo) {
      codePromoPercentage = promo.discount_percentage;
      codePromoAmount = (totalAmountOrder * promo.discount_percentage) / 100;
      totalAmountOrder *= 1 - promo.discount_percentage / 100;
    }
  }
  // Utilisation du cashback du client
  if (cashBackToSpend) {
    if (newBalanceCashBack >= 0) {
      // Si Cashback suffisant
      if (totalAmountOrder - cashBackToSpend < 0) {
        overageCashBack = Number(cashBackToSpend - totalAmountOrder);
        newBalanceCashBack += overageCashBack; // Ajustement de la balance cashback du customer
        totalAmountOrder = 0; // Le total ne doit pas être négatif
      }
      totalAmountOrder -= cashBackToSpend;
      totalAmountOrder = Math.max(totalAmountOrder, 0); // Le total ne doit pas être négatif
    } else {
      throw new BadRequestError("Cashback insuffisant");
    }
  }

  const amounts = {
    orderAmount: formatAmount(totalAmountOrder),
    codePromoAmount: formatAmount(codePromoAmount),
    codePromoPercentage: formatAmount(codePromoPercentage),
    totalWeight: formatAmount(totalWeight),
    shippingPrice,
    totalPromotionAmount: formatAmount(totalPromotionAmount),
    orderItems,
    amountGiftCardUsed: formatAmount(amountGiftCardUsed),
    cashBack: {
      toEarn: formatAmount(cash_back_to_earn),
      toSpend: formatAmount(cashBackToSpend),
      overageToSpend: formatAmount(overageCashBack),
      newBalance: formatAmount(newBalanceCashBack),
    },
  };
  return amounts;
}

function calculateTotalWeight(cartItems: CartItemToAmountRow[]) {
  return cartItems.reduce(
    (total, item) => total + (item.weight || 0) * item.quantity,
    0
  );
}
