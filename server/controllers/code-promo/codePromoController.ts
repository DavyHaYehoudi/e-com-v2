import { Request, Response, NextFunction } from "express";
import * as codePromoService from "../../services/code-promo/codePromoService.js";
import { createCodePromoSchema } from "./entities/dto/code-promo.dto.js";

// Vérifier un code promo
export const verifyCodePromoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const codePromo = req.body.code;
    const codePromoVerified = await codePromoService.verifyCodePromoService(
      codePromo
    );
    res.json(codePromoVerified);
  } catch (error) {
    next(error);
  }
};
// Récupérer tous les codes promo
export const getAllCodePromosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const codePromos = await codePromoService.getAllCodesPromoService();
    res.json(codePromos);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Créer un nouveau code promo
export const createCodePromoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const codePromoData = createCodePromoSchema.parse(req.body);
    const newCodePromo = await codePromoService.createCodePromoService(
      codePromoData
    );
    res.status(201).json(newCodePromo);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Supprimer un code promo
export const deleteCodePromoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const codePromoId = parseInt(req.params.codePromoId);
    await codePromoService.deleteCodePromoService(codePromoId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
