import * as cartRepository from "../../repositories/customer/cartRepository.js";
import { CartInput } from "../../types/customer/cart.js";

// Récupérer le panier du customer
export const getCustomerCartService = async (customerId: number) => {
  return await cartRepository.getCustomerCartRepository(customerId);
};

// Mettre à jour ou créer le panier du customer
export const updateCustomerCartService = async (
  customerId: number,
  cartData: CartInput
) => {
  return await cartRepository.updateCustomerCartRepository(
    customerId,
    cartData
  );
};
