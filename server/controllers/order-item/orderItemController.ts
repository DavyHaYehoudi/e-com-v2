import { Request, Response, NextFunction } from "express";
import {
  getAllOrderItemsService,
  updateOrderItemService,
} from "../../services/order-item/orderItemService.js";
import { UpdateOrderItemInputDTO } from "./entities/dto/orderItem.dto.js";

// ADMIN - Récupérer tous les orders items d'une commande
export const getAllOrderItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const orderItems = await getAllOrderItemsService(orderId);
    res.status(200).json(orderItems);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Modifier un order item
export const updateOrderItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderItemId = parseInt(req.params.orderItemId);
    const updates = req.body as UpdateOrderItemInputDTO;
    await updateOrderItemService(orderItemId, updates);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
