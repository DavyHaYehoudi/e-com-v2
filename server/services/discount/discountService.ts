import {
  CreateDiscountDTO,
  TargetTableDiscountDTO,
} from "../../controllers/discount/entities/dto/discount.dto";
import * as discountService from "../../repositories/discount/discountRepository.js";

// Récupérer toutes les promotions
export const getAllDiscountsService = async () => {
  return await discountService.getAllDiscountsRepository();
};

// Créer une nouvelle promotion
export const createDiscountService = async (
  target_table: TargetTableDiscountDTO,
  discountData: CreateDiscountDTO
) => {
  const newDiscount = await discountService.createDiscountRepository(
    target_table,
    discountData
  );
  return newDiscount;
};

// Supprimer une promotion
export const deleteDiscountService = async (discountId: number) => {
  await discountService.deleteDiscountRepository(discountId);
};
