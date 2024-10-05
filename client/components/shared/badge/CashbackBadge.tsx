import { formatPrice } from "@/app/utils/pricesFormat";
import { Badge } from "@/components/ui/badge";
import React from "react";

const CashbackBadge: React.FC<{
  cashbackAmount: number;
  additionalClasses?: string;
}> = ({ cashbackAmount, additionalClasses }) => {
  return (
    <Badge
      className={`bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full ${additionalClasses}`}
      variant="outline"
    >
      Cashback +{formatPrice(cashbackAmount)}
    </Badge>
  );
};

export default CashbackBadge;
