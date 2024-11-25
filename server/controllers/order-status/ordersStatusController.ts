import { Request, Response, NextFunction } from "express";
import { getOrdersStatusService } from "../../services/order-status/ordersStatusService.js";

// ADMIN - CUSTOMER - Récupérer les statuts des commandes
export const getOrdersStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ordersStatus = await getOrdersStatusService();
    res.status(200).json({ ordersStatus });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
