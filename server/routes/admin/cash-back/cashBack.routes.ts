import { Router } from "express";
import {
  createCashBackCustomerFromAdminController,
  getAllCashBackOneCustomerViaAdminController,
} from "../../../controllers/cash-back/cashBackController.js";
const router = Router();

router.get(
  "/:customerId/cash-back",
  getAllCashBackOneCustomerViaAdminController
);
router.post(
  "/:customerId/cash-back",
  createCashBackCustomerFromAdminController
);

export default router;
