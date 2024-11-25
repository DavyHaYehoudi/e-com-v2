import { Router } from "express";
import { getAllOrderItemsController } from "../../controllers/order-item/orderItemController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

// order-item
router.get("/:orderId", verifyToken, getAllOrderItemsController);

export default router;
