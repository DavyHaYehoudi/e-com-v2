import { Router } from "express";
import {
  createDeliveryController,
  deleteDeliveryController,
  updateDeliveryController,
} from "../../../controllers/delivery/deliveryController.js";

const router = Router();

// delivery
router.post("/", createDeliveryController);
router.patch("/:deliveryId", updateDeliveryController);
router.delete("/:deliveryId", deleteDeliveryController);

export default router;
