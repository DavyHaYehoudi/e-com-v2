import { Router } from "express";
import { getAllDeliveriesController } from "../../controllers/delivery/deliveryController.js";


const router = Router();

// delivery
router.get("/", getAllDeliveriesController);

export default router;
