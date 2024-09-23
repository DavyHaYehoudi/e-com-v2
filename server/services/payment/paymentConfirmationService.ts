import { applyPromotions } from './promoService';
import { calculateCashback, createCashbackTransaction } from './cashbackService';
import { applyGiftCardsRepository, createOrderAddressRepository, createOrderRepository, getShippingMethodByIdRepository } from '../../repositories/payment/paymentConfirmationRepository';
import { getCartItemsRepository } from '../../repositories/payment/paymentAmountRepository';
import { generateConfirmationNumber } from './utils/generateCode';

// Fonction principale pour créer une commande
const createOrderService = async (customerId, body) => {
    // 1. Récupérer le panier et ses items associés
    const cartItems = await getCartItemsRepository(customerId);
    
    // 2. Calculer le poids total des items pour la livraison
    const totalWeight = cartItems.reduce((sum, item) => sum + item.weight, 0);

    // 3. Calculer les montants après application des promotions et code promo
    const promoResults = await applyPromotions(cartItems, body.codePromo);
    const totalPrice = promoResults.totalPrice;
    const codePromoAmount = promoResults.codePromoAmount;
    const totalPromoProducts = promoResults.totalPromoProducts;

    // 4. Calculer les frais de livraison
    const shippingPrice = await calculateShippingPrice(body.shippingMethodId, totalWeight);

    // 5. Calculer le cashback gagné et dépensé
    const { cashbackEarned, cashbackSpent } = await calculateCashback(cartItems, body.cashbackSpent);

    // 6. Générer un numéro de confirmation
    const confirmationNumber = generateConfirmationNumber();

    // 7. Créer la commande dans la table `order`
    const orderId = await createOrderRepository({
        customerId,
        orderStatusId: 1,
        paymentStatusId: 1,
        confirmationNumber,
        codePromoAmount,
        totalPromoProducts,
        totalPrice,
        shippingPrice,
        cashbackEarned,
        cashbackSpent,
    });

    // 8. Ajouter les adresses dans `order_address`
    await createOrderAddressRepository(orderId, body.order_address_shipping, 'shipping');
    await createOrderAddressRepository(orderId, body.order_address_billing, 'billing');

    // 9. Créer les transactions de cashback dans la table `cash_back_transaction`
    await createCashbackTransaction(orderId, cashbackEarned, 'Order');

    // 10. Mettre à jour les cartes cadeaux si présentes
    if (body.giftCardIds && body.giftCardIds.length > 0) {
        await applyGiftCardsRepository(orderId, body.giftCardIds);
    }

    // Retourner l'ID de commande et le numéro de confirmation
    return { orderId, confirmationNumber };
};

// Calcul des frais de livraison
const calculateShippingPrice = async (shippingMethodId, totalWeight) => {
    const shippingMethod = await getShippingMethodByIdRepository(shippingMethodId);
    const applicableRate = shippingMethod.rates.find(rate => totalWeight >= rate.minWeight && totalWeight <= rate.maxWeight);
    return applicableRate ? applicableRate.price : 0;
};

export { createOrderService };
