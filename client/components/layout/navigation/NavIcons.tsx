import { ShoppingBagIcon, BadgeEuro } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginModal from "@/components/modules/login/LoginModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import WishlistModal from "@/components/modules/wishlist/WishlistModal";
import { formatPrice } from "@/app/utils/pricesFormat";

const NavIcons = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simule la connexion
  const [wishlistCount, setWishlistCount] = useState(3); // Simule le nombre de produits dans la wishlist
  const [cartCount, setCartCount] = useState(2); // Simule le nombre de produits dans le panier

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false); // Déconnexion
    }
  };
  const handleAuthentication = (boolean: boolean) => {
    setIsAuthenticated(boolean); // Connexion
  };
  const cashbackCustomer = 10;

  return (
    <div className="flex items-center space-x-8 mr-24 text-gray-500">
      {/* Connexion / Déconnexion */}
      {isAuthenticated ? (
        <>
          <Link href="/dashboard">
            <Avatar className="cursor-pointer">
              <AvatarImage src="/images/avatar.png" alt="Avatar" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </Link>
          <Button
            className="bg-[var(--whiteSmoke)] text-gray-400
             hover:text-gray-500 hover:bg-gray-200"
            onClick={handleLoginLogout}
          >
            Déconnexion
          </Button>
        </>
      ) : (
        <LoginModal authenticate={handleAuthentication} />
      )}

      {/* Icône Wishlist avec badge */}

      <div className="relative">
        <WishlistModal />
        {wishlistCount > 0 && (
          <span className="absolute bottom-6 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {wishlistCount}
          </span>
        )}
      </div>

      {/* Icône Panier avec badge */}
      <div className="relative">
        <a href="/panier">
          <span title="Panier">
            <ShoppingBagIcon className="w-6 h-6 mb-2 cursor-pointer" />
          </span>

          {cartCount > 0 && (
            <span className="absolute bottom-6 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {cartCount}
            </span>
          )}
        </a>
      </div>

      {/* Icône Cashback avec badge */}
      {isAuthenticated && (
        <div className="relative">
          <span title="Votre cashback">
            <BadgeEuro className="w-6 h-6 mb-2 " />
          </span>

          {cashbackCustomer > 0 && (
            <span className="absolute bottom-6 left-4 inline-flex items-center justify-center px-2 py-1 text-s font-bold leading-none text-white bg-blue-500 rounded-full whitespace-nowrap">
              {formatPrice(cashbackCustomer)}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
export default NavIcons;
