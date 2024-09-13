import { Router } from "express";
import { verifyCodePromoController } from "../../controllers/code-promo/codePromoController.js";

const router = Router();

// code promo
router.get("/", verifyCodePromoController);

export default router;
