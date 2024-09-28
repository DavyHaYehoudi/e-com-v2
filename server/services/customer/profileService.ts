import {
  ProfileInputDTO,
  ProfileInputReservedAdminDTO,
} from "../../controllers/customer/entities/dto/profile.dto.js";
import * as profileRepository from "../../repositories/customer/profileRepository.js";

// Récupérer le profil du customer
export const getCustomerProfileService = async (customerId: number) => {
  return await profileRepository.getCustomerByIdRepository(customerId);
};
// Mettre à jour ou créer le profil du customer
export const updateCustomerProfileService = async (
  customerId: number,
  profileData: ProfileInputDTO
) => {
  await profileRepository.updateProfileRepository(customerId, profileData);
};
//Récupérer tous les profils
export const getAllCustomersProfileService = async () => {
  return await profileRepository.getAllCustomersRepository();
};

// Admin - Récupérer les données de n'importe quel customer
export const getAnyCustomerByIdService = async (customerId: number) => {
  return await profileRepository.getAnyCustomerByIdRepository(customerId);
};
// Admin - Mettre à jour un customer (désactiver)
export const updateAnyCustomerProfileService = async (
  customerId: number,
  profileData: ProfileInputReservedAdminDTO
) => {
  await profileRepository.updateAnyProfileRepository(customerId, profileData);
};
// Admin - Récupérer tous les customer ayant consenti aux emails marketing 
export const getCustomersWithEmailMarketingConsentService = async () => {
  return await profileRepository.getCustomersWithEmailMarketingConsentRepository();
};