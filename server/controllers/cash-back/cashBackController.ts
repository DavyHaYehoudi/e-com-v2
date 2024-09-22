import { Request, Response, NextFunction } from "express";
import { updateCashBackSchema } from "./entities/dto/cashBack.dto.js";
import {
  createCashBackCustomerFromAdminService,
  getAllCashBackOneCustomerService,
} from "../../services/cash-back/cashBackService.js";
import { CustomJwtPayload } from "../../repositories/auth/dao/auth.dao.js";

// ADMIN - Ajout/Retrait de cashback au compte du customer
export const createCashBackCustomerFromAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const cashBackData = updateCashBackSchema.parse(req.body);
    const transaction = await createCashBackCustomerFromAdminService(
      customerId,
      cashBackData
    );
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// CUSTOMER - Récupérer l'historique du cashback du customer
export const getAllCashBackOneCustomerViaCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const transactions = await getAllCashBackOneCustomerService(customerId);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Récupérer l'historique du cashback d'un customer
export const getAllCashBackOneCustomerViaAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const transactions = await getAllCashBackOneCustomerService(customerId);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
