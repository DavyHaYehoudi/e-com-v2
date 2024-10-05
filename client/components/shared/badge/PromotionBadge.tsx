import { Badge } from "@/components/ui/badge";
import React from "react";

const PromotionBadge: React.FC<{
  discountPercentage: number | null;
  additionalClasses?: string;
}> = ({ discountPercentage, additionalClasses }) => {
  return (
    <Badge
      className={`bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full ${additionalClasses}`}
      variant="outline"
    >
      -{discountPercentage}%
    </Badge>
  );
};

export default PromotionBadge;
