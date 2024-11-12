import { Request, Response, NextFunction } from "express";
import * as paymentService from "../../services/payment/paymentAmountService.js";
import {
  paymentAmountSchema,
  preprocessPaymentAmountQuery,
} from "./entities/dto/paymentAmount.dto.js";
import { CustomJwtPayload } from "../../repositories/auth/dao/auth.dao.js";

// Calcul du montant de la commande incluant les réductions et le prix de la livraison
export const getPaymentAmountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    console.log('req.query):', req.query) 
    const preprocessedQuery = preprocessPaymentAmountQuery(req.query);
    const validatedData = paymentAmountSchema.parse(preprocessedQuery);
    const { codePromo, giftCardIds, shippingMethodId, cashBackToSpend } =
      validatedData;
      console.log('validatedData:', validatedData)
    const paymentAmount = await paymentService.getPaymentAmountService(
      customerId,
      shippingMethodId,
      giftCardIds,
      codePromo,
      cashBackToSpend
    );
    res.status(200).json(paymentAmount);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
