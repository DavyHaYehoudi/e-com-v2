import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import React from "react";

interface ProductImageItemProps {
  path: string;
  name: string;
  productId: number;
}

const ProductImageItem: React.FC<ProductImageItemProps> = ({
  path,
  name,
  productId,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <a href={`/produits/${productId}`}>
            <Image
              className="w-full object-center rounded-[16px] cursor-pointer"
              src={`/images/${path}`}
              alt={name}
              width={150}
              height={150}
            />
          </a>
        </TooltipTrigger>
        <TooltipContent>Voir le produit</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProductImageItem;
