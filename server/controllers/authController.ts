import { Request, Response } from "express";
import * as authService from "../services/authService.js";
import { generateSixDigitCode } from "../utils/digit_code.js";

// Ouvrir une session d'authentification (envoyer un OTP)
export const authOpenSession = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const customer = await authService.handleCustomerAuth(email);

    // Générer un code d'authentification à 6 chiffres
    const authCode = generateSixDigitCode();
    console.log("Generated 6-digit code:", authCode);

    // Stocker le code d'authentification dans la table 'authentication'
    await authService.storeAuthCode(email, authCode);

    // (Optionnel) Envoi du code par email ici...

    res.status(200).json({
      message: "Authentication code sent",
      customer,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error handling authentication",
      error: error.message,
    });
  }
};

// Vérifier le code OTP
export const authVerifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const result = await authService.verifyAuthCode(email, otp);
    if (result) {
      res.status(200).json({ token: result.token, customer: result.customer });
    } else {
      res.status(403).json({ error: "The secret OTP provided is invalid." });
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Error verifying OTP",
      error: error.message,
    });
  }
};
