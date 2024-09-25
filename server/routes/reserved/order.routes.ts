import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  getOneOrderFromCustomerController,
  getOrdersOneCustomerController,
  getOrderTrackingFromCustomerController,
  upsertOrderTrackingFromCustomerController,
} from "../../controllers/order/orderController.js";

const router = Router();

// order
router.get("/", verifyToken, getOrdersOneCustomerController);
router.get("/:orderId", verifyToken, getOneOrderFromCustomerController);
router.get(
  "/:orderId/tracking",
  verifyToken,
  getOrderTrackingFromCustomerController
);
router.put(
  "/:orderId/tracking",
  verifyToken,
  upsertOrderTrackingFromCustomerController
);

export default router;
