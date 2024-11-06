import { Request, Response, NextFunction } from "express";
import {
  paymentAmountSchema,
  preprocessPaymentAmountQuery,
} from "./entities/dto/paymentAmount.dto.js";
import { CustomJwtPayload } from "../../repositories/auth/dao/auth.dao.js";
import { getPaymentIntentService } from "../../services/payment/paymentIntentService.js";

// Calcul du montant de la commande incluant les réductions et le prix de la livraison
export const getPaymentIntentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    console.log('req.body):', req.body.bodyData) 
    const preprocessedQuery = preprocessPaymentAmountQuery(req.body.bodyData);
    const validatedData = paymentAmountSchema.parse(preprocessedQuery);
    const { codePromo, giftCardIds, shippingMethodId, cashBackToSpend,emailCustomer } =
      validatedData;
      console.log('validatedData:', validatedData)
    const paymentIntent = await getPaymentIntentService(
      customerId,
      shippingMethodId,
      giftCardIds,
      codePromo,
      cashBackToSpend,
      emailCustomer
    );
    res.status(200).json(paymentIntent);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
