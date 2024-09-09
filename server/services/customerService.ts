import * as customerRepository from "../repositories/customerRepository.js";
import { CartInput } from "../types/customer/cart.js";

export const getCustomerByEmail = async (email: string) => {
  const customer = await customerRepository.getCustomerByEmail(email);
  return customer;
};
export const addCustomer = async (email: string) => {
  const newCustomer = await customerRepository.addCustomer(email);
  return newCustomer;
};
// Récupérer le panier du customer
export const getCustomerCart = async (customerId: number) => {
  return await customerRepository.getCustomerCartFromDb(customerId);
};

// Mettre à jour ou créer le panier du customer
export const updateCustomerCart = async (customerId: number, cartData: CartInput) => {
  return await customerRepository.createOrUpdateCartInDb(customerId, cartData);
};