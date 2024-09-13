import { Router } from "express";
import { getAllDiscountsController } from "../../controllers/discount/discountRepository.js";

const router = Router();

// discount
router.get("/", getAllDiscountsController);

export default router;
