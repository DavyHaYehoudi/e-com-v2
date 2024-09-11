//profileController.ts
import { Request, Response, NextFunction } from "express";
import { updateCustomerProfileSchema } from "../../dto/customer/profile.dto.js";
import { CustomJwtPayload } from "../../types/auth/auth.js";
import * as profileRepository from "../../repositories/customer/profileRepository.js";

export const getCustomerProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const customer = await profileRepository.getCustomerByIdRepository(
      customerId
    );
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
    await profileRepository.updateprofileRepository(
      customerId,
      validatedData
    );
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
