import { Request, Response, NextFunction } from "express";
import {
  createCampaignService,
  deleteCampaignService,
  getAllCampaignsService,
  updateCampaignService,
} from "../../services/marketing/campaignService.js";
import {
  createMarketingCampaignSchema,
  updateMarketingCampaignSchema,
} from "./entities/dto/compaign.dto.js";

// ADMIN - Récupérer toutes les campagnes
export const getAllCampaignsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const campaigns = await getAllCampaignsService();
    res.json(campaigns);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Créer une campagne (statut prepared toujours)
export const createCampaignController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validateFields = createMarketingCampaignSchema.parse(req.body);
    const newCampaign = await createCampaignService(validateFields);
    res.json(newCampaign);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Mettre à jour une campagne ou l'envoyer
export const updateCampaignController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validateFields = updateMarketingCampaignSchema.parse(req.body);
    const campaignId = parseInt(req.params.campaignId);
    await updateCampaignService(campaignId, validateFields);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Supprimer une campagne
export const deleteCampaignController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const campaignId = parseInt(req.params.campaignId);
    await deleteCampaignService(campaignId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
