import { Router } from "express";
import {
  createOrderMessageFromAdminController,
  deleteOrderMessageFromAdminController,
  getAllOrdersController,
  getOneOrderFromAdminController,
  getOrderMessagesFromAdminController,
  getOrderTrackingFromAdminController,
  updateOrderController,
  updateOrderMessageFromAdminController,
  upsertOrderTrackingFromAdminController,
} from "../../../controllers/order/orderController.js";

const router = Router();

// order
router.get("/", getAllOrdersController);
router.get("/:orderId", getOneOrderFromAdminController);
router.patch("/:orderId", updateOrderController);
router.get("/:orderId/tracking", getOrderTrackingFromAdminController);
router.put("/:orderId/tracking", upsertOrderTrackingFromAdminController);
router.get("/:orderId/messages", getOrderMessagesFromAdminController);
router.post("/:orderId/messages", createOrderMessageFromAdminController);
router.patch(
  "/:orderId/messages/:messageId",
  updateOrderMessageFromAdminController
);
router.delete(
  "/:orderId/messages/:messageId",
  deleteOrderMessageFromAdminController
);

export default router;
