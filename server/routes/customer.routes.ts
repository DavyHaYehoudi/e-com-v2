import { Router } from "express";
import { updateCustomerProfile } from "../controllers/customerController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.patch("/:customerId/profile", verifyToken, updateCustomerProfile);

export default router;
