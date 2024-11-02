import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { collections } from "@/app/mocks/collections";
import { formatLabelForURL } from "@/app/utils/FormatLabelForUrl";

export function ProductMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="tracking-widest text-sm uppercase flex items-center m-0 bg-dark">
            Produits
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[280px] gap-3 p-6 md:w-[500px] lg:w-[600px] dark bg-dark">
              {collections.map((collection) => (
                <li key={collection.label} className="mb-4">
                  <span className="font-bold tracking-widest">
                    {collection.label}
                  </span>
                  <ul className="pl-4">
                    {collection.categories.map((category) => (
                      <li
                        key={category.id}
                        className="hover:underline tracking-wide"
                      >
                        <Link
                          href={`/categorie/${formatLabelForURL(
                            category.label
                          )}/${category.id}/produits`}
                        >
                          {category.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="hover:underline font-bold tracking-widest uppercase text-center">
                <Link href={`/produits`}> tous les produits</Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
