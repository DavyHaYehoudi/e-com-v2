import * as wishlistRepository from "../../repositories/customer/wishlistRepository.js";
import { WishlistInputDTO } from "../../repositories/customer/dao/wishlist.dao.js";

// Récupérer la wishlist du customer
export const getCustomerWishlistService = async (customerId: number) => {
  return await wishlistRepository.getCustomerWishlistRepository(customerId);
};

// Mettre à jour ou créer la wishlist du customer
export const updateCustomerWishlistService = async (
  customerId: number,
  cartData: WishlistInputDTO
) => {
  return await wishlistRepository.updateCustomerWishlistRepository(
    customerId,
    cartData
  );
};
