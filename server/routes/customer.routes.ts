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
import {
  getCustomerWishlistController,
  updateCustomerWishlistController,
} from "../controllers/customer/wishlistController.js";

const router = Router();

router.patch("/profile", verifyToken, updateCustomerProfileController);
router.get("/profile", verifyToken, getCustomerProfileController);
router.get("/cart", verifyToken, getCustomerCartController);
router.put("/cart", verifyToken, updateCustomerCartController);
router.get("/wishlist", verifyToken, getCustomerWishlistController);
router.put("/wishlist", verifyToken, updateCustomerWishlistController);

export default router;
