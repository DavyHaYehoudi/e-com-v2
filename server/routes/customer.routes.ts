import { Router } from "express";
import {
    getCustomerCartController,
  getCustomerProfile,
  updateCustomerCartController,
  updateCustomerProfile,
} from "../controllers/customerController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.patch("/profile", verifyToken, updateCustomerProfile);
router.get("/profile", verifyToken, getCustomerProfile);
router.get("/cart", verifyToken,getCustomerCartController );
router.put("/cart", verifyToken,updateCustomerCartController );

export default router;
