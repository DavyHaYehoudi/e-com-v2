import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import GiftcardToUse from "./GiftcardToUse";
import { calculateTotalAmountGiftCardToUse } from "../../utils/calculUtils";
import { formatPrice } from "@/app/utils/pricesFormat";
import { GiftcardToUseType } from "@/app/types/GiftcardToUseTypes";

interface RowGiftcardToUseProps {
  giftCardsToUse: GiftcardToUseType[];
  setGiftCardsToUse: React.Dispatch<React.SetStateAction<GiftcardToUseType[]>>;
}
const RowGiftcardToUse: React.FC<RowGiftcardToUseProps> = ({
  giftCardsToUse,
  setGiftCardsToUse,
}) => {
  return (
    <TableRow>
      <GiftcardToUse
        giftCardsToUse={giftCardsToUse}
        setGiftCardsToUse={setGiftCardsToUse}
      />
      <TableCell className="text-right bg-white dark bg-dark" colSpan={5}>
        {calculateTotalAmountGiftCardToUse(giftCardsToUse) > 0
          ? `- ${formatPrice(
              calculateTotalAmountGiftCardToUse(giftCardsToUse)
            )}`
          : 0}
      </TableCell>
    </TableRow>
  );
};

export default RowGiftcardToUse;
