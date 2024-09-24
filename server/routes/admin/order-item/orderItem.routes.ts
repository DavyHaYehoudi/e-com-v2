import { Router } from "express";
import {
  getAllOrderItemsController,
  updateOrderItemController,
} from "../../../controllers/order-item/orderItemController.js";

const router = Router();

// order-item
router.get("/:orderId", getAllOrderItemsController);
router.patch("/:orderItemId", updateOrderItemController);

export default router;
