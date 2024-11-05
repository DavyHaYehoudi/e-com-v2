import * as cartRepository from "../../repositories/customer/cartRepository.js";
import { CartInputDTO } from "../../controllers/customer/entities/dto/cart.dto.js";
import { getProductService } from "../product/productService.js";
import { formatAmount } from "../../utils/format_amount.js";

// Récupérer le panier du customer
export const getCustomerCartService = async (customerId: number) => {
  const cart = await cartRepository.getCustomerCartRepository(customerId);

  // Utiliser une valeur par défaut vide pour éviter les erreurs de TypeScript
  const items = cart?.items || [];
  const giftCards = cart?.giftCards || [];

  const itemsProduct =
    items.length > 0
      ? await Promise.all(
          items.map(async (item) => {
            const product = await getProductService(item.product_id);
            return {
              ...product,
              quantityInCart: item.quantity,
              selectedVariant: item.variant,
            };
          })
        )
      : [];

  const giftcardsProduct =
    giftCards.length > 0
      ? giftCards.map((gift) => ({
          ...gift,
          amount: formatAmount(gift.amount),
        }))
      : [];

  return {
    ...cart,
    items: itemsProduct,
    giftCards: giftcardsProduct,
  };
};

// Mettre à jour ou créer le panier du customer
export const updateCustomerCartService = async (
  customerId: number,
  cartData: CartInputDTO
) => {
  return await cartRepository.updateCustomerCartRepository(
    customerId,
    cartData
  );
};
