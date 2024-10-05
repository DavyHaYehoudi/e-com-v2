import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const NumberInput = ({
  maxQuantity,
  onValueChange,
}: {
  maxQuantity: number;
  onValueChange: (value: number) => void;
}) => {
  const [value, setValue] = useState(1);

  // Mise à jour du parent quand la valeur change
  useEffect(() => {
    onValueChange(value);
  }, [value]);

  const increment = () => {
    setValue((prev) => (prev < maxQuantity ? prev + 1 : prev)); 
  };

  const decrement = () => {
    setValue((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="flex flex-col items-center space-y-1">
      <span className="text-sm text-gray-500">Limité à : {maxQuantity}</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={decrement}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>
        <Input
          type="number"
          value={value}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val >= 1 && val <= maxQuantity) {
              setValue(val);
            }
          }}
          className="text-center w-16"
        />
        <button
          onClick={increment}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
