import { Router } from "express";
import {
  getAllOrdersController,
  getOneOrderFromAdminController,
  updateOrderController,
} from "../../../controllers/order/orderController.js";

const router = Router();

// order
router.get("/", getAllOrdersController);
router.get("/:orderId", getOneOrderFromAdminController);
router.patch("/:orderId", updateOrderController);

export default router;
