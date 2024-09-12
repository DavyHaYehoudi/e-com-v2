import { Router } from "express";
import { getAllCollectionsController } from "../../controllers/collection/collectionController.js";

const router = Router();

// collection
router.get("/", getAllCollectionsController);

export default router;
