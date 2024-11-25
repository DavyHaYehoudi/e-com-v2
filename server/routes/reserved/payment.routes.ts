import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { getPaymentAmountController } from "../../controllers/payment/paymentAmountController.js";
import { getPaymentConfirmationController } from "../../controllers/payment/paymentConfirmationController.js";
import { getPaymentIntentController } from "../../controllers/payment/paymentIntentController.js";
import {
  getPaymentsStatusController,
  paymentStatusController,
} from "../../controllers/payment/paymentStatusController.js";

const router = Router();

// customer
router.get("/amount", verifyToken, getPaymentAmountController);
router.post("/confirm", verifyToken, getPaymentConfirmationController);
router.post("/intent", verifyToken, getPaymentIntentController);
router.patch("/status", verifyToken, paymentStatusController);
router.get("/status", verifyToken, getPaymentsStatusController);

export default router;
