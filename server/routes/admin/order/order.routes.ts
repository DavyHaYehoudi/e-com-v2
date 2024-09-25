import { Router } from "express";
import {
  getAllOrdersController,
  getOneOrderFromAdminController,
  getOrderTrackingFromAdminController,
  updateOrderController,
  upsertOrderTrackingFromAdminController,
} from "../../../controllers/order/orderController.js";

const router = Router();

// order
router.get("/", getAllOrdersController);
router.get("/:orderId", getOneOrderFromAdminController);
router.patch("/:orderId", updateOrderController);
router.get("/:orderId/tracking", getOrderTrackingFromAdminController)
router.put("/:orderId/tracking", upsertOrderTrackingFromAdminController)

export default router;
