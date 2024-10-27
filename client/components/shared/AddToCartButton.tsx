"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import Header from "../pages/cart-sheet/header/Header";
import Footer from "../pages/cart-sheet/footer/Footer";
import Body from "../pages/cart-sheet/body/Body";
import { ScrollArea } from "../ui/scroll-area";
import { MasterProductsType, Product } from "@/app/types/ProductTypes";
import { WishlistGiftCard } from "@/app/types/WishlistTypes";
import { useCartManager } from "@/app/panier/hooks/useCartManager";
import { CartResponse } from "@/app/types/CartTypes";

interface AddToCartButtonProps {
  product: Product | MasterProductsType | WishlistGiftCard;
  selectedVariant: string;
  quantity: number;
  productsInCart: CartResponse | null;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  selectedVariant,
  quantity,
  productsInCart,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const { addOrUpdateProduct } = useCartManager();

  const onAddToCart = () => {
    addOrUpdateProduct({ product, selectedVariant, quantity });
    setIsSheetOpen(true);
  };

  return (
    <>
      <Button
        className="mx-auto block w-1/2 uppercase bg-[var(--golden-2)] hover:bg-[var(--golden-2-hover)]"
        onClick={onAddToCart}
      >
        Ajouter au panier
      </Button>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger />
        <SheetContent className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>
              <Header productsInCart={productsInCart} />
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="flex-grow">
            <ScrollArea className="h-[1000px] w-[350px] rounded-md border p-1">
              <Body />
            </ScrollArea>
          </SheetDescription>
          <Footer />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AddToCartButton;
