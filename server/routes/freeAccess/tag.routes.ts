import { Router } from "express";
import { getAllTagsController } from "../../controllers/tag/tagController.js";

const router = Router();

// tag
router.get("/", getAllTagsController);

export default router;
