import { formatPrice } from "@/app/(public)/utils/pricesFormat";
import { Badge } from "@/components/ui/badge";
import React from "react";

const CashbackBadge: React.FC<{
  cashbackAmount: number;
  additionalClasses?: string;
}> = ({ cashbackAmount, additionalClasses }) => {
  return (
    <Badge
      className={` bg-blue-500 text-white text-xs font-bold px-2 py-2 text-center rounded-full ${additionalClasses}`}
      variant="outline"
    >
      Cashback
      <br /> +{formatPrice(cashbackAmount)}
    </Badge>
  );
};

export default CashbackBadge;
