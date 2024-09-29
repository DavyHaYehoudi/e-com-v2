//profileController.ts
import { Request, Response, NextFunction } from "express";
import {
  filtersSchema,
  updateAnyCustomerProfileSchema,
  updateCustomerProfileSchema,
} from "./entities/dto/profile.dto.js";
import { CustomJwtPayload } from "../../repositories/auth/dao/auth.dao.js";
import * as profileService from "../../services/customer/profileService.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";

export const getCustomerProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const customer = await profileService.getCustomerProfileService(customerId);
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};
export const updateCustomerProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = updateCustomerProfileSchema.parse(req.body);
    const customerId = (req.user as CustomJwtPayload).id;
    await profileService.updateCustomerProfileService(
      customerId,
      validatedData
    );
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

// Admin - Récupérer tous les customers
export const getAllCustomersProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validateFilters = filtersSchema.parse(req.query);
    const customers = await profileService.getAllCustomersProfileService(
      validateFilters
    );
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};
// Admin - Récupérer les données de n'importe quel customer
export const getAnyCustomerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const customer = await profileService.getAnyCustomerByIdService(customerId);
    if (!customer) {
      throw new NotFoundError("Customer not found");
    }
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};
//Admin - Mettre à jour un customer (désactiver)
export const updateAnyCustomerProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const validatedData = updateAnyCustomerProfileSchema.parse(req.body);
    await profileService.updateAnyCustomerProfileService(
      customerId,
      validatedData
    );
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
