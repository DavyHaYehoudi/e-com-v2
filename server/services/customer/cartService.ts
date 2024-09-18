import * as cartRepository from "../../repositories/customer/cartRepository.js";
import { CartInputDTO } from "../../controllers/customer/entities/dto/cart.dto.js";

// Récupérer le panier du customer
export const getCustomerCartService = async (customerId: number) => {
  return await cartRepository.getCustomerCartRepository(customerId);
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
