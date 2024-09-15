import { Router } from "express";
import {
  createGiftCardController,
  deleteGiftCardController,
  getAllGiftCardsAdminController,
} from "../../../controllers/gift-card/giftCardController.js";

const router = Router();

// giftCard
router.get("/", getAllGiftCardsAdminController);
router.post("/", createGiftCardController);
router.delete("/:giftCardId", deleteGiftCardController);

export default router;
