import { Request, Response, NextFunction } from "express";
import { CustomJwtPayload } from "../../repositories/auth/dao/auth.dao.js";
import { getPaymentAcceptedService } from "../../services/payment/paymentAcceptedService.js";
import { paymentAcceptedQuerySchema } from "./entities/dto/paymentAccepted.dto.js";

export const getPaymentAcceptedController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    console.log('req.body de getPaymentAcceptedController:', req.body)
    const validatedData = paymentAcceptedQuerySchema.parse(req.body);

    await getPaymentAcceptedService(
      customerId,
      validatedData.bodyData
    );
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    next(error);
  }
};  
 