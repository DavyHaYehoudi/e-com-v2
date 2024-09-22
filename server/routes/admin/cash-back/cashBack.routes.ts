import { Router } from "express";
import { createCashBackCustomerFromAdminController } from "../../../controllers/cash-back/cashBackController.js";
const router = Router();

router.post("/:customerId/cash-back", createCashBackCustomerFromAdminController);

export default router;
