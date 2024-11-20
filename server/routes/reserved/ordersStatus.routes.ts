import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { getOrdersStatusController } from "../../controllers/order-status/ordersStatusController.js";

const router = Router();

// orders status
router.get("/", verifyToken, getOrdersStatusController);

export default router;
