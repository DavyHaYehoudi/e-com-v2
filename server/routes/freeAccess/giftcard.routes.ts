import { Router } from "express";
import { getGiftCardByCodeController } from "../../controllers/gift-card/giftCardController.js";

const router = Router();

// giftcard check-in
router.get("/:code", getGiftCardByCodeController);

export default router;
