import * as customerRepository from "../repositories/customerRepository.js";
import { addMinutes } from "date-fns";
import * as authRepository from "../repositories/authRepository.js";
import { generateToken } from "../utils/jwt.js";
import { ForbiddenError, NotFoundError } from "../exceptions/CustomErrors.js";

// Enregistrer le code d'authentification
export const storeAuthCode = async (email: string, authCode: string) => {
  const expirationTime = addMinutes(new Date(), 5); // Expiration dans 5 minutes
  await authRepository.storeAuthCode(email, authCode, expirationTime);
};

// Vérifier le code d'authentification
export const verifyAuthCode = async (email: string, otp: string) => {
  const isValid = await authRepository.verifyAuthCode(email, otp);
  if (!isValid) {
    throw new ForbiddenError("Invalid OTP or email");
  }

  let customer = await customerRepository.getCustomerByEmail(email);
  if (!customer) {
    await customerRepository.addCustomer(email);
    customer = await customerRepository.getCustomerByEmail(email);
  }

  // Générer le token JWT
  const token = generateToken(customer.id, customer.email, customer.role);
  return { token, customer };
};
