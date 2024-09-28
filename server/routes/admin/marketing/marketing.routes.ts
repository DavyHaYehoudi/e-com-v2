import { Router } from "express";
import {
  createCampaignController,
  deleteCampaignController,
  getAllCampaignsController,
  updateCampaignController,
} from "../../../controllers/marketing/campaignController.js";

const router = Router();

// campaign
router.get("/", getAllCampaignsController);
router.post("/", createCampaignController);
router.patch("/:campaignId", updateCampaignController);
router.delete("/:campaignId", deleteCampaignController);

export default router;
