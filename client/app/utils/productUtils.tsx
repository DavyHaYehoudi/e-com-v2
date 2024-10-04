import { isAfter } from "date-fns";
import { Product } from "../types/ProductTypes";

/**
 * Détermine si un produit est en promotion.
 * @param discountPercentage Le pourcentage de la promotion
 * @returns true si le produit est en promotion, false sinon
 */
export const isProductOnSale = (discountPercentage: number | null): boolean => {
  return discountPercentage !== null && discountPercentage > 0;
};

/**
 * Détermine si un produit est encore considéré comme "nouveau".
 * @param newUntil La date limite jusqu'à laquelle le produit est considéré comme nouveau
 * @returns true si le produit est encore nouveau, false sinon
 */
export const isProductNew = (newUntil: string | null): boolean => {
  if (!newUntil) return false;

  const today = new Date();
  const newUntilDate = new Date(newUntil);

  return isAfter(newUntilDate, today);
};

export const priceProduct = (product: Product): number => {
  return product.discount_percentage
    ? product.price - (product.price * product.discount_percentage) / 100
    : product.price;
};
