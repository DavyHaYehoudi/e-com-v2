import { Router } from "express";
import {
  getAllCustomersProfileController,
  getAnyCustomerByIdController,
  updateAnyCustomerProfileController,
} from "../../../controllers/customer/profileController.js";
const router = Router();

router.get("/", getAllCustomersProfileController);
router.get("/:customerId", getAnyCustomerByIdController);
router.patch("/:customerId", updateAnyCustomerProfileController);

export default router;
