import { useCallback } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import useCart from "./useCart";
import { CartItemsType, CartResponse } from "@/app/types/CartTypes";
import { ProductCartGiftcards } from "@/app/types/ProductTypes";

interface ProductProps {
  product: { id: number };
  selectedVariant: string;
  quantity: number;
}

export const useCartManager = () => {
  const { productsInCart, setProductsInCart } = useCart();
  const { triggerFetch } = useFetch("/customer/cart", {
    method: "PUT",
    requiredCredentials: true,
  });

  // Helper pour formater les items pour l'API
  const formatCartForAPI = (
    items: CartItemsType[],
    giftCards: ProductCartGiftcards[]
  ) => ({
    items: items.map((item) => ({
      product_id: item.id,
      variant: item.selectedVariant,
      quantity: item.quantityInCart,
    })),
    gift_cards: giftCards.map((giftCard) => ({
      amount: giftCard.amount,
      quantity: giftCard.quantity,
    })),
  });
  // Helper pour sauvegarder le panier dans localStorage
  const saveCartToLocalStorage = (cart: CartResponse) => {
    localStorage.setItem("cartCustomer", JSON.stringify(cart));
  };

  // Ajouter ou mettre à jour un produit dans le panier
  const addOrUpdateProduct = useCallback(
    ({ product, selectedVariant, quantity }: ProductProps) => {
      const updatedItems = productsInCart?.items
        ? [...productsInCart.items]
        : [];

      // Trouver le produit dans le panier
      const existingItemIndex = updatedItems.findIndex(
        (item) =>
          item.id === product.id && item.selectedVariant === selectedVariant
      );

      if (existingItemIndex !== -1) {
        // Mise à jour de la quantité
        updatedItems[existingItemIndex].quantityInCart = quantity;
      } else {
        // Ajouter un nouvel élément
        updatedItems.push({
          id: product.id,
          selectedVariant,
          quantityInCart: quantity,
          // Autres propriétés nécessaires uniquement dans le panier local
          name: "",
          SKU: "",
          description: "",
          weight: null,
          continue_selling: true,
          quantity_in_stock: 0,
          discount_percentage: null,
          discount_end_date: null,
          price: 0,
          new_until: "",
          cash_back: null,
          is_published: true,
          is_star: false,
          is_archived: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          images: [],
          categories: [],
          tags: [],
          variants: [],
        });
      }

      const updatedCart = {
        cart: productsInCart?.cart,
        items: updatedItems,
        giftCards: productsInCart?.giftCards || [],
      };

      setProductsInCart(updatedCart); // Mise à jour du contexte
      // Sauvegarde dans localStorage
      saveCartToLocalStorage(updatedCart);
      // Envoi à l’API avec le format correct
      triggerFetch(formatCartForAPI(updatedItems, updatedCart.giftCards));
    },
    [productsInCart, setProductsInCart, triggerFetch]
  );

  // Retirer un produit du panier
  const removeProduct = useCallback(
    (productId: number, variant: string | null) => {
      const updatedItems =
        productsInCart?.items.filter(
          (item) => !(item.id === productId && item.selectedVariant === variant)
        ) || [];

      const updatedCart = {
        cart: productsInCart?.cart,
        items: updatedItems || [],
        giftCards: productsInCart?.giftCards || [],
      };

      setProductsInCart(updatedCart); // Mise à jour du contexte
      // Sauvegarde dans localStorage
      saveCartToLocalStorage(updatedCart);
      // Envoi à l’API avec le format correct
      triggerFetch(formatCartForAPI(updatedItems, updatedCart.giftCards));
    },
    [productsInCart, setProductsInCart, triggerFetch]
  );

  return { addOrUpdateProduct, removeProduct, productsInCart };
};
