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
import { useOrderAmount } from "../cart/hooks/useOrderAmount";
import { formatPrice } from "@/app/utils/pricesFormat";
import useCreatePendingOrder from "./hooks/useCreatePendingOrder";
import { useRouter } from "next/navigation";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

const ZeroPaymentCheckout = ({ className, ...props }: CardProps) => {
  const orderAmount = useOrderAmount();
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
          <CardTitle>Recapitulatif</CardTitle>
          <CardDescription>
            En utilisant les moyens ci-dessous, la commande passe à{" "}
            {formatPrice(orderAmount)}{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
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
