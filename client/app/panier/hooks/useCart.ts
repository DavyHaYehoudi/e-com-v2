// src/hooks/useCart.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useFetch } from "@/service/hooks/useFetch";
import useAuthStatus from "@/app/hooks/useAuthStatus";
import { CartResponse } from "@/app/types/CartTypes";

const useCart = () => {
  const [productsInCart, setProductsInCart] = useState<CartResponse | null>(
    null
  );
  const { isAuthenticated, isVisitor, isTokenExpired } = useAuthStatus();
  const { data,triggerFetch } = useFetch<CartResponse>("/customer/cart", {
    requiredCredentials: true,
  });
  useEffect(()=>{
    triggerFetch()
  },[])

  useEffect(() => {
    if (isAuthenticated && data) {
      setProductsInCart(data);
    } else if (isVisitor) {
      const cartCustomer = localStorage.getItem("cartCustomer");
      if (cartCustomer) {
        try {
          const parsedCart = JSON.parse(cartCustomer) as CartResponse;
          setProductsInCart(parsedCart);
        } catch (error) {
          console.error("Erreur lors du parsing du panier:", error);
        }
      } else {
        // Initialiser un panier vide pour le visiteur
        setProductsInCart({ items: [], giftCards: [] });
      }
    }

    if (isTokenExpired) {
      toast.warning("Votre session a expiré. Veuillez vous reconnecter.");
    }
  }, [data, isAuthenticated, isVisitor, isTokenExpired]);

  return { productsInCart,setProductsInCart };
};

export default useCart;
