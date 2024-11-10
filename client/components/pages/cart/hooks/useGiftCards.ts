import { useState } from "react";
import { GiftcardToUseType } from "@/app/types/GiftcardToUseTypes";

export const useGiftCards = () => {
  const [giftCardsToUse, setGiftCardsToUse] = useState<GiftcardToUseType[]>([]);

  const handleGiftcardToUse = (
    code: string,
    action: "add" | "remove",
    balance?: number,
    id?: number
  ) => {
    if (action === "add") {
      setGiftCardsToUse((prev) => {
        if (prev.some((giftCard) => giftCard.code === code)) {
          return prev;
        }
        return [...prev, { code, balance, id }];
      });
    } else if (action === "remove") {
      setGiftCardsToUse((prev) =>
        prev.filter((giftCard) => giftCard.code !== code)
      );
    }
  };

  return { giftCardsToUse, handleGiftcardToUse };
};
