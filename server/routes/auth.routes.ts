import express from "express";
import {
  authOpenSession,
  authVerifyOTP,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/open-session", authOpenSession);
router.post("/send-verify-otp", authVerifyOTP);
export default router;
