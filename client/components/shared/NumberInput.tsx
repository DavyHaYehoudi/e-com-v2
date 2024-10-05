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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = 1; // Valeur par défaut
    val = Math.max(1, Math.min(val, maxQuantity)); // Garde la valeur dans la plage 1-maxQuantity
    setValue(val);
  };

  return (
    <div className="flex flex-col items-center space-y-1">
      <span className="text-sm text-gray-500">Limité à : {maxQuantity}</span>
      <div className="flex items-center">
        <Input
          type="number"
          value={value}
          min={1}
          max={maxQuantity}
          onChange={handleChange}
          className="text-center w-16"
        />
      </div>
    </div>
  );
};

export default NumberInput;
