import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircleIcon, XCircleIcon, PercentIcon } from "lucide-react";
import { promoCodeSchema } from "./promoCodeSchema";

const CartCodePromo = ({
  onDiscount,
  codePromoPercentage,
}: {
  onDiscount: (discount_percentage: number) => void;
  codePromoPercentage: number;
}) => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [validPromo, setValidPromo] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ code: string }>({
    resolver: zodResolver(promoCodeSchema),
    mode: "onChange",
  });

  // Définir manuellement si le code promo est valide ou non
  const isValidPromoCode = (code: string) => {
    return code === "Bonjour-15"; // Modifier pour tester avec le bon code
  };

  // Gestion de la soumission du formulaire
  const onSubmit = (data: { code: string }) => {
    if (isValidPromoCode(data.code)) {
      onDiscount(15); // Remonter 15% de réduction au parent si le code est valide
      setApiError(null); // Pas d'erreur
      setValidPromo(true); // Code promo valide
    } else {
      setApiError("Code promo incorrect.");
      setValidPromo(false); // Code promo incorrect
      onDiscount(0); // Pas de réduction
    }
  };

  return (
    <TableCell className="flex w-full max-w-sm items-center space-x-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full space-x-2 items-center"
      >
        <Input
          type="text"
          placeholder="Code de réduction"
          {...register("code")}
          className={errors.code ? "border-red-500" : ""}
        />
        <Button type="submit" disabled={!isValid}>
          <PercentIcon className="size-4" />{" "}
          <span className="ml-1">Valider</span>
        </Button>
        {/* Icône de validation */}
        {validPromo === true && (
          <>
            <CheckCircleIcon className="text-green-500" />
            <span className="text-green-500">{codePromoPercentage}%</span>
          </>
        )}
        {validPromo === false && <XCircleIcon className="text-red-500" />}
      </form>
      {/* Message d'erreur si code incorrect */}
      {apiError && <p className="text-red-500">{apiError}</p>}
    </TableCell>
  );
};

export default CartCodePromo;
