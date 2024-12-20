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
import { CheckCircle, ArrowRightCircle, Home, Loader } from "lucide-react";
import { useFetch } from "@/service/hooks/useFetch";
import { useDispatch } from "react-redux";
import { reset } from "@/redux/slice/priceAdjustmentsSlice";
import { clearCart } from "@/redux/slice/cartSlice";
import { useSearchParams } from "next/navigation";
import useCashback from "../../hooks/useCashback";

const PaymentSuccess = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [orderPendingCreated, setOrderPendingCreated] = useState(false);
  const dispatch = useDispatch();

  const { triggerFetch } = useFetch("/payment/status", {
    method: "PATCH",
    requiredCredentials: true,
  });

  const { triggerFetch: triggerClearCart } = useFetch("/customer/cart", {
    method: "PUT",
    requiredCredentials: true,
  });

  const { getCashbackOneCustomer } = useCashback();
  const searchParams = useSearchParams();
  const confirmationNumber = searchParams.get("confirmationNumber");
  const orderId = searchParams.get("orderId");
  useEffect(() => {
    if (confirmationNumber) {
      const bodyData = { confirmationNumber, status: "paid" };
      triggerFetch(bodyData)
        .then(() => {
          setOrderPendingCreated(true);
          dispatch(reset());
          dispatch(clearCart());
          getCashbackOneCustomer();
          triggerClearCart({ items: [], gift_cards: [] });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [confirmationNumber]);

  if (!orderPendingCreated) {
    return (
      <div className="flex justify-center my-20 text-center">
        <div>
          <p>Création de votre commande en cours...</p>
          <p className="flex justify-center my-5">
            <Loader className="animate-spin text-gray-500" size={96} />
          </p>
        </div>
      </div>
    );
  }

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
              Votre numéro de commande : <strong>{confirmationNumber}</strong>
            </p>
          )}
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              // Rediriger vers les détails de la commande
              window.location.href = `/customer/tableau-de-bord/commandes/liste`;
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
