import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  createOrderMessageFromCustomerController,
  deleteOrderMessageFromCustomerController,
  getOneOrderFromCustomerController,
  getOrderMessagesFromCustomerController,
  getOrdersOneCustomerController,
  getOrderTrackingFromCustomerController,
  updateOrderMessageFromCustomerController,
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
router.get(
  "/:orderId/messages",
  verifyToken,
  getOrderMessagesFromCustomerController
);
router.post(
  "/:orderId/messages",
  verifyToken,
  createOrderMessageFromCustomerController
);
router.patch(
  "/:orderId/messages/:messageId",
  verifyToken,
  updateOrderMessageFromCustomerController
);
router.delete(
  "/:orderId/messages/:messageId",
  verifyToken,
  deleteOrderMessageFromCustomerController
);
export default router;
