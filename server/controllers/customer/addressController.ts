import { Request, Response, NextFunction } from "express";
import { CustomJwtPayload } from "../../types/auth/auth.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";
import {
  getCustomerAddressService,
  updateCustomerAddressService,
} from "../../services/customer/addressService.js";
import {
  addressSchema,
  addressTypeSchema,
} from "../../dto/customer/address.dto.js";

// Récupérer l'adresse shipping/billing du customer
export const getCustomerAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const type = req.query.type as string | undefined;
    if (!type) {
      return res.status(400).json({ error: "Address type is required" });
    }
    const typeValue = addressTypeSchema.parse(type); // "shipping" ou "billing"
    const address = await getCustomerAddressService(customerId, typeValue);
    if (!address) {
      throw new NotFoundError("Address not found");
    }
    return res.status(200).json(address);
  } catch (error) {
    console.error(error); 
    next(error);
  }
};
// Mettre à jour ou créer l'adresse du customer
export const updateCustomerAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const addressData = addressSchema.parse(req.body);
    const type = req.query.type as string | undefined;
    if (!type) {
      return res.status(400).json({ error: "Address type is required" });
    }
    const typeValue = addressTypeSchema.parse(type); // "shipping" ou "billing"
    await updateCustomerAddressService(customerId, typeValue, addressData);
    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};
