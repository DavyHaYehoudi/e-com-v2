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
import {
  getCustomerCartRepository,
  updateCustomerCartRepository,
} from "../../repositories/customer/cartRepository.js";
import {
  createGiftCardRepository,
  updateGiftCardsRepository,
} from "../../repositories/gift-card/giftCardRepository.js";
import { createOrderItemRepository } from "../../repositories/order-item/orderItemRepository.js";
import { updateProductStockRepository } from "../../repositories/product/productRepository.js";
import { query } from "../../config/req.js";
import { RowDataPacket } from "mysql2";
import { sendPaymentConfirmationEmail } from "../../email/subject/payment.js";

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
      paymentStatusId: 2,
      confirmationNumber,
      codePromoAmount: paymentDetails.codePromoAmount,
      totalPromoProducts: paymentDetails.totalPromotionAmount,
      totalPrice: paymentDetails.orderAmount,
      shippingPrice: paymentDetails.shippingPrice,
      cashBackEarned: paymentDetails.cashBack.toEarn,
      cashBackSpent,
      totalWeight: paymentDetails.totalWeight,
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
    let createdGiftCards = <any>[];
    const cartCustomer = await getCustomerCartRepository(customerId);
    if (cartCustomer && cartCustomer.giftCards.length > 0) {
      createdGiftCards = await createGiftCardRepository(
        customerId,
        order.id,
        cartCustomer.giftCards
      );
    }

    // 8. Créer les order-item
    const createdOrderItems = await createOrderItemRepository(
      customerId,
      order.id,
      paymentDetails.orderItems
    );

    // 9. Mettre à jour le stock des produits
    await updateProductStockRepository(paymentDetails.orderItems);

    // 10. Vider le panier du client
    const cartInit = { items: [], gift_cards: [] };
    await updateCustomerCartRepository(customerId, cartInit);

    // 11. Ajouter +1 au compteur de commandes passées du client
    const sql1 = ` UPDATE customer SET orders_count = orders_count + 1 WHERE id = ?`;
    await query(sql1, [customerId]);

    // 12. Retrouver le prénom,s'il existe, du client
    const sql2 = " SELECT first_name,email FROM customer WHERE id = ?";
    const [firstNameData] = await query<RowDataPacket[]>(sql2, [customerId]);

    await commitTransaction();

    const emailDetails = {
      email: firstNameData.email,
      firstName: firstNameData.first_name,
    };
    const orderDetails = {
      order: {
        confirmation_number: order.confirmation_number,
        total_price: order.total_price,
        shipping_price: order.shipping_price,
        cashback_earned: order.cashback_earned,
        cashback_spent: order.cashback_spent,
        code_promo_amount: order.code_promo_amount,
        total_promo_products: order.total_promo_products,
        total_weight: order.total_weight,
        total_giftCardUsed: paymentDetails.amountGiftCardUsed,
      },
      giftCards: createdGiftCards,
      products: createdOrderItems,
    };

    // Appeler la fonction d'envoi d'email
    await sendPaymentConfirmationEmail(emailDetails, orderDetails);
    // Retourner l'ID de commande et le numéro de confirmation
    return {
      order,
      giftCards: createdGiftCards,
      products: createdOrderItems,
      firstName: firstNameData.first_name,
    };
  } catch (error) {
    await rollbackTransaction();
    throw error;
  }
};
