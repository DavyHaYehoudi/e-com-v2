import { Router } from "express";
import {
  getAllProductsController,
  getProductController,
} from "../../controllers/product/productController.js";

const router = Router();

// product
router.get("/", getAllProductsController);
router.get("/:productId", getProductController);

export default router;
