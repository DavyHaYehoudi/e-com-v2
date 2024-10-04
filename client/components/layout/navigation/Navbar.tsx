import { usePathname } from "next/navigation"; // Importe usePathname
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  BookOpenIcon,
  GlobeIcon,
  MailIcon,
  TagIcon,
} from "lucide-react";
import { ProductMenu } from "./ProductMenu";

export function Navbar() {
  const pathname = usePathname(); // Récupère le chemin actif

  return (
    <nav className="text-gray-500 p-4">
      <NavigationMenu className="flex justify-center space-x-8">
        {/* Onglet Produits avec sous-menu */}
        <NavigationMenuItem>
          <div className="flex items-center space-x-2">
            <TagIcon className="tab-nav w-5 h-5" />
            <ProductMenu />
          </div>
        </NavigationMenuItem>

        {/* Onglet Créatrice */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/creatrice"
            className={`flex items-center space-x-2 relative ${
              pathname === "/creatrice" ? "active" : ""
            }`}
          >
            <BookOpenIcon className="tab-nav w-5 h-5" />
            <span className="tab-nav tracking-widest text-sm">Creatrice</span>
            <span className="absolute bottom-0 left-1/2 h-1 w-0 bg-golden transition-all duration-300 transform -translate-x-1/2 hover:w-full"></span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Onglet Tradition */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/tradition"
            className={`flex items-center space-x-2 relative ${
              pathname === "/tradition" ? "active" : ""
            }`}
          >
            <GlobeIcon className="tab-nav w-5 h-5" />
            <span className="tab-nav tracking-widest text-sm">Tradition</span>
            <span className="absolute bottom-0 left-1/2 h-1 w-0 bg-golden transition-all duration-300 transform -translate-x-1/2 hover:w-full"></span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Onglet Contact */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/contact"
            className={`flex items-center space-x-2 relative ${
              pathname === "/contact" ? "active" : ""
            }`}
          >
            <MailIcon className="tab-nav w-5 h-5" />
            <span className="tab-nav tracking-widest text-sm">Contact</span>
            <span className="absolute bottom-0 left-1/2 h-1 w-0 bg-golden transition-all duration-300 transform -translate-x-1/2 hover:w-full"></span>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
    </nav>
  );
}
