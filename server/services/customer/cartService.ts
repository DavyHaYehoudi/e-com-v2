import * as cartRepository from "../../repositories/customer/cartRepository.js";
import { CartInputDTO } from "../../controllers/customer/entities/dto/cart.dto.js";
import { getProductService } from "../product/productService.js";

// Récupérer le panier du customer
export const getCustomerCartService = async (customerId: number) => {
  const cart = await cartRepository.getCustomerCartRepository(customerId);
  if (cart && cart.items && cart.items.length) {
    const itemsProduct = await Promise.all(
      cart.items.map(async (item) => {
        const product = await getProductService(item.product_id);
        return {
          ...product,
          quantityInCart: item.quantity,
        };
      })
    );

    return {
      ...cart,
      items: itemsProduct,
    };
  }

  return [];
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
