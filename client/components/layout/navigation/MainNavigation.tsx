"use client";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Button } from "@/components/ui/button";
import { BadgeEuro, LogOut, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import useAuth from "@/app/hooks/useAuth";
import LoginModal from "@/components/modules/login/LoginModal";
import { formatPrice } from "@/app/utils/pricesFormat";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const customerEmail = useSelector(
    (state: RootState) => state.auth.user?.email
  );
  const { handleAuthentication, handleLogout } = useAuth();
  const cashbackCustomer = 10;
  return (
    <header className="bg-dark">
      <nav className="container mx-auto flex justify-between p-4">
        <div className="block lg:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center space-x-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>

        {/* Onglets de navigation - cachés en dessous de lg */}
        <div className="hidden lg:flex justify-center lg:w-full w-0 ">
          <Navbar />
        </div>
      </nav>
      <hr />

      {/* Menu déroulant pour petits écrans */}
      {isOpen && (
        <div className="lg:hidden p-4 flex flex-col gap-2">
          <Navbar />
          <hr className="border-t-1 border-[#282c34] dark:border-[var(--whiteSmoke)]" />

          {/* Icône Cashback avec badge */}
          {isAuthenticated && (
            <>
              <div className="flex items-center gap-2 text-sm py-2">
                <BadgeEuro className="w-6 h-6" />
                <span>
                  Cashback{" "}
                  {cashbackCustomer > 0 ? formatPrice(cashbackCustomer) : ""}
                </span>
              </div>
              <hr className="border-t-1 border-[#282c34] dark:border-[var(--whiteSmoke)]" />
            </>
          )}
          {/* Avatar du compte */}
          <Link href="/dashboard" className="flex items-center gap-2 py-2">
            <Avatar className="cursor-pointer mb-2">
              <AvatarImage src="/images/avatar.png" alt="Avatar" />
              <AvatarFallback>
                {customerEmail ? customerEmail[0].toUpperCase() : "A"}
              </AvatarFallback>
            </Avatar>
            <span>{customerEmail} </span>
          </Link>
          <hr className="border-t-1 border-[#282c34] dark:border-[var(--whiteSmoke)]" />
          {/* Bouton de connexion/déconnexion pour mobile */}
          <div className="mt-4">
            {isAuthenticated ? (
              <Button variant="ghost" onClick={handleLogout} className="p-0">
                <LogOut />
                <span className="ml-2"> Se déconnecter</span>
              </Button>
            ) : (
              <LoginModal authenticate={handleAuthentication} />
            )}
          </div>
        </div>
      )}
    </header>
  );
}
