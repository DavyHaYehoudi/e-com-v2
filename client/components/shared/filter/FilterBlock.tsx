"use client";

import { categories } from "@/app/mocks/categories";
import { collections } from "@/app/mocks/collections";
import { CategoryTypes } from "@/app/types/CategoryTypes";
import { CollectionTypes } from "@/app/types/CollectionTypes";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Assurez-vous que ce composant est importé
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Assurez-vous que ce composant est importé
import React, { useState } from "react";
import { Filter } from "lucide-react";

// Mocked collections and categories
const collectionsMock: CollectionTypes[] = collections;
const categoriesMock: CategoryTypes[] = categories;

const FilterBlock = () => {
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });
  const [isOnSale, setIsOnSale] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCollectionChange = (id: number) => {
    setSelectedCollections((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    setPriceRange({ ...priceRange, [type]: Number(e.target.value) });
  };

  const handleSubmit = () => {
    // Format the filters and send them to the API
    const filters = {
      collections: selectedCollections,
      categories: selectedCategories,
      priceRange,
      isOnSale,
      isNew,
      isBestSeller,
    };
    console.log(filters);
    // Send `filters` to your API
    setIsOpen(false); // Ferme le popover après l'application des filtres
  };

  const resetFilters = () => {
    setSelectedCollections([]);
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 100 });
    setIsOnSale(false);
    setIsNew(false);
    setIsBestSeller(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="bg-gray-500 text-white rounded flex items-center gap-1">
          <Filter /> Filtres
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Filtres</h2>

        <div className="mb-4">
          <h3>Collections</h3>
          {collectionsMock.map((collection) => (
            <div key={collection.id}>
              <Label className="flex items-center m-1">
                <Checkbox
                  checked={selectedCollections.includes(collection.id)}
                  onCheckedChange={() => handleCollectionChange(collection.id)}
                  className="mr-2 data-[state=checked]:bg-gray-500"
                />
                {collection.label}
              </Label>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h3>Catégories</h3>
          {categoriesMock.map((category) => (
            <div key={category.id}>
              <Label className="flex items-center m-1">
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                  className="mr-2 data-[state=checked]:bg-gray-500"
                />
                {category.label}
              </Label>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h3>Prix</h3>
          <div className="flex items-center">
            <div className="relative w-full flex">
              <Label htmlFor="min-price" className="mr-2">
                Prix min (€)
              </Label>
              <Input
                id="min-price"
                type="number"
                value={priceRange.min}
                onChange={(e) => handlePriceChange(e, "min")}
                placeholder="Prix min (€)"
                className="border rounded-l px-2 py-1 w-1/2"
              />
              <span className="mx-1">-</span>
              <Label htmlFor="max-price" className="mr-2">
                Prix max (€)
              </Label>
              <Input
                id="max-price"
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceChange(e, "max")}
                placeholder="Prix max (€)"
                className="border rounded-r px-2 py-1 w-1/2"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p>
            <Label className="flex items-center m-1">
              <Checkbox
                checked={isOnSale}
                onCheckedChange={() => setIsOnSale(!isOnSale)}
                className="mr-2 data-[state=checked]:bg-gray-500"
              />
              En promotion
            </Label>
          </p>
          <p>
            <Label className="flex items-center m-1">
              <Checkbox
                checked={isNew}
                onCheckedChange={() => setIsNew(!isNew)}
                className="mr-2 data-[state=checked]:bg-gray-500"
              />
              Nouveau
            </Label>
          </p>
          <p>
            <Label className="flex items-center m-1">
              <Checkbox
                checked={isBestSeller}
                onCheckedChange={() => setIsBestSeller(!isBestSeller)}
                className="mr-2 data-[state=checked]:bg-gray-500"
              />
              Meilleures ventes
            </Label>
          </p>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={resetFilters}
            className="bg-gray-500 text-white rounded"
          >
            Réinitialiser
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white rounded ml-2"
          >
            Appliquer les filtres
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterBlock;
