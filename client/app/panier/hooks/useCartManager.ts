import { useCallback, useMemo } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import useCart from "./useCart";
import { CartItemsType, CartResponse } from "@/app/types/CartTypes";
import { ProductCartGiftcards } from "@/app/types/ProductTypes";
import useAuthStatus from "@/app/hooks/useAuthStatus";

interface ProductProps {
  product?: { id: number };
  selectedVariant?: string;
  quantity: number;
  amount?: number;
  type: "item" | "giftCard";
}

export const useCartManager = () => {
  const { productsInCart, setProductsInCart } = useCart();
  const { triggerFetch } = useFetch("/customer/cart", {
    method: "PUT",
    requiredCredentials: true,
  });
  const { isAuthenticated } = useAuthStatus();
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
    ({ product, selectedVariant, quantity, amount, type }: ProductProps) => {
      const updatedItems =
        type === "item" && product && selectedVariant
          ? (() => {
              // Vérifier si le produit existe déjà dans les items du panier
              const existingItemIndex = productsInCart?.items.findIndex(
                (item) =>
                  item.id === product.id &&
                  (selectedVariant
                    ? item.selectedVariant === selectedVariant
                    : true)
              );

              if (existingItemIndex && existingItemIndex !== -1) {
                // Mettre à jour la quantité de l'article existant
                const itemsCopy = [...(productsInCart?.items || [])];
                itemsCopy[existingItemIndex].quantityInCart = quantity;
                return itemsCopy;
              } else {
                // Ajouter un nouvel item
                return [
                  ...(productsInCart?.items || []),
                  {
                    id: product.id,
                    selectedVariant,
                    quantityInCart: quantity,
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
                  },
                ];
              }
            })()
          : productsInCart?.items || [];

      const updatedGiftCards =
        type === "giftCard" && amount
          ? [
              ...(productsInCart?.giftCards || []),
              {
                amount,
                quantity,
                id: Math.floor(Math.random() * 1000000) + Date.now(), // ID aléatoire unique et temporaire
                cart_id: 0,
                created_at: "",
                updated_at: "",
              },
            ]
          : productsInCart?.giftCards || [];

      const updatedCart = {
        cart: productsInCart?.cart,
        items: updatedItems,
        giftCards: updatedGiftCards,
      };

      setProductsInCart(updatedCart); // Mise à jour du contexte
      saveCartToLocalStorage(updatedCart); // Sauvegarde dans localStorage

      if (isAuthenticated) {
        triggerFetch(formatCartForAPI(updatedItems, updatedGiftCards)); // Envoi à l'API
      }
    },
    [productsInCart, setProductsInCart, triggerFetch]
  );

  // Retirer un produit du panier
  const removeProduct = useCallback(
    (productId: number, variant: string | null, type: "item" | "giftCard") => {
      // Filtre pour supprimer un item selon le type spécifié
      const updatedItems =
        type === "item"
          ? productsInCart?.items.filter(
              (item) =>
                !(item.id === productId && item.selectedVariant === variant)
            ) || []
          : productsInCart?.items || [];

      const updatedGiftCards =
        type === "giftCard"
          ? productsInCart?.giftCards.filter(
              (giftCard) => giftCard.id !== productId
            ) || []
          : productsInCart?.giftCards || [];

      const updatedCart = {
        cart: productsInCart?.cart,
        items: updatedItems,
        giftCards: updatedGiftCards,
      };

      setProductsInCart(updatedCart); // Mise à jour du contexte
      // Sauvegarde dans localStorage
      saveCartToLocalStorage(updatedCart);
      // Envoi à l’API avec le format correct
      if (isAuthenticated) {
        triggerFetch(formatCartForAPI(updatedItems, updatedGiftCards));
      }
    },
    [productsInCart, setProductsInCart, triggerFetch]
  );

  // Calcul du nombre total d'articles
  const totalItemsInCart = useMemo(() => {
    const itemsCount =
      productsInCart?.items.reduce(
        (acc, item) => acc + item.quantityInCart,
        0
      ) || 0;
    const giftCardsCount =
      productsInCart?.giftCards.reduce(
        (acc, giftCard) => acc + giftCard.quantity,
        0
      ) || 0;
    return itemsCount + giftCardsCount;
  }, [productsInCart]);
  return {
    addOrUpdateProduct,
    removeProduct,
    productsInCart,
    totalItemsInCart,
  };
};
