import * as wishlistRepository from "../../repositories/customer/wishlistRepository.js";
import { WishlistInput } from "../../types/customer/wishlist.js";

// Récupérer la wishlist du customer
export const getCustomerWishlistService = async (customerId: number) => {
  return await wishlistRepository.getCustomerWishlistRepository(customerId);
};

// Mettre à jour ou créer la wishlist du customer
export const updateCustomerWishlistService = async (
  customerId: number,
  cartData: WishlistInput
) => {
  return await wishlistRepository.updateCustomerWishlistRepository(
    customerId,
    cartData
  );
};
