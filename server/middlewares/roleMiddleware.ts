import { Request, Response, NextFunction } from "express";

// Middleware pour vérifier le rôle
export const verifyRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || typeof user !== "object" || user.role !== requiredRole) {
      return res
        .status(403)
        .json({ error: "Access denied, insufficient permissions." });
    }

    next();
  };
};
