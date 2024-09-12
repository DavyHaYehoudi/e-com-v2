import { Router } from "express";
import {
  createTagController,
  deleteTagController,
} from "../../../controllers/tag/tagController.js";

const router = Router();

// tag
router.post("/", createTagController);
router.delete("/:tagId", deleteTagController);

export default router;
