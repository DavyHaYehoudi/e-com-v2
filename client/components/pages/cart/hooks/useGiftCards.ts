import { useEffect, useState } from "react";
import { GiftcardToUseType } from "@/app/types/GiftcardToUseTypes";
import { useDispatch } from "react-redux";
import { setAmountTotalGiftcardsToUse } from "@/redux/slice/priceAdjustmentsSlice";

export const useGiftCards = () => {
  const [giftCardsToUse, setGiftCardsToUse] = useState<GiftcardToUseType[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const amount = giftCardsToUse.reduce(
      (acc, giftCard) => acc + (giftCard.balance || 0),
      0
    );
    dispatch(setAmountTotalGiftcardsToUse(amount));
  }, [giftCardsToUse]);

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
