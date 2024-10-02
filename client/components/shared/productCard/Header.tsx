import { ProductCardProps } from "@/app/types/ProductTypes";
import { isProductNew, isProductOnSale } from "@/app/utils/productUtils";
import Image from "next/image";
import React from "react";

const Header: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="relative p-1" style={{ width: "100%", height: "65%" }}>
      {/* Badge de promotion */}
      {isProductOnSale(product.discount_percentage) && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          -{product.discount_percentage}%
        </span>
      )}

      {/* Badge de nouveauté */}
      {isProductNew(product.new_until) && (
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Nouveau
        </span>
      )}

      {/* Image du produit */}
      <Image
        src={`/images/${product.main_image}`}
        alt={product.name}
        className="w-full h-full object-cover rounded-t-2xl"
        width="450"
        height="520"
      />
    </div>
  );
};

export default Header;
