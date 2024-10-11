import { Router } from "express";
import {
  createCodePromoController,
  deleteCodePromoController,
  getAllCodePromosController,
} from "../../../controllers/code-promo/codePromoController.js";

const router = Router();

// code promo
router.get("/", getAllCodePromosController);
router.post("/", createCodePromoController);
router.delete("/:codePromoId", deleteCodePromoController);

export default router;
