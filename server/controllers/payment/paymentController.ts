import { Request, Response, NextFunction } from "express";
import * as paymentService from "../../services/payment/paymentService.js";
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
    const preprocessedQuery = preprocessPaymentAmountQuery(req.query);
    const validatedData = paymentAmountSchema.parse(preprocessedQuery);
    const { codePromo, giftCardIds, shippingMethodId } = validatedData;
    const paymentAmount = await paymentService.getPaymentAmountService(
      customerId,
      shippingMethodId,
      giftCardIds,
      codePromo
    );
    res.status(200).json({ amount: paymentAmount });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
