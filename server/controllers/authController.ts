import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService.js";
import { generateSixDigitCode } from "../utils/digit_code.js";
import { authRequestSchema } from "../dto/auth/auth.dto.js";

// Ouvrir une session d'authentification (envoyer un OTP)
export const authOpenSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    authRequestSchema.pick({ email: true }).parse(req.body);
    const { email } = req.body;

    const authCode = generateSixDigitCode();
    console.log("Generated 6-digit code:", authCode);
    await authService.storeAuthCode(email, authCode);

    // (Optionnel) Envoi du code par email ici...

    res.status(200).json({
      message: "Authentication code sent",
    });
  } catch (error: any) {
    next(error);
  }
};

// Vérifier le code OTP
export const authVerifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    authRequestSchema.parse(req.body);
    const { email, otp } = req.body;
    const result = await authService.verifyAuthCode(email, otp);
    res.status(200).json({ token: result.token });
  } catch (error: any) {
    next(error);
  }
};
