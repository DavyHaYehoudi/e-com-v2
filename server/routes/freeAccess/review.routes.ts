import { Router } from "express";
import { getReviewsOfOneProductController } from "../../controllers/review/reviewController.js";

const router = Router();

// review
router.get("/:productId", getReviewsOfOneProductController);

export default router;
