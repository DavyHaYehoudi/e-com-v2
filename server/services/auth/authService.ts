import * as profileRepository from "../../repositories/customer/profileRepository.js";
import { addMinutes } from "date-fns";
import * as authRepository from "../../repositories/auth/authRepository.js";
import { generateToken } from "../../utils/jwt.js";
import { ForbiddenError } from "../../exceptions/CustomErrors.js";

// Enregistrer le code d'authentification
export const storeAuthCodeService = async (email: string, authCode: string) => {
  const expirationTime = addMinutes(new Date(), 5); // Expiration dans 5 minutes
  await authRepository.storeAuthCodeRepository(email, authCode, expirationTime);
};

// Vérifier le code d'authentification
export const verifyAuthCodeService = async (email: string, otp: string) => {
  const isValid = await authRepository.verifyAuthCodeRepository(email, otp);
  if (!isValid) {
    throw new ForbiddenError("Invalid OTP or email");
  }

  let customer = await profileRepository.getCustomerByEmailRepository(email);
  if (!customer) {
    await profileRepository.addprofileRepository(email);
    customer = await profileRepository.getCustomerByEmailRepository(email);
  }

  // Générer le token JWT
  const token = generateToken(customer.id, customer.email, customer.role);
  return { token, customer };
};
