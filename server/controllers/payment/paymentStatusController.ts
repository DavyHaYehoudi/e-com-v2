import { Request, Response, NextFunction } from "express";
import { CustomJwtPayload } from "../../repositories/auth/dao/auth.dao.js";
import { paymentStatusSchema } from "./entities/dto/paymentStatus.dto.js";
import { paymentStatusService } from "../../services/payment/paymentStatusService.js";

// Calcul du montant de la commande incluant les réductions et le prix de la livraison
export const paymentStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    // console.log('req.body paymentStatusController):', req.body)
    const validatedData = paymentStatusSchema.parse(req.body);
    // console.log('validatedData paymentStatusController:', validatedData)
    await paymentStatusService(customerId, validatedData);
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    next(error);
  }
};
