import { useState } from "react";
import {
  HeartIcon,
  LogInIcon,
  LogOutIcon,
  ShoppingBagIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function NavIcons() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simule la connexion
  const [wishlistCount, setWishlistCount] = useState(3); // Simule le nombre de produits dans la wishlist
  const [cartCount, setCartCount] = useState(2); // Simule le nombre de produits dans le panier

  const handleLoginLogout = () => {
    setIsAuthenticated(!isAuthenticated); // Simule la connexion/déconnexion
  };

  return (
    <div className="flex items-center space-x-8 mr-6 text-gray-500 ">
      {/* Connexion / Déconnexion */}
      {isAuthenticated ? (
        <>
          {/* Avatar (si connecté) */}
          <Link href="/dashboard">
            <Image
              src="/images/avatar.png"
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            />
          </Link>
          {/* Bouton Déconnexion */}
          <LogOutIcon
            className="w-6 h-6 cursor-pointer"
            onClick={handleLoginLogout}
          />
        </>
      ) : (
        /* Bouton Connexion */
        <LogInIcon
          className="w-6 h-6 cursor-pointer"
          onClick={handleLoginLogout}
        />
      )}

      {/* Icône Wishlist avec badge */}
      <div className="relative">
        <HeartIcon className="w-6 h-6 cursor-pointer" />
        {wishlistCount > 0 && (
          <span className="absolute bottom-4 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {wishlistCount}
          </span>
        )}
      </div>

      {/* Icône Panier avec badge */}
      <div className="relative">
        <ShoppingBagIcon className="w-6 h-6 cursor-pointer" />
        {cartCount > 0 && (
          <span className="absolute bottom-4 left-4  inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {cartCount}
          </span>
        )}
      </div>
    </div>
  );
}
