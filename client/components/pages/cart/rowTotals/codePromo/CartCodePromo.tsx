import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircleIcon, XCircleIcon, PercentIcon } from "lucide-react";
import { promoCodeSchema } from "./promoCodeSchema";
import { Label } from "@/components/ui/label";
import { CodePromoVerifyTypes } from "@/app/(public)/types/CodePromoVerifyTypes";
import { useFetch } from "@/service/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  applyPromoCode,
  setAmountDiscountPromoCode,
} from "@/redux/slice/priceAdjustmentsSlice";
import { calculateCodePromoDiscountOnCartTotal } from "../../utils/calculUtils";
import { RootState } from "@/redux/store/store";

const CartCodePromo = ({
  onDiscount,
  codePromoPercentage,
}: {
  onDiscount: (discount_percentage: number) => void;
  codePromoPercentage: number;
}) => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [validPromo, setValidPromo] = useState<boolean | null>(null);
  const productsInCart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ code: string }>({
    resolver: zodResolver(promoCodeSchema),
    mode: "onChange",
  });
  const { triggerFetch } = useFetch<CodePromoVerifyTypes>(
    "/code-promos/verify-code",
    {
      method: "POST",
    }
  );
  // Gestion de la soumission du formulaire
  const onSubmit = async (data: { code: string }) => {
    const codePromo = await triggerFetch({ code: data.code });
    if (codePromo) {
      onDiscount(codePromo?.discount_percentage);
      dispatch(applyPromoCode(data.code));
      dispatch(
        setAmountDiscountPromoCode(
          calculateCodePromoDiscountOnCartTotal(
            productsInCart.items,
            productsInCart.giftCards,
            codePromo?.discount_percentage
          )
        )
      );
      setApiError(null);
      setValidPromo(true); // Code valide  // On appelle la fonction onDiscount avec la valeur du code de réduction
    } else {
      onDiscount(0); // Pas de réduction
      setApiError("Code de réduction invalide");
      setValidPromo(false); // Code non valide
    }
  };

  return (
    <TableCell colSpan={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Code de réduction</Label>
        <div className="flex items-center gap-2 mt-1">
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
        </div>
      </form>
      {/* Message d'erreur si code incorrect */}
      {apiError && <p className="text-red-500">{apiError}</p>}
    </TableCell>
  );
};

export default CartCodePromo;
