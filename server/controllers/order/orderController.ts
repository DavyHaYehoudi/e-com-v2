import { Request, Response, NextFunction } from "express";
import {
  createOrderMessageService,
  deleteOrderMessageService,
  getAllOrdersService,
  getAllOrderTrackingByOrderIdForAdminService,
  getOneOrderFromAdminService,
  getOneOrderFromCustomerService,
  getOrderMessagesByOrderIdService,
  getOrdersOneCustomerService,
  getOrderTrackingByOrderIdForCustomerService,
  updateOrderMessageService,
  updateOrderService,
  upsertOrderTrackingFromAdminService,
  upsertOrderTrackingFromCustomerService,
} from "../../services/order/orderService.js";
import { CustomJwtPayload } from "../../repositories/auth/dao/auth.dao.js";
import {
  createOrderMessageSchema,
  orderFiltersSchema,
  OrderInputDTO,
  OrderTrackingAdminDTO,
  orderTrackingAdminSchema,
  orderTrackingCustomerSchema,
  preprocessOrderQueries,
  updateOrderMessageSchema,
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
// ADMIN CUSTOMER - Récupérer les numéros de suivi de la commande
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
// CUSTOMER - Récupérer les numéros de suivi de la commande
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
// ADMIN - Récupérer tous les messages d'une commande
export const getOrderMessagesFromAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const messages = await getOrderMessagesByOrderIdService(orderId, null);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Créer un message
export const createOrderMessageFromAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const validateFields = createOrderMessageSchema.parse(req.body);
    await createOrderMessageService(orderId, validateFields, null);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Mettre à jour un message avant qu'il n'ait été lu
export const updateOrderMessageFromAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const messageId = parseInt(req.params.messageId);
    const validateFields = updateOrderMessageSchema.parse(req.body);
    await updateOrderMessageService(messageId, validateFields, orderId, null);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Supprimer un message
export const deleteOrderMessageFromAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const messageId = parseInt(req.params.messageId);
    await deleteOrderMessageService(messageId, orderId, null);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// CUSTOMER - Récupérer tous les messages d'une commande
export const getOrderMessagesFromCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const customerId = (req.user as CustomJwtPayload).id;
    const messages = await getOrderMessagesByOrderIdService(orderId, customerId);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// CUSTOMER - Créer un message
export const createOrderMessageFromCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const orderId = parseInt(req.params.orderId);
    const validateFields = createOrderMessageSchema.parse(req.body);
    await createOrderMessageService(orderId, validateFields, customerId);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// CUSTOMER - Mettre à jour un message avant qu'il n'ait été lu
export const updateOrderMessageFromCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const orderId = parseInt(req.params.orderId);
    const messageId = parseInt(req.params.messageId);
    const validateFields = updateOrderMessageSchema.parse(req.body);
    await updateOrderMessageService(messageId, validateFields, orderId, customerId);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// CUSTOMER - Supprimer un message
export const deleteOrderMessageFromCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const orderId = parseInt(req.params.orderId);
    const messageId = parseInt(req.params.messageId);
    await deleteOrderMessageService(messageId, orderId, customerId);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
