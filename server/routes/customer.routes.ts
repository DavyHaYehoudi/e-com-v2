import { Router } from "express";
import {
  getCustomerProfileController,
  updateCustomerProfileController,
} from "../controllers/customer/customerController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getCustomerCartController,
  updateCustomerCartController,
} from "../controllers/customer/cartController.js";

const router = Router();

router.patch("/profile", verifyToken, updateCustomerProfileController);
router.get("/profile", verifyToken, getCustomerProfileController);
router.get("/cart", verifyToken, getCustomerCartController);
router.put("/cart", verifyToken, updateCustomerCartController);

export default router;
