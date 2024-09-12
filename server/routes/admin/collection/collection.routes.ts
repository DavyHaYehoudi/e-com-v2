import { Router } from "express";
import { createCollectionController, deleteCollectionController, updateCollectionController } from "../../../controllers/collection/collectionController.js";

const router = Router();

// collection
router.post("/", createCollectionController );
router.patch("/:collectionId", updateCollectionController );
router.delete("/:collectionId", deleteCollectionController );

export default router;
