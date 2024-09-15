import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  updateProductController,
} from "../../../controllers/product/productController.js";

const router = Router();

// product
router.post("/", createProductController);
router.patch("/:productId", updateProductController);
router.delete("/:productId", deleteProductController);

export default router;
