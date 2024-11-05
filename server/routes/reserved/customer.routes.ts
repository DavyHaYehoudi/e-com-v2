import { Router } from "express";
import {
  getCustomerProfileController,
  updateCustomerProfileController,
} from "../../controllers/customer/profileController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  getCustomerCartController,
  updateCustomerCartController,
} from "../../controllers/customer/cartController.js";
import {
  getCustomerWishlistController,
  updateCustomerWishlistController,
} from "../../controllers/customer/wishlistController.js";
import {
  getCustomerAddressController,
  updateCustomerAddressController,
} from "../../controllers/customer/addressController.js";
import { getAllCashBackOneCustomerViaCustomerController } from "../../controllers/cash-back/cashBackController.js";

const router = Router();

// customer
router.patch("/profile", verifyToken, updateCustomerProfileController);
router.get("/profile", verifyToken, getCustomerProfileController);
router.get("/cart", verifyToken, getCustomerCartController);
router.put("/cart", verifyToken, updateCustomerCartController);
router.get("/wishlist", verifyToken, getCustomerWishlistController);
router.patch("/wishlist", verifyToken, updateCustomerWishlistController);
router.get("/address", verifyToken, getCustomerAddressController);
router.put("/address", verifyToken, updateCustomerAddressController);
router.get(
  "/cash-back-history",
  verifyToken,
  getAllCashBackOneCustomerViaCustomerController
);

export default router;
