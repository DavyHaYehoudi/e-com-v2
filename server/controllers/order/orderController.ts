import { Request, Response, NextFunction } from "express";
import {
  getAllOrdersService,
  getAllOrderTrackingByOrderIdForAdminService,
  getOneOrderFromAdminService,
  getOneOrderFromCustomerService,
  getOrdersOneCustomerService,
  getOrderTrackingByOrderIdForCustomerService,
  updateOrderService,
  upsertOrderTrackingFromAdminService,
  upsertOrderTrackingFromCustomerService,
} from "../../services/order/orderService.js";
import { CustomJwtPayload } from "../../repositories/auth/dao/auth.dao.js";
import {
  orderFiltersSchema,
  OrderInputDTO,
  OrderTrackingAdminDTO,
  orderTrackingAdminSchema,
  orderTrackingCustomerSchema,
  preprocessOrderQueries,
} from "./entities/dto/order.dto.js";

// ADMIN - Récupérer toutes les commandes
export const getAllOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const preprocessedFilters = preprocessOrderQueries(req.query);
    const validatedFilters = orderFiltersSchema.parse(preprocessedFilters);
    const orders = await getAllOrdersService(validatedFilters);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// CUSTOMER - Récupérer toutes les commandes d'un client
export const getOrdersOneCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const orders = await getOrdersOneCustomerService(customerId);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Récupérer une commande en particulier
export const getOneOrderFromAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const order = await getOneOrderFromAdminService(orderId);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// CUSTOMER - Récupérer une commande en particulier
export const getOneOrderFromCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const customerId = (req.user as CustomJwtPayload).id;
    const order = await getOneOrderFromCustomerService(orderId, customerId);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Modifier une commande
export const updateOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const updates = req.body as OrderInputDTO;
    await updateOrderService(orderId, updates);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// // ADMIN CUSTOMER - Récupérer les numéros de suivi de la commande
export const getOrderTrackingFromAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const tracking = await getAllOrderTrackingByOrderIdForAdminService(orderId);
    res.status(200).json(tracking);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// // CUSTOMER - Récupérer les numéros de suivi de la commande
export const getOrderTrackingFromCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const customerId = (req.user as CustomJwtPayload).id;
    const tracking = await getOrderTrackingByOrderIdForCustomerService(
      orderId,
      customerId
    );
    res.status(200).json(tracking);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Création/Mise à jour du numéro de suivi
export const upsertOrderTrackingFromAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const validatedFilters = orderTrackingAdminSchema.parse(req.body);
    await upsertOrderTrackingFromAdminService(orderId, validatedFilters);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// CUSTOMER - Création/Mise à jour du numéro de suivi
export const upsertOrderTrackingFromCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const customerId = (req.user as CustomJwtPayload).id;
    const validatedFilters = orderTrackingCustomerSchema.parse(req.body);
    await upsertOrderTrackingFromCustomerService(
      orderId,
      customerId,
      validatedFilters
    );
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
