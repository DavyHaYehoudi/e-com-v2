import { CreateCodePromoDTO } from "../../controllers/code-promo/entities/dto/code-promo.dto";
import * as codePromoService from "../../repositories/code-promo/codePromoRepository.js";
import { formatAmount } from "../../utils/format_amount.js";

// Vérifier un code promo
export const verifyCodePromoService = async (codePromo: string) => {
  const codePromoVerify = await codePromoService.verifyCodePromoRepository(
    codePromo
  );
  return {
    code: codePromoVerify.code,
    discount_percentage: formatAmount(codePromoVerify.discount_percentage),
  };
};
// Récupérer tous les codes promo
export const getAllCodesPromoService = async () => {
  return await codePromoService.getAllCodePromosRepository();
};
// Créer un nouveau code promo
export const createCodePromoService = async (
  codePromoData: CreateCodePromoDTO
) => {
  const newCodePromo = await codePromoService.createCodePromoRepository(
    codePromoData
  );
  return newCodePromo;
};
// Supprimer un code promo
export const deleteCodePromoService = async (codePromoId: number) => {
  await codePromoService.deleteCodePromoRepository(codePromoId);
};
