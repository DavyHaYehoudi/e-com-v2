//customerController.ts
import { Request, Response, NextFunction } from "express";
import { updateCustomerSchema } from "../dto/customer.dto.js";
import { CustomJwtPayload } from "../types/auth.js";
import * as customerRepository  from "../repositories/customerRepository.js";

export const updateCustomerProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validation des données avec Zod
      const validatedData = updateCustomerSchema.parse(req.body);
  
      const customerId = (req.user as CustomJwtPayload).id; // Récupérer l'ID du customer à partir du token JWT
  
      // Mettre à jour le customer dans la DB
      const result = await customerRepository.updateCustomer(customerId, validatedData);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      res.status(200).json({ message: "Customer profile updated successfully" });
    } catch (error) {
      next(error);
    }
  };