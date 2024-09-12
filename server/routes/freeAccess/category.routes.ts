import { Router } from "express";
import { getAllCategoriesController } from "../../controllers/category/categoryController.js";

const router = Router();

// collection
router.get("/", getAllCategoriesController);

export default router;
