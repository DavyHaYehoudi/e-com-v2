import { CreateCodePromoDTO } from "../../dto/code-promo/code-promo.dto";
import * as codePromoService from "../../repositories/code-promo/codePromoRepository.js";

// Vérifier un code promo
export const verifyCodePromoService = async (codePromo: string) => {
  return await codePromoService.verifyCodePromoRepository(codePromo);
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
