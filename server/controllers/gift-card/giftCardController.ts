import { Request, Response, NextFunction } from "express";
import * as giftCardService from "../../services/gift-card/giftCardService.js";
import { CustomJwtPayload } from "../../types/auth/auth.js";
import { createGiftCardSchema } from "../../dto/gift-card/gift-card.dto.js";

// Récupérer pour un customer toutes ses cartes cadeaux
export const getCustomerGiftCardsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const giftcards = await giftCardService.getCustomerGiftCardsService(
      customerId
    );
    res.json(giftcards);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Récupérer toutes les cartes cadeaux
export const getAllGiftCardsAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const giftCards = await giftCardService.getAllGiftCardsAdminService();
    res.json(giftCards);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Création d'une carte cadeau
export const createGiftCardController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const giftCardData = createGiftCardSchema.parse(req.body);
    const newGiftCard = await giftCardService.createGiftCardService(
      giftCardData
    );
    res.status(201).json(newGiftCard);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Suppression d'une carte cadeau
export const deleteGiftCardController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const giftCardId = parseInt(req.params.giftCardId);
    await giftCardService.deleteGiftCardService(giftCardId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
