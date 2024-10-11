import React, { useState } from "react";
import { Button } from "../ui/button";
import { ProductCardProps } from "@/app/types/ProductTypes";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"; // Assurez-vous que ce chemin est correct
import { productsInCart } from "@/app/mocks/products";
import Header from "../pages/cart-sheet/header/Header";
import Footer from "../pages/cart-sheet/footer/Footer";
import Body from "../pages/cart-sheet/body/Body";
import { ScrollArea } from "../ui/scroll-area";

const AddToCartButton: React.FC<ProductCardProps> = ({ product }) => {
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const onToggleCart = () => {
    // Change l'état du bouton immédiatement
    setIsAddedToCart(!isAddedToCart);
    // Ouvre le composant Sheet
    setIsSheetOpen(true);
  };

  return (
    <>
      <Button
        className={`mx-auto block w-1/2 uppercase ${
          isAddedToCart
            ? "bg-[var(--whiteSmoke)] text-gray-400 hover:text-gray-500 hover:bg-gray-200"
            : "bg-[var(--golden-2)] hover:bg-[var(--golden-2-hover)]"
        }`}
        onClick={onToggleCart}
      >
        {isAddedToCart ? "Retirer du panier" : "Ajouter au panier"}
      </Button>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger />
        <SheetContent className="flex flex-col h-full">
          {" "}
          {/* Ajout de flex et h-full */}
          <SheetHeader>
            <SheetTitle>
              <Header productsInCart={productsInCart} />
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="flex-grow">
            {" "}
            {/* Utilisation de flex-grow pour remplir l'espace */}
            <ScrollArea className="h-[1000px] w-[350px] rounded-md border p-1">
              <Body />
            </ScrollArea>
          </SheetDescription>
          <Footer /> {/* Positionne le footer en bas */}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AddToCartButton;
