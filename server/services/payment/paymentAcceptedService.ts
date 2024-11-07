import { getPaymentAcceptedRepository } from "../../repositories/payment/paymentAcceptedRepository.js";

export const getPaymentAcceptedService = async (
  customerId: number,
  confirmation_number: string
) => {
  await getPaymentAcceptedRepository(customerId, confirmation_number);
};
