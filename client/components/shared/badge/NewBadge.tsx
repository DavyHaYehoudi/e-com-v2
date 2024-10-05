import { Badge } from "@/components/ui/badge";
import React from "react";

const NewBadge: React.FC<{
  additionalClasses?: string;
}> = ({ additionalClasses }) => {
  return (
    <Badge
      className={`bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full ${additionalClasses}`}
      variant="outline"
    >
      Nouveau
    </Badge>
  );
};

export default NewBadge;
