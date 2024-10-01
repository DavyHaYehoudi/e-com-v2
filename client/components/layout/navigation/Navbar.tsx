import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  EuroIcon,
  BookOpenIcon,
  GlobeIcon,
  MailIcon,
  TagIcon,
} from "lucide-react"; // Changement de l'icône pour Avantages
import { ProductMenu } from "./ProductMenu";

export function Navbar() {
  return (
    <nav className=" text-gray-500 p-4">
      <NavigationMenu className="flex justify-center space-x-8">
        {/* Onglet Produits avec sous-menu */}
        <NavigationMenuItem>
          <div className="flex items-center space-x-2">
            <TagIcon className="w-5 h-5" />
            <ProductMenu />
          </div>
        </NavigationMenuItem>

        {/* Onglet Avantages avec nouvelle icône */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/advantages"
            className="flex items-center space-x-2"
            style={{ letterSpacing: "0.3em" }}
          >
            <EuroIcon className="w-5 h-5" /> {/* Icône de l'euro */}
            <span>Avantages</span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Onglet Moi */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/me"
            className="flex items-center space-x-2"
            style={{ letterSpacing: "0.3em" }}
          >
            <BookOpenIcon className="w-5 h-5" />
            <span>Créatrice</span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Onglet Tradition */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/tradition"
            className="flex items-center space-x-2"
            style={{ letterSpacing: "0.3em" }}
          >
            <GlobeIcon className="w-5 h-5" />
            <span>Tradition</span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Onglet Contact */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/contact"
            className="flex items-center space-x-2"
            style={{ letterSpacing: "0.3em" }}
          >
            <MailIcon className="w-5 h-5" />
            <span>Contact</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
    </nav>
  );
}
