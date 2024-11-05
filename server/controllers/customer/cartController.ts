import { Request, Response, NextFunction } from "express";
import { CustomJwtPayload } from "../../repositories/auth/dao/auth.dao.js";
import {
  getCustomerCartService,
  updateCustomerCartService,
} from "../../services/customer/cartService.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";
import { CartInputSchema } from "./entities/dto/cart.dto.js";

// Récupérer le panier du customer
export const getCustomerCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const cart = await getCustomerCartService(customerId);
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }
    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
// Mettre à jour ou créer le panier du customer
export const updateCustomerCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartData = CartInputSchema.parse(req.body);
    const customerId = (req.user as CustomJwtPayload).id;
    await updateCustomerCartService(customerId, cartData);
    return res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
