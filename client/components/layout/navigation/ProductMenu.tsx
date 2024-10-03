import { useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { collectionType } from "@/app/types/CollectionTypes";

export function ProductMenu() {
  const [collections, setCollections] = useState<collectionType[]>([]);

  useEffect(() => {
    // Simule un fetch des collections et catégories depuis la DB
    setCollections([
      {
        name: "Pour un jour d'exception",
        categories: [
          "Bracelet",
          "Colliers de dos",
          "Colliers",
          "Boucles d'oreilles",
        ],
      },
      {
        name: "Pour le quotidien",
        categories: [
          "Bracelet",
          "Colliers",
          "Boucles d'oreilles",
          "Broches",
          "Accessoires",
        ],
      },
      {
        name: "Demoiselles d'honneur",
        categories: ["Chaussures"],
      },
      {
        name: "Accessoires",
        categories: ["Chaussures", "Broches", "Peignes"],
      },
    ]);
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="tracking-widest text-sm uppercase flex items-center m-0 ">
            Produits
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]">
              {collections.map((collection) => (
                <li key={collection.name} className="mb-4">
                  <span className="font-bold tracking-widest">
                    {collection.name}
                  </span>
                  <ul className="pl-4">
                    {collection.categories.map((category) => (
                      <li
                        key={category}
                        className="hover:underline tracking-wide"
                      >
                        <Link href={`/products/${category.toLowerCase()}`}>
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
