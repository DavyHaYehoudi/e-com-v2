import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { getPaymentAmountController } from "../../controllers/payment/paymentAmountController.js";
import { getPaymentConfirmationController } from "../../controllers/payment/paymentConfirmationController.js";


const router = Router();

// customer
router.get("/amount", verifyToken, getPaymentAmountController);
router.post("/confirm", verifyToken, getPaymentConfirmationController)



export default router;
