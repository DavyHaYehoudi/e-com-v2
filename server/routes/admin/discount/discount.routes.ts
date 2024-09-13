import { Router } from "express";
import {
  createDiscountController,
  deleteDiscountController,
} from "../../../controllers/discount/discountRepository.js";

const router = Router();

// discount
router.post("/", createDiscountController);
router.delete("/:discountId", deleteDiscountController);

export default router;
