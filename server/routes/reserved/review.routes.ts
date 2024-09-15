import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  createReviewController,
  deleteReviewController,
  getReviewController,
  updateReviewController,
} from "../../controllers/review/reviewController.js";

const router = Router();

// review
router.get("/:reviewId", verifyToken, getReviewController);
router.post("/", verifyToken, createReviewController);
router.patch("/:reviewId", verifyToken, updateReviewController);
router.delete("/:reviewId", verifyToken, deleteReviewController);

export default router;
