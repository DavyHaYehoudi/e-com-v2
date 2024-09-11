import { AddressInput } from "../../dto/customer/address.dto.js";
import * as addressRepository from "../../repositories/customer/addressRepository.js";

// Récupérer l' adresse shipping/billing du customer
export const getCustomerAddressService = async (
  customerId: number,
  type: string
) => {
  return await addressRepository.getCustomerAddressRepository(customerId, type);
};

// Mettre à jour ou créer une adresse sipping/billing du customer
export const updateCustomerAddressService = async (
  customerId: number,
  type: string,
  addressData: AddressInput
) => {
  const isAddress = await addressRepository.getCustomerAddressRepository(
    customerId,
    type
  );
  if (isAddress) {
    await addressRepository.updateCustomerAddressRepository(
      customerId,
      type,
      addressData
    );
  } else {
    await addressRepository.createCustomerAddressRepository(
      customerId,
      type,
      addressData
    );
  }
};
