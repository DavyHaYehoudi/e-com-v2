import { Request, Response, NextFunction } from "express";
import * as reviewService from "../../services/review/reviewService.js";
import {
  createReviewSchema,
  updateReviewSchema,
} from "./entities/dto/review.dto.js";
import { CustomJwtPayload } from "../../repositories/auth/dao/auth.dao.js";

// Récupérer tous les commentaires
export const getAllReviewsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await reviewService.getAllReviewsService();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};
// Récupérer un commentaire
export const getReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewId = parseInt(req.params.reviewId);
    const review = await reviewService.getReviewService(reviewId);
    res.json(review);
  } catch (error) {
    next(error);
  }
};
// Créer un nouveau commentaire
export const createReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const reviewData = createReviewSchema.parse(req.body);
    const newReview = await reviewService.createReviewService(
      customerId,
      reviewData
    );
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// Mettre à jour un commentaire
export const updateReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const reviewId = parseInt(req.params.reviewId);
    const reviewData = updateReviewSchema.parse(req.body);
    await reviewService.updateReviewService(customerId, reviewId, reviewData);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Approuver un commentaire
export const approveReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewId = parseInt(req.params.reviewId);
    await reviewService.approveReviewService(reviewId);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// Supprimer un commentaire
export const deleteReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const reviewId = parseInt(req.params.reviewId);
    await reviewService.deleteReviewService(customerId, reviewId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
