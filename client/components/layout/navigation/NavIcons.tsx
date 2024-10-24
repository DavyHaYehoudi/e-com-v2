import { ShoppingBagIcon, BadgeEuro } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginModal from "@/components/modules/login/LoginModal";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import WishlistModal from "@/components/modules/wishlist/WishlistModal";
import { formatPrice } from "@/app/utils/pricesFormat";
import { jwtDecode } from "jwt-decode";

// Interface pour le token décodé
interface DecodedToken {
  id: number;
  email: string;
  role: string;
  exp: number;
}

const NavIcons = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(3);
  const [cartCount, setCartCount] = useState(2);
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  // Vérifier le token au chargement de la page
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        // Décoder le token
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Vérifier si le token n'a pas expiré
        if (decoded.exp > currentTime) {
          setIsAuthenticated(true);
          setCustomerEmail(decoded.email); // Stocker l'email
        } else {
          // Si le token est expiré, le supprimer
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  // Déconnexion
  const handleLoginLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setCustomerEmail(null);
  };

  const handleAuthentication = (token: string) => {
    localStorage.setItem("authToken", token);
    const decoded: DecodedToken = jwtDecode(token);
    setIsAuthenticated(true);
    setCustomerEmail(decoded.email);
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
              <AvatarFallback>
                {customerEmail ? customerEmail[0].toUpperCase() : "A"}
              </AvatarFallback>
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
            <span className="absolute bottom-6 left-4 inline-flex items-center justify-center px-2 py-1 text-s font-bold leading-none bg-purple-200 text-black rounded-full whitespace-nowrap">
              {formatPrice(cashbackCustomer)}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default NavIcons;
