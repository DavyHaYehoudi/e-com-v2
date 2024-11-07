import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { getPaymentAmountController } from "../../controllers/payment/paymentAmountController.js";
import { getPaymentConfirmationController } from "../../controllers/payment/paymentConfirmationController.js";
import { getPaymentIntentController } from "../../controllers/payment/paymentIntentController.js";
import { getPaymentAcceptedController } from "../../controllers/payment/paymentAcceptedController.js";

const router = Router();

// customer
router.get("/amount", verifyToken, getPaymentAmountController);
router.post("/confirm", verifyToken, getPaymentConfirmationController);
router.post("/intent", verifyToken, getPaymentIntentController);
router.put("/accepted", verifyToken, getPaymentAcceptedController);

export default router;
