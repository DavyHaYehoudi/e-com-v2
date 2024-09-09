//customerController.ts
import { Request, Response, NextFunction } from "express";
import { updateCustomerProfileSchema } from "../dto/customer/customer.dto.js";
import { CustomJwtPayload } from "../types/auth/auth.js";
import * as customerRepository from "../repositories/customerRepository.js";
import {
  getCustomerCart,
  updateCustomerCart,
} from "../services/customerService.js";
import { NotFoundError } from "../exceptions/CustomErrors.js";
import { CartInputSchema } from "../dto/customer/cart.dto.js";

export const getCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const customer = await customerRepository.getCustomerById(customerId);
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};
export const updateCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = updateCustomerProfileSchema.parse(req.body);
    const customerId = (req.user as CustomJwtPayload).id;
    await customerRepository.updateCustomer(customerId, validatedData);
    res.status(200).json({ message: "Customer profile updated successfully" });
  } catch (error) {
    next(error);
  }
};
// Récupérer le panier du customer
export const getCustomerCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const cart = await getCustomerCart(customerId);
    if (!cart) {
        throw new NotFoundError("Cart not found")
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
    const updatedCart = await updateCustomerCart(customerId, cartData);
    return res.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
};
