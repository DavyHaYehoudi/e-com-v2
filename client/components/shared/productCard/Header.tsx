import { ProductCardProps } from "@/app/types/ProductTypes";
import { isProductNew, isProductOnSale } from "@/app/utils/productUtils";
import Image from "next/image";
import React from "react";
import PromotionBadge from "../badge/PromotionBadge";
import NewBadge from "../badge/NewBadge";
import CashbackBadge from "../badge/CashbackBadge";

const Header: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="relative p-1" style={{ width: "100%", height: "65%" }}>
      {isProductOnSale(product.discount_percentage) && (
        <PromotionBadge
          discountPercentage={product.discount_percentage}
          additionalClasses="absolute top-2 right-2"
        />
      )}

      {isProductNew(product.new_until) && (
        <NewBadge additionalClasses="absolute top-2 left-2 " />
      )}

      {product.cash_back && (
        <CashbackBadge
          cashbackAmount={product.cash_back}
          additionalClasses="absolute top-2 left-1/2 transform -translate-x-1/2 "
        />
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
