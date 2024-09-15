import { Router } from "express";
import { getAllReviewsController } from "../../controllers/review/reviewController.js";

const router = Router();

// review
router.get("/", getAllReviewsController);

export default router;
