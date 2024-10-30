// src/hooks/useWishlist.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useFetch } from "@/service/hooks/useFetch";
import useAuthStatus from "@/app/hooks/useAuthStatus";
import { WishlistResponse } from "@/app/types/WishlistTypes";

const useWishlist = () => {
  const [productsWishlist, setProductsWishlist] =
    useState<WishlistResponse | null>(null);
  const { isAuthenticated, isVisitor, isTokenExpired } = useAuthStatus();
  const { data, triggerFetch } = useFetch<WishlistResponse>(
    "/customer/wishlist",
    {
      requiredCredentials: true,
    }
  );

  const getWishlist = async () => {
    if (isAuthenticated) {
      await triggerFetch();
    }
  };

  useEffect(() => {
    // Récupération initiale de la wishlist pour les utilisateurs authentifiés
    if (isAuthenticated) {
      getWishlist();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && data) {
      setProductsWishlist(data);
    } else if (isVisitor) {
      const wishlistCustomer = localStorage.getItem("wishlistCustomer");
      if (wishlistCustomer) {
        try {
          const parsedWishlist = JSON.parse(
            wishlistCustomer
          ) as WishlistResponse;
          setProductsWishlist(parsedWishlist);
        } catch (error) {
          console.error(
            "Erreur lors du parsing de la liste des favoris:",
            error
          );
        }
      } else {
        // Initialiser une liste de favoris vide pour le visiteur
        setProductsWishlist({ items: [] });
      }
    }

    if (isTokenExpired && isAuthenticated) {
      toast.warning("Votre session a expiré. Veuillez vous reconnecter.");
    }
  }, [data, isAuthenticated, isVisitor, isTokenExpired]);

  useEffect(() => {
    // Mise à jour du localStorage pour les visiteurs uniquement
    if (isVisitor && productsWishlist) {
      localStorage.setItem(
        "wishlistCustomer",
        JSON.stringify(productsWishlist)
      );
    }
  }, [productsWishlist, isVisitor]);

  return { productsWishlist, getWishlist, setProductsWishlist };
};

export default useWishlist;
