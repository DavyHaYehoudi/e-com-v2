import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { CheckCircleIcon, BadgeEuro } from "lucide-react";
import { cashbackToUseSchema } from "./cashbackToUseSchema";
import { formatPrice } from "@/app/utils/pricesFormat";
import { Label } from "@/components/ui/label";

type FormValues = {
  cashbackAmount: number;
};

const CashbackToUse = ({
  onCashbackSelect,
}: {
  onCashbackSelect: (amount: number) => void;
}) => {
  const maxCashback = 30;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(cashbackToUseSchema(maxCashback)),
    defaultValues: {
      cashbackAmount: 0,
    },
  });

  const cashbackAmount = watch("cashbackAmount");
  const isButtonDisabled = cashbackAmount <= 0;

  const handleCashbackChange = (value: string) => {
    const numericValue = Number(value);
    // Réinitialiser isSubmitted si la valeur change
    setIsSubmitted(false);
    if (numericValue > maxCashback) {
      setValue("cashbackAmount", maxCashback);
    } else {
      setValue("cashbackAmount", numericValue);
    }
  };

  const isValidAmount = cashbackAmount > 0 && cashbackAmount <= maxCashback;

  const handleSubmit = () => {
    if (isValidAmount) {
      onCashbackSelect(cashbackAmount); // Appel de la fonction de rappel
      setIsSubmitted(true); // Met à jour isSubmitted lorsque le montant est valide
    }
  };

  return (
    <TableCell colSpan={5}>
      <Controller
        name="cashbackAmount"
        control={control}
        render={({ field }) => (
          <>
            <Label>Montant du cashback</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Montant du cashback"
                {...field}
                value={field.value || ""}
                onChange={(e) => handleCashbackChange(e.target.value)}
                className="w-full"
              />
              {errors.cashbackAmount && (
                <span className="text-red-500">
                  {errors.cashbackAmount.message}
                </span>
              )}

              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isButtonDisabled}
              >
                <BadgeEuro className="size-4" />
                <span className="ml-1">Utiliser</span>
              </Button>

              {/* Affichage du montant et cercle de validation seulement après soumission */}
              {isSubmitted && isValidAmount && (
                <>
                  <CheckCircleIcon className="text-green-500" />
                  <span className="text-green-500 whitespace-nowrap">
                    {formatPrice(cashbackAmount)}
                  </span>
                </>
              )}
            </div>
          </>
        )}
      />
    </TableCell>
  );
};

export default CashbackToUse;
