import { CreateReviewDTO } from "../../dto/review/review.dto";
import * as reviewService from "../../repositories/review/reviewRepository.js";

// Récupérer tous les commentaires
export const getAllReviewsService = async () => {
  return await reviewService.getAllReviewsRepository();
};
// Récupérer un commentaire
export const getReviewService = async (reviewId: number) => {
  return await reviewService.getReviewRepository(reviewId);
};

// Créer un nouveau commentaire
export const createReviewService = async (
  customerId: number,
  reviewData: CreateReviewDTO
) => {
  const newReview = await reviewService.createReviewRepository(
    customerId,
    reviewData
  );
  return newReview;
};
// Mettre à jour un commentaire
export const updateReviewService = async (
  customerId: number,
  reviewId: number,
  updatedFields: Record<string, any>
) => {
  await reviewService.updateReviewRepository(
    customerId,
    reviewId,
    updatedFields
  );
};
// ADMIN - Approuver un commentaire
export const approveReviewService = async (reviewId: number) => {
  await reviewService.approveReviewRepository(reviewId);
};
// Supprimer un commentaire
export const deleteReviewService = async (
  customerId: number,
  reviewId: number
) => {
  await reviewService.deleteReviewRepository(customerId, reviewId);
};
