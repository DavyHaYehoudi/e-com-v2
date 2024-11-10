export interface CashBack {
    toEarn: number;
    toSpend: number;
    overageToSpend: number;
    newBalance: number;
  }
  
  export interface OrderItem {
    productId: number;
    discount_percentage: number | null;
    price_before_discount: number;
    article_number: number;
  }
  
  export interface OrderAmountApi {
    orderAmount: number;
    codePromoAmount: number;
    codePromoPercentage: number;
    totalPromotionAmount: number;
    shippingPrice: number;
    totalWeight: number;
    amountGiftCardUsed: number;
    cashBack: CashBack;
    orderItems: OrderItem[];
  }
  