import { Request, Response, NextFunction } from "express";
import * as deliveryService from "../../services/delivery/deliveryService.js";
import {
  createDeliverySchema,
  updateDeliverySchema,
} from "../../dto/delivery/delivery.dto.js";

// Récupérer toutes les méthodes de livraison
export const getAllDeliveriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deliveries = await deliveryService.getAllDeliveriesRepository();
    res.json(deliveries);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ADMIN - Créer une méthode de livraison
export const createDeliveryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deliveryData = createDeliverySchema.parse(req.body);
    const newDelivery = await deliveryService.createDeliveryService(
      deliveryData
    );
    res.status(201).json(newDelivery);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Mettre à jour une méthode de livraison
export const updateDeliveryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deliveryId = parseInt(req.params.deliveryId);
    const deliveryData = updateDeliverySchema.parse(req.body);
    await deliveryService.updateDeliveryService(deliveryId, deliveryData);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ADMIN - Supprimer une méthode de livraison
export const deleteDeliveryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deliveryId = parseInt(req.params.deliveryId);
    await deliveryService.deleteDeliveryService(deliveryId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
