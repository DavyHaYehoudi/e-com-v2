import { Router } from "express";
import { approveReviewController } from "../../../controllers/review/reviewController.js";

const router = Router();

// review
router.patch("/:reviewId", approveReviewController);

export default router;
