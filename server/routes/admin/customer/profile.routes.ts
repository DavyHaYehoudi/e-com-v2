import { Router } from "express";
import { getAllCustomersProfileController } from "../../../controllers/customer/profileController.js";
const router = Router();

router.get("/", getAllCustomersProfileController);

export default router;
