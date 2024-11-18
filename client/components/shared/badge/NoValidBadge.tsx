import { Badge } from "@/components/ui/badge";
import React from "react";

const NoValidBadge = () => {
  return (
    <Badge
      className="text-xs text-center font-bold px-2 py-1 rounded-full bg-rose-500 text-[var(--whiteSmoke)]"
      variant="outline"
    >
      non valide
    </Badge>
  );
};

export default NoValidBadge;
