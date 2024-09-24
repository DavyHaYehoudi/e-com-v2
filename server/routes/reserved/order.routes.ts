import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  getOneOrderFromCustomerController,
  getOrdersOneCustomerController,
} from "../../controllers/order/orderController.js";

const router = Router();

// order
router.get("/", verifyToken, getOrdersOneCustomerController);
router.get("/:orderId", verifyToken, getOneOrderFromCustomerController);

export default router;
