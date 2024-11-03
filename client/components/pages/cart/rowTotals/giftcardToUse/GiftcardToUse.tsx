import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, XCircle } from "lucide-react";
import { giftCardToUseSchema } from "./giftcardToUseSchema";
import { GiftIcon } from "lucide-react";
import { GiftcardToUseType } from "@/app/types/GiftcardToUseTypes";
import { Label } from "@/components/ui/label";
import TrashIcon from "@/components/shared/TrashIcon";

const GiftcardToUse = ({
  giftCardsToUse,
  setGiftCardsToUse,
}: {
  giftCardsToUse: GiftcardToUseType[];
  setGiftCardsToUse: React.Dispatch<React.SetStateAction<GiftcardToUseType[]>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<{ code: string }>({
    resolver: zodResolver(giftCardToUseSchema),
    mode: "onChange",
  });

  const giftCardData: Record<string, { balance?: number; error?: string }> = {
    VALID123: { balance: 50 },
    VALID456: { balance: 100 },
  };

  const isValidGiftCard = (code: string) => {
    return giftCardData[code] || { error: "Carte cadeau non valide" };
  };

  const onSubmit = (data: { code: string }) => {
    const cardValidation = isValidGiftCard(data.code);
    if (cardValidation.balance) {
      setGiftCardsToUse((prev) => [
        ...prev,
        { code: data.code, balance: cardValidation.balance },
      ]);
    } else {
      setGiftCardsToUse((prev) => [
        ...prev,
        { code: data.code, error: cardValidation.error },
      ]);
    }

    reset();
  };

  const removeGiftCard = (code: string) => {
    setGiftCardsToUse((prev) => prev.filter((card) => card.code !== code));
  };

  return (
    <TableCell colSpan={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Code carte cadeau</Label>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Code carte cadeau"
            {...register("code")}
            className={errors.code ? "border-red-500" : ""}
          />
          <Button type="submit" disabled={!isValid}>
            <GiftIcon className="size-4" />{" "}
            <span className="ml-1">Ajouter</span>
          </Button>
        </div>
      </form>

      {errors.code && <p className="text-red-500">{errors.code.message}</p>}

      <div className="mt-4 space-y-2">
        {giftCardsToUse.map((card, index) => (
          <div key={index} className="flex items-center space-x-2">
            <p className="text-sm">{card.code}</p>
            {card.balance ? (
              <>
                <CheckCircle className="text-green-500 w-5 h-5" />
                <p className="text-green-500">Solde: {card.balance}€</p>
              </>
            ) : (
              <>
                <XCircle className="text-red-500 w-5 h-5" />
                <p className="text-red-500">{card.error}</p>
              </>
            )}
            <TrashIcon onClick={() => removeGiftCard(card.code)} />
          </div>
        ))}
      </div>
    </TableCell>
  );
};

export default GiftcardToUse;
