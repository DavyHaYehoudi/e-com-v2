import { ShoppingBagIcon, BadgeEuro } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginModal from "@/components/modules/login/LoginModal";
import { Button } from "@/components/ui/button";
import WishlistModal from "@/components/modules/wishlist/WishlistModal";
import { formatPrice } from "@/app/utils/pricesFormat";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import useAuth from "@/app/hooks/useAuth";

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
  const { handleAuthentication, handleLogout } = useAuth();

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
            onClick={handleLogout}
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
        {wishlist.items.length > 0 && (
          <span className="absolute bottom-6 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {wishlist.items.length}
          </span>
        )}
      </div>

      {/* Icône Panier avec badge */}
      <div className="relative">
        <a href="/panier">
          <span title="Panier">
            <ShoppingBagIcon className="w-6 h-6 mb-2 cursor-pointer" />
          </span>

          {cartCountArticles > 0 && (
            <span className="absolute bottom-6 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {cartCountArticles}
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
