import { useFetch } from "@/service/hooks/useFetch";
import { MasterProductsType, Product } from "@/app/types/ProductTypes";
import useWishlist from "./useWishlist";
import { WishlistResponse } from "@/app/types/WishlistTypes";
import useAuthStatus from "@/app/hooks/useAuthStatus";
import { useDispatch } from "react-redux";
import { toggleItem } from "@/redux/slice/wishlistSlice";

export const useWishlistManager = () => {
  const { productsWishlist, getWishlist, setProductsWishlist } = useWishlist();
  const { triggerFetch } = useFetch("/customer/wishlist", {
    method: "PATCH",
    requiredCredentials: true,
  });
  const { isAuthenticated, isVisitor } = useAuthStatus();
  const dispatch = useDispatch();

  // Helper pour formater les items pour l'API
  const formatWishlistForAPI = (item: MasterProductsType) => ({
    items: [{ product_id: item.id }],
  });

  // Helper pour sauvegarder la liste de favoris dans localStorage
  const saveWishlistToLocalStorage = (wishlist: WishlistResponse) => {
    localStorage.setItem("wishlistCustomer", JSON.stringify(wishlist));
  };
  // Fonction pour récupérer la wishlist du localStorage pour les visiteurs
  const getWishlistFromLocalStorage = (): WishlistResponse => {
    const wishlistCustomer = localStorage.getItem("wishlistCustomer");
    return wishlistCustomer ? JSON.parse(wishlistCustomer) : { items: [] };
  };
  // Ajouter ou mettre à jour un produit dans la liste de favoris
  const toggleProductInWishlist = async (
    product: Product | MasterProductsType
  ) => {
    const newItem = {
      id: product.id,
      name: product.name,
      SKU: product.SKU,
      description: product.description,
      continue_selling: product.continue_selling,
      quantity_in_stock: product.quantity_in_stock,
      discount_percentage: product.discount_percentage,
      discount_end_date: product.discount_end_date,
      price: product.price,
      new_until: product.new_until,
      is_published: product.is_published,
      is_star: product.is_star,
      is_archived: false,
      images: [],
      main_image: product.main_image,
      categories: [],
      tags: [],
      variants: [],
      weight: product.weight,
      cash_back: product.cash_back,
      createdAt: "",
      updatedAt: "",
    };

    try {
      let updatedItems;
      if (isVisitor) {
        // Pour les visiteurs, récupère la wishlist actuelle du localStorage
        const localWishlist = getWishlistFromLocalStorage();
        const isInWishlist = localWishlist.items.some(
          (p) => p.id === product.id
        );

        if (isInWishlist) {
          // Si le produit est déjà dans la liste, on le retire
          updatedItems = localWishlist.items.filter((p) => p.id !== product.id);
        } else {
          // Sinon, on ajoute le produit
          updatedItems = [...localWishlist.items, newItem];
        }

        const updatedWishlist = {
          wishlist: localWishlist.wishlist,
          items: updatedItems,
        };

        // Met à jour le state et le localStorage
        setProductsWishlist(updatedWishlist);
        saveWishlistToLocalStorage(updatedWishlist);
      }

      // Envoi à l'API pour les utilisateurs authentifiés
      if (isAuthenticated) {
        await triggerFetch(formatWishlistForAPI(newItem));
        await getWishlist();
      }
      dispatch(toggleItem(newItem));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    toggleProductInWishlist,
    productsWishlist,
    getWishlist,
  };
};
