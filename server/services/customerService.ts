import * as customerRepository from "../repositories/customerRepository";

export const getCustomerByEmail = async (email: string) => {
  const customer = await customerRepository.getCustomerByEmail(email);
  return customer;
};
export const addCustomer = async (email: string) => {
  const newCustomer = await customerRepository.addCustomer(email);
  return newCustomer;
};
