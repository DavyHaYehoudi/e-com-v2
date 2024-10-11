import * as wishlistRepository from "../../repositories/customer/wishlistRepository.js";
import { WishlistInputDTO } from "../../controllers/customer/entities/dto/wishlist.dto.js";
import { getProductService } from "../product/productService.js";

// Récupérer la wishlist du customer
export const getCustomerWishlistService = async (customerId: number) => {
  const wishlist = await wishlistRepository.getCustomerWishlistRepository(customerId);
  if(wishlist && wishlist.items && wishlist.items.length){
    const itemsProduct = await Promise.all(wishlist.items.map(item=> getProductService(item.product_id)))
    return {
     ...wishlist,
      items: itemsProduct
    }
  }
  return []
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
