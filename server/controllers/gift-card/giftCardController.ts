import { Request, Response, NextFunction } from "express";
import * as giftCardService from "../../services/gift-card/giftCardService.js";
import { CustomJwtPayload } from "../../repositories/auth/dao/auth.dao.js";
import { createGiftCardSchema } from "./entities/dto/gift-card.dto.js";

// Vérifier la validité d'une carte cadeau par son code
export const getGiftCardByCodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = req.params.code;
    const giftCard = await giftCardService.getGiftCardByCodeService(code);
    res.json(giftCard);
  } catch (error) {
    next(error);
  }
};
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
    const { customerId } = req.query;
    const giftCards = await giftCardService.getAllGiftCardsAdminService(
      customerId as string
    );
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
