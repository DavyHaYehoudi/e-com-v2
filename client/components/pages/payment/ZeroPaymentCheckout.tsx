import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCreatePendingOrder from "./hooks/useCreatePendingOrder";
import { useRouter } from "next/navigation";
import { BadgeEuro, PercentIcon, GiftIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useState } from "react";
import { Loader } from "lucide-react";
import { formatPrice } from "@/app/(public)/utils/pricesFormat";
type CardProps = React.ComponentProps<typeof Card>;

const ZeroPaymentCheckout = ({ className, ...props }: CardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const amountCodePromo = useSelector(
    (state: RootState) => state.priceAdjustments.amountDiscountPromoCode
  );
  const amountGiftcardsToUse = useSelector(
    (state: RootState) => state.priceAdjustments.amountTotalGiftcardsToUse
  );
  const amountCashbackToUse =
    useSelector((state: RootState) => state.priceAdjustments.cashBackToSpend) ||
    0;
  const adjustments = [
    {
      title: "Code promo",
      description: `${
        amountCodePromo > 0 ? formatPrice(amountCodePromo) : "Sans"
      }`,
      icon: <PercentIcon className="size-4" />,
    },
    {
      title: "Cartes cadeaux",
      description: `${
        amountGiftcardsToUse
          ? `jusqu'à ` + formatPrice(amountGiftcardsToUse)
          : "Sans"
      }`,
      icon: <GiftIcon className="size-4" />,
    },
    {
      title: "Cashback",
      description: `${
        amountCashbackToUse ? formatPrice(amountCashbackToUse) : "Sans"
      }`,
      icon: <BadgeEuro className="size-4" />,
    },
  ];
  const { getConfirmationNumber } = useCreatePendingOrder();
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      const confirmationNumber = await getConfirmationNumber();
      router.push(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment/success?confirmationNumber=${confirmationNumber}`
      );
    } catch (error) {
      console.log("erreur dans ZeroPaymentCheckout :", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center">
      <Card className={cn("w-[380px] bg-dark", className)} {...props}>
        <CardHeader>
          <CardTitle className="tracking-wider text-center">
            Confirmation
          </CardTitle>
          <CardDescription>
            En utilisant les moyens ci-dessous, la commande est passée à{" "}
            {formatPrice(0)}{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {adjustments.map((adjustment, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="hidden sm:flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium  flex items-center gap-5">
                    <span>{adjustment.icon} </span>
                    <span>{adjustment.title}</span>
                    <span className="whitespace-nowrap">
                      {adjustment.description}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-green-500 hover:bg-green-600 dark:text-[var(--whiteSmoke)] font-bold"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin text-gray-500" size={24} />
            ) : (
              "Confirmer"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default ZeroPaymentCheckout;
