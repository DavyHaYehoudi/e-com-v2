import { Router } from "express";
import {
  approveReviewController,
  getAllReviewsController,
} from "../../../controllers/review/reviewController.js";

const router = Router();

// review
router.patch("/:reviewId", approveReviewController);
router.get("/", getAllReviewsController);

export default router;
