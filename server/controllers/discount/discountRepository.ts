import { Request, Response, NextFunction } from "express";
import * as discountService from "../../services/discount/discountService.js";
import {
  createDiscountSchema,
  targetTableSchema,
} from "./entities/dto/discount.dto.js";

// Récupérer toutes les promotions
export const getAllDiscountsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const discounts = await discountService.getAllDiscountsService();
    res.json(discounts);
  } catch (error) {
    next(error);
  }
};

// ADMIN - Créer une nouvelle promotion
export const createDiscountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const target_table = targetTableSchema.parse(req.query.targetTable);
    if (!target_table) {
      return res.status(400).json({ error: "target table is required" });
    }
    const discountData = createDiscountSchema.parse(req.body);
    const newDiscount = await discountService.createDiscountService(
      target_table,
      discountData
    );
    res.status(201).json(newDiscount);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ADMIN - Supprimer une promotion
export const deleteDiscountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const discountId = parseInt(req.params.discountId);
    await discountService.deleteDiscountService(discountId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
