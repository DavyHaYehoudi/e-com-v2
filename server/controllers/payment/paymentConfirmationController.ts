import { Request, Response, NextFunction } from "express";
import { CustomJwtPayload } from "../../repositories/auth/dao/auth.dao.js";
import { createOrderSchema } from "./entities/dto/paymentConfirmation.dto.js";
import { createOrderService } from "../../services/payment/paymentConfirmationService.js";

// Calcul du montant de la commande incluant les réductions et le prix de la livraison
export const getPaymentConfirmationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    // console.log('req.body de getPaymentConfirmationController:', req.body) 
    const validatedData = createOrderSchema.parse(req.body);
    const paymentConfirmation = await createOrderService( 
      customerId,
      validatedData
    );
    // console.log('paymentConfirmation:', paymentConfirmation)
    res.status(201).json(paymentConfirmation);
  } catch (error) {
    console.error(error);
    next(error);
  } 
}; 