import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { getPaymentAmountController } from "../../controllers/payment/paymentAmountController.js";


const router = Router();

// customer
router.get("/amount", verifyToken, getPaymentAmountController);



export default router;
