export const calculateTotalPriceByRow = (
  quantity: number,
  price: number,
  discountPercentage: number | undefined | null
): number => {
  if (discountPercentage) {
    const discountAmount = (discountPercentage * price) / 100;
    const discountedPrice = price - discountAmount;
    return quantity * discountedPrice;
  }

  // Si pas de réduction, retourne le prix normal
  return quantity * price;
};

export const calculateTotalDiscountByRow = (
  quantity: number,
  price: number,
  discountPercentage: number | undefined | null
): number => {
  if (discountPercentage) {
    const discountAmount = (discountPercentage * price) / 100;
    return quantity * discountAmount;
  }
  // Pas de réduction, donc pas de discount
  return 0;
};
