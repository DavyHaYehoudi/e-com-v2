import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import Link from "next/link";
import { collectionType } from "@/app/types/CollectionTypes";
import { ChevronDownIcon } from "lucide-react";

export function ProductMenu() {
  const [collections, setCollections] = useState<collectionType[]>([]);

  useEffect(() => {
    // Ici, on simule un fetch des collections et catégories depuis la DB
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
    ]);
  }, []);

  return (
    <Popover>
      <PopoverTrigger className="tracking-widest flex items-center">
        <span>Produits </span><ChevronDownIcon className="w-4 h-4" />
      </PopoverTrigger>

      <PopoverContent className=" text-gray-500 p-4">
        {collections.map((collection) => (
          <div
            key={collection.name}
            className="mb-4 tracking-widest"
          >
            <h3 className="font-bold">{collection.name}</h3>
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
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
