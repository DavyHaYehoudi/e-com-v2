import { PaymentStatusDTO } from "../../controllers/payment/entities/dto/paymentStatus.dto.js";
import { paymentStatusFailedRepository, paymentStatusPaidRepository } from "../../repositories/payment/paymentStatusRepository.js";

export const paymentStatusService = async (
  customerId: number,
  body: PaymentStatusDTO
) => {
  if (body.status === "paid") {
    console.log('paid status');
    
    await paymentStatusPaidRepository(customerId, body);
  }
  if (body.status === "failed") {
    console.log('failed status');
    await paymentStatusFailedRepository(customerId, body);
  }
};
