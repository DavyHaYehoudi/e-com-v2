import * as wishlistRepository from "../../repositories/customer/wishlistRepository.js";
import { WishlistInputDTO } from "../../controllers/customer/entities/dto/wishlist.dto.js";
import { getProductService } from "../product/productService.js";

// Récupérer la wishlist du customer
export const getCustomerWishlistService = async (customerId: number) => {
  const wishlist = await wishlistRepository.getCustomerWishlistRepository(
    customerId
  );
  if (!wishlist) {
    return { wishlist: null, items: [] }; // Ou simplement return [];
  }

  const itemsProduct = await Promise.all(
    wishlist.items.map((item) => getProductService(item.product_id))
  );

  return {
    ...wishlist,
    items: itemsProduct,
  };
};

// Mettre à jour ou créer la wishlist du customer
export const updateCustomerWishlistService = async (
  customerId: number,
  wishlistData: WishlistInputDTO
) => {
 await wishlistRepository.updateCustomerWishlistRepository(
    customerId,
    wishlistData
  );
};
