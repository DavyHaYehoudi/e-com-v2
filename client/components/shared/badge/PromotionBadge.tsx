import formatPromotionDate from "@/app/utils/productUtils";
import { Badge } from "@/components/ui/badge";
import React from "react";

const PromotionBadge: React.FC<{
  discountPercentage: number | null;
  additionalClasses?: string;
  discount_end_date: string | null;
}> = ({ discountPercentage, additionalClasses,discount_end_date }) => {
  return (
    <Badge
      className={`bg-yellow-400 text-gray-700 text-xs  text-center font-bold px-2 py-1 rounded w-[100px] p-1 ${additionalClasses}`}
      variant="outline"
    >
      -{discountPercentage}% {" "}<br /> {discount_end_date&& formatPromotionDate(discount_end_date)}
    </Badge>
  );
};

export default PromotionBadge;
