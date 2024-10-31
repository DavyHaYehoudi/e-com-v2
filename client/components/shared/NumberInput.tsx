"use client";
import { MasterProductsType } from "@/app/types/ProductTypes";
import { sumPriceArticle } from "@/app/utils/pricesFormat";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const NumberInput = ({
  onValueChange,
  quantity,
  product,
}: {
  onValueChange: (value: number) => void;
  quantity: number;
  product: MasterProductsType;
}) => {
  const {
    quantity_in_stock: quantityInStock,
    price: price,
    continue_selling: continueSelling,
  } = product;
  const [value, setValue] = useState<number>(quantity);

  // Synchronise `value` avec `quantity` en cas de changement externe
  useEffect(() => {
    setValue(quantity);
  }, [quantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = 1; // Valeur par défaut

    // Applique la limite de stock uniquement si `continueSelling` est `false`
    if (!continueSelling && quantityInStock !== null) {
      val = Math.max(1, Math.min(val, quantityInStock));
    }

    onValueChange(val);
  };

  return (
    <article>
      <div className="flex flex-col items-center space-y-1">
        {/* Affiche l’indication de limite uniquement si `continueSelling` est `false` et que `quantityInStock` est défini */}
        {!continueSelling && quantityInStock && (
          <span className="text-sm text-gray-500">
            Limité à : {quantityInStock}
          </span>
        )}

        <div className="flex items-center">
          <Input
            type="number"
            value={value}
            min={1}
            max={!continueSelling ? quantityInStock ?? undefined : undefined}
            onChange={handleChange}
            className="text-center w-16"
          />
        </div>

        <p>{sumPriceArticle(quantity, price)} </p>
      </div>
    </article>
  );
};

export default NumberInput;
