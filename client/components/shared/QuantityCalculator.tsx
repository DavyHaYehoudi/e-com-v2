import NumberInput from "./NumberInput";
import { sumPriceArticle } from "@/app/utils/pricesFormat";

const QuantityCalculator = ({
  price,
  maxQuantity,
  onValueChange,
  quantity,
}: {
  price: number;
  maxQuantity: number | null;
  onValueChange: (value: number) => void;
  quantity: number;
}) => {
  return (
    <div className="flex flex-col items-end gap-5 space-y-2">
      <NumberInput maxQuantity={maxQuantity} onValueChange={onValueChange} />
      {sumPriceArticle(quantity, price)}
    </div>
  );
};

export default QuantityCalculator;
