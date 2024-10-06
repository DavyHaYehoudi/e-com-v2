import { ProductCart } from "@/app/types/ProductTypes";

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

export const calculateTotalDiscountCart = (productsInCart: ProductCart[]) => {
  return productsInCart.reduce((sum, product) => {
    if (product.discount_percentage) {
      return (
        sum +
        (product.price * product.quantityInCart * product.discount_percentage) /
          100
      );
    }
    return sum;
  }, 0);
};

export const calculateTotalCashbackCart=(productsInCart:ProductCart[])=>{
    return productsInCart.reduce((sum, product) => {
        if (product.cash_back) {
            return sum + (product.price * product.quantityInCart * product.cash_back) / 100;
        }
        return sum;
    }, 0);
}
export const calculateTotalCartBeforeDiscount=(productsInCart:ProductCart[])=>{
    return productsInCart.reduce((sum, product) => {
        return sum + (product.price * product.quantityInCart);
    }, 0);
}
export const calculateTotalCartAfterDiscount=(productsInCart:ProductCart[],deliveryPrice:number)=>{
    return calculateTotalCartBeforeDiscount(productsInCart) - calculateTotalDiscountCart(productsInCart) + deliveryPrice;
}
export const calculateTotalWeightCart=(productsInCart:ProductCart[])=>{
    return productsInCart.reduce((sum, product) => {
        return sum + (product.weight || 0) * product.quantityInCart;
    }, 0);
}