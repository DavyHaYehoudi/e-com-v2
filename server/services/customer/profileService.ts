import { ProfileInput } from "../../dto/customer/profile.dto.js";
import * as profileRepository from "../../repositories/customer/profileRepository.js";

// Récupérer le profil du customer
export const getCustomerProfileService = async (
  customerId: number,
) => {
  return await profileRepository.getCustomerByIdRepository(customerId);
};
// Mettre à jour ou créer le profil du customer
export const updateCustomerProfileService = async (
  customerId: number,
  profileData: ProfileInput
) => {
   await profileRepository.updateProfileRepository(customerId, profileData);
};
//Récupérer tous les profils
export const getAllCustomersProfileService = async () => {
  return await profileRepository.getAllCustomersRepository();
};