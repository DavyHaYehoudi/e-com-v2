import { Router } from "express";
import {
  updateOrderItemController,
} from "../../../controllers/order-item/orderItemController.js";

const router = Router();

// order-item
router.patch("/:orderItemId", updateOrderItemController);

export default router;
