import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import GiftcardToUse from "./GiftcardToUse";
import { calculateTotalAmountGiftCardToUse } from "../../utils/calculUtils";
import { GiftcardToUseType } from "@/app/(public)/types/GiftcardToUseTypes";
import { formatPrice } from "@/app/(public)/utils/pricesFormat";

interface RowGiftcardToUseProps {
  giftCardsToUse: GiftcardToUseType[];
  onGiftcardToUse: (
    code: string,
    action: "add" | "remove",
    balance?: number,
    id?: number
  ) => void;
}
const RowGiftcardToUse: React.FC<RowGiftcardToUseProps> = ({
  giftCardsToUse,
  onGiftcardToUse,
}) => {
  return (
    <TableRow>
      <GiftcardToUse
        giftCardsToUse={giftCardsToUse}
        onGiftcardToUse={onGiftcardToUse}
      />
      <TableCell className="text-right bg-white bg-dark whitespace-nowrap">
        {calculateTotalAmountGiftCardToUse(giftCardsToUse) > 0 ? (
          <span className="whitespace-nowrap text-green-500">
            - {formatPrice(calculateTotalAmountGiftCardToUse(giftCardsToUse))}
          </span>
        ) : (
          0
        )}
      </TableCell>
    </TableRow>
  );
};

export default RowGiftcardToUse;
