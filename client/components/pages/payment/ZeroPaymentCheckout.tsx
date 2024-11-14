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
import { formatPrice } from "@/app/utils/pricesFormat";
import useCreatePendingOrder from "./hooks/useCreatePendingOrder";
import { useRouter } from "next/navigation";
import { BadgeEuro, PercentIcon, GiftIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

type CardProps = React.ComponentProps<typeof Card>;

const ZeroPaymentCheckout = ({ className, ...props }: CardProps) => {
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
      description: `- ${formatPrice(amountCodePromo)}`,
      icon: <PercentIcon className="size-4" />,
    },
    {
      title: "Cartes cadeaux",
      description: `- ${formatPrice(amountGiftcardsToUse)}`,
      icon: <GiftIcon className="size-4" />,
    },
    {
      title: "Cashback",
      description: `- ${formatPrice(amountCashbackToUse)}`,
      icon: <BadgeEuro className="size-4" />,
    },
  ];
  const { getConfirmationNumber } = useCreatePendingOrder();
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      const confirmationNumber = await getConfirmationNumber();
      router.push(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment/success?confirmationNumber=${confirmationNumber}`
      );
    } catch (error) {
      console.log("erreur dans ZeroPaymentCheckout :", error);
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
          >
            Confirmer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default ZeroPaymentCheckout;
