import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
} from "../../../controllers/category/categoryController.js";

const router = Router();

// categorie
router.post("/", createCategoryController);
router.patch("/:categoryId", updateCategoryController);
router.delete("/:categoryId", deleteCategoryController);

export default router;
