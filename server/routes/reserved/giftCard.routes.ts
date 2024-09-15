import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { getCustomerGiftCardsController } from "../../controllers/gift-card/giftCardController.js";

const router = Router();

// giftCard
router.get("/", verifyToken, getCustomerGiftCardsController);

export default router;
