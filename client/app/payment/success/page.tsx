"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, ArrowRightCircle, Home } from "lucide-react";
import { useFetch } from "@/service/hooks/useFetch";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store/store";
import { useSearchParams } from "next/navigation";

const PaymentSuccess = () => {
  const [isOpen, setIsOpen] = useState(true);
//   const orderPendingCreated = useSelector(
//     (state: RootState) => state.payment.createPendingOrder
//   );
  const searchParams = useSearchParams();
  const confirmationNumber = searchParams.get("confirmation_number");
  const { triggerFetch } = useFetch("/payment/accepted", {
    method: "PUT",
    requiredCredentials: true,
  });
  useEffect(() => {
    if (confirmationNumber) {
      triggerFetch({ bodyData: confirmationNumber });
    }
  }, [triggerFetch, confirmationNumber]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="">
        <DialogHeader className="flex flex-col items-center">
          <CheckCircle className="text-green-500" size={48} />
          <DialogTitle className="text-green-600 text-xl font-bold mt-2">
            Paiement Réussi
          </DialogTitle>
          <DialogDescription className="text-center mt-2">
            Merci pour votre achat ! Votre commande a été traitée avec succès.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center">
          {confirmationNumber && (
            <p className="text-lg">
              Votre numéro de commande :{" "}
              <strong>{confirmationNumber}</strong>
            </p>
          )}
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              // Rediriger vers les détails de la commande
              window.location.href = "/account/orders";
            }}
          >
            <ArrowRightCircle className="text-blue-600" />
            Voir la commande
          </Button>
          <Button
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white"
            onClick={() => {
              // Rediriger vers la page d'accueil
              window.location.href = "/";
            }}
          >
            <Home className="text-white" />
            Retourner à l&apos;accueil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccess;
