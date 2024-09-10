import { Request, Response, NextFunction } from "express";
import { CustomJwtPayload } from "../../types/auth/auth.js";
import {
  getCustomerWishlistService,
  updateCustomerWishlistService,
} from "../../services/customer/wishlistService.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";
import { WishlistInputSchema } from "../../dto/customer/wishlist.dto.js";

// Récupérer la wishlist du customer
export const getCustomerWishlistController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const wishlist = await getCustomerWishlistService(customerId);
    if (!wishlist) {
      throw new NotFoundError("Wishlist not found");
    }
    return res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// Mettre à jour ou créer la wishlist du customer
export const updateCustomerWishlistController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const wishlistData = WishlistInputSchema.parse(req.body);
    const customerId = (req.user as CustomJwtPayload).id;
    await updateCustomerWishlistService(customerId, wishlistData);
    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};
