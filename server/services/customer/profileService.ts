import {
  FiltersSchemaDTO,
  ProfileInputDTO,
  ProfileInputReservedAdminDTO,
} from "../../controllers/customer/entities/dto/profile.dto.js";
import * as profileRepository from "../../repositories/customer/profileRepository.js";

// Récupérer le profil du customer
export const getCustomerProfileService = async (customerId: number) => {
  const profile = await profileRepository.getCustomerByIdRepository(customerId);
  return {
    ...profile,
    email_marketing_consent: profile.email_marketing_consent === 1,
  };
};
// Mettre à jour ou créer le profil du customer
export const updateCustomerProfileService = async (
  customerId: number,
  profileData: ProfileInputDTO
) => {
  await profileRepository.updateProfileRepository(customerId, profileData);
};

// Admin - Récupérer tous les profils
export const getAllCustomersProfileService = async (
  filters: FiltersSchemaDTO
) => {
  return await profileRepository.getAllCustomersRepository(filters);
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
