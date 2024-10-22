"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FilterByName = () => {
  const [inputValue, setInputValue] = React.useState<string>("");

  // Fonction pour mettre à jour la valeur de l'input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Nom du produit (3 lettres au minimum)"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        className="bg-gray-500 text-white rounded"
        disabled={inputValue.length < 3} // Désactivation du bouton si moins de 3 lettres
      >
        Chercher
      </Button>
    </div>
  );
};

export default FilterByName;
