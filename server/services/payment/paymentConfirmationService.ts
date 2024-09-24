import {
  createOrderAddressRepository,
  createOrderRepository,
} from "../../repositories/payment/paymentConfirmationRepository.js";
import { generateConfirmationNumber } from "./utils/generateCode.js";
import { PaymentConfirmationDTO } from "../../controllers/payment/entities/dto/paymentConfirmation.dto.js";
import { getPaymentAmountService } from "./paymentAmountService.js";
import { createCashbackOrderService } from "../cash-back/cashBackService.js";
import {
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
} from "../../utils/transaction.js";
import { getCustomerCartRepository } from "../../repositories/customer/cartRepository.js";
import {
  createGiftCardRepository,
  updateGiftCardsRepository,
} from "../../repositories/gift-card/giftCardRepository.js";
import { createOrderItemRepository } from "../../repositories/order-item/orderItemRepository.js";
import { updateProductStockRepository } from "../../repositories/product/productRepository.js";

// Fonction principale pour créer une commande
export const createOrderService = async (
  customerId: number,
  body: PaymentConfirmationDTO
) => {
  try {
    await beginTransaction();
    // 1. Récupérer les détails de la commande
    const paymentDetails = await getPaymentAmountService(
      customerId,
      body.shippingMethodId,
      body.giftCardIds,
      body.codePromo,
      body.cashBackToSpend
    );

    // 2. Générer un numéro de confirmation
    const confirmationNumber = generateConfirmationNumber();

    // 3. Créer la commande dans la table `order`
    let cashBackSpent = paymentDetails.cashBack.toSpend;
    if (
      paymentDetails.cashBack.toSpend &&
      paymentDetails.cashBack.overageToSpend
    ) {
      cashBackSpent = Number(
        paymentDetails.cashBack.toSpend - paymentDetails.cashBack.overageToSpend
      );
    }

    const order = await createOrderRepository({
      customerId,
      orderStatusId: 1,
      paymentStatusId: 1,
      confirmationNumber,
      codePromoAmount: paymentDetails.codePromoAmount,
      totalPromoProducts: paymentDetails.totalPromotionAmount,
      totalPrice: paymentDetails.orderAmount,
      shippingPrice: paymentDetails.shippingPrice,
      cashBackEarned: paymentDetails.cashBack.toEarn,
      cashBackSpent,
    });

    // 4. Ajouter les adresses dans `order_address`
    await createOrderAddressRepository(
      order.id,
      body.order_address_shipping,
      "shipping"
    );
    await createOrderAddressRepository(
      order.id,
      body.order_address_billing,
      "billing"
    );

    // 5. Créer les transactions de cashback dans la table `cash_back_transaction`
    const cashBackEarned = paymentDetails.cashBack.toEarn;
    await createCashbackOrderService(
      order.id,
      customerId,
      cashBackEarned,
      cashBackSpent
    );

    // 6. Mettre à jour les cartes cadeaux utilisées si présentes
    if (body.giftCardIds && body.giftCardIds.length > 0) {
      await updateGiftCardsRepository(
        order.id,
        body.giftCardIds,
        paymentDetails.amountGiftCardUsed,
        customerId
      );
    }

    // 7. Créer les cartes cadeaux du panier si présentes
    const cartCustomer = await getCustomerCartRepository(customerId);
    if (cartCustomer && cartCustomer.giftCards.length > 0) {
      await createGiftCardRepository(
        customerId,
        order.id,
        cartCustomer.giftCards
      );
    }

    // 8. Créer les order-item
    await createOrderItemRepository(
      customerId,
      order.id,
      paymentDetails.orderItems
    );

    // 9. Mettre à jour le stock des produits
    await updateProductStockRepository(paymentDetails.orderItems);
    await commitTransaction();
    // Retourner l'ID de commande et le numéro de confirmation
    return { order, confirmationNumber };
  } catch (error) {
    await rollbackTransaction();
    throw error;
  }
};
