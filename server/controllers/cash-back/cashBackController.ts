import { Request, Response, NextFunction } from "express";
import { updateCashBackSchema } from "./entities/dto/cashBack.dto.js";
import { createCashBackCustomerFromAdminService } from "../../services/cash-back/cashBackService.js";

// ADMIN - Ajout/Retrait de cashback au compte du customer
export const createCashBackCustomerFromAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const cashBackData = updateCashBackSchema.parse(req.body);
    const transaction = await createCashBackCustomerFromAdminService(customerId,
      cashBackData
    );
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
