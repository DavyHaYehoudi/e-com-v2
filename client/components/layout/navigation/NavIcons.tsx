"use client";
import { ShoppingBagIcon, BadgeEuro, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginModal from "@/components/modules/login/LoginModal";
import { Button } from "@/components/ui/button";
import WishlistModal from "@/components/modules/wishlist/WishlistModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useEffect } from "react";
import SessionExpired from "@/components/modules/login/SessionExpired";
import { formatPrice } from "@/app/(public)/utils/pricesFormat";
import useAuth from "@/app/(public)/hooks/useAuth";
import useCashback from "@/app/(public)/hooks/useCashback";

const NavIcons = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const cartCountArticles = useSelector(
    (state: RootState) => state.cart.totalItemsCount
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const customerEmail = useSelector(
    (state: RootState) => state.auth.user?.email
  );
  const cashbackCustomer = useSelector(
    (state: RootState) => state.cashback.cashback_total
  );
  const { handleAuthentication, handleLogout } = useAuth();
  const { getCashbackOneCustomer } = useCashback();
  useEffect(() => {
    getCashbackOneCustomer();
  }, []);

  const userRole = useSelector((state: RootState) => state.auth.user?.role);
  // const userRole = "admin";

  return (
    <div className="flex items-center gap-6 text-gray-500">
      {/* Connexion / Déconnexion (visible seulement à partir de md) */}
      {isAuthenticated ? (
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            href={
              userRole === "customer"
                ? "/customer/tableau-de-bord"
                : userRole === "admin"
                ? "/admin/tableau-de-bord"
                : "#"
            }
          >
            <Avatar className="cursor-pointer mb-2">
              <AvatarImage src="/images/avatar.png" alt="Avatar" />
              <AvatarFallback>
                {customerEmail ? customerEmail[0].toUpperCase() : "A"}
              </AvatarFallback>
            </Avatar>
          </Link>
          <Button
            className="bg-dark text-gray-500 hover:text-gray-500 hover:bg-gray-200 mb-2 p-2"
            onClick={handleLogout}
            title="Me déconnecter"
          >
            <LogOut className="w-6 h-6 cursor-pointer" />
          </Button>
        </div>
      ) : (
        <div className="hidden lg:block" title="Me connecter">
          <LoginModal authenticate={handleAuthentication} />
        </div>
      )}
      {/* Icône Wishlist avec badge */}
      <div className="relative">
        <WishlistModal />
        {wishlist.items.length > 0 && (
          <span className="absolute bottom-6 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {wishlist.items.length}
          </span>
        )}
      </div>

      {/* Icône Panier avec badge */}
      <div className="relative" title="Mon panier">
        <Link href="/panier">
          <ShoppingBagIcon className="w-6 h-6 mb-2 cursor-pointer" />
          {cartCountArticles > 0 && (
            <span className="absolute bottom-6 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {cartCountArticles}
            </span>
          )}
        </Link>
      </div>

      {/* Icône Cashback avec badge */}
      {isAuthenticated && (
        <div className="relative hidden lg:flex" title="Mon cashback">
        <Link href="/customer/tableau-de-bord/avantages/cashback">

          <BadgeEuro className="w-6 h-6 mb-2" />
          {cashbackCustomer > 0 && (
            <span className="absolute bottom-6 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none bg-blue-500 text-white rounded-full">
              <span className="whitespace-nowrap">
                {formatPrice(cashbackCustomer)}
              </span>
            </span>
          )}
        </Link>
        </div>
      )}
      {/* Modale de session expirée */}
      <SessionExpired />
    </div>
  );
};

export default NavIcons;
