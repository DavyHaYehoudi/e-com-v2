"use client";

import React from "react";
import FavoriteButton from "../FavoriteButton";
import { Product } from "@/app/types/ProductTypes";

interface FooterProps {
  product: Product;
}

const Footer: React.FC<FooterProps> = ({ product }) => {
  return (
    <div className="m-4 w-full pb-5 relative">
      <FavoriteButton product={product} />
    </div>
  );
};

export default Footer;
