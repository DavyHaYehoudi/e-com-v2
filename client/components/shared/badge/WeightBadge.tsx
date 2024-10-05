import { formatWeight } from "@/app/utils/weightFormat";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface WeightBadgeProps {
  weight: number; // en grammes
}
const WeightBadge: React.FC<WeightBadgeProps> = ({ weight }) => {
  return (
    <Badge className="bg-gray-400 text-white text-xs font-bold px-2 py-1 rounded-full">
      {formatWeight(weight)}
    </Badge>
  );
};

export default WeightBadge;
