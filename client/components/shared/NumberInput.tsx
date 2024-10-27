"use client";
import { sumPriceArticle } from "@/app/utils/pricesFormat";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const NumberInput = ({
  maxQuantity,
  onValueChange,
  quantity,
  price,
}: {
  maxQuantity: number | null;
  onValueChange: (value: number) => void;
  quantity: number;
  price: number;
}) => {
  const [value, setValue] = useState<number>(quantity);

  // Synchronise `value` avec `quantity` en cas de changement externe
  useEffect(() => {
    setValue(quantity);
  }, [quantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = 1; // Valeur par défaut

    // Limite la valeur à la plage 1 - maxQuantity
    if (maxQuantity) {
      val = Math.max(1, Math.min(val, maxQuantity));
    }

    setValue(val);
    onValueChange(val);
  };

  return (
    <article>
      <div className="flex flex-col items-center space-y-1">
        {maxQuantity && maxQuantity > 0 && (
          <span className="text-sm text-gray-500">
            Limité à : {maxQuantity}
          </span>
        )}

        <div className="flex items-center">
          <Input
            type="number"
            value={value}
            min={1}
            max={maxQuantity ?? undefined}
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
