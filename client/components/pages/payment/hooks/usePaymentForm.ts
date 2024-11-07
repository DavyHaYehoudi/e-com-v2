import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/redux/slice/priceAdjustmentsSlice";
import { RootState } from "@/redux/store/store";
import { useFetch } from "@/service/hooks/useFetch";
import { OrderResponse } from "@/app/types/OrderCreate";
import { setCreatePendingOrder } from "@/redux/slice/paymentSlice";

const usePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<OrderResponse | null>(null);

  const dispatch = useDispatch();

  const giftCardIds = useSelector(
    (state: RootState) => state.priceAdjustments.giftCards
  );
  const codePromo = useSelector(
    (state: RootState) => state.priceAdjustments.promoCode
  );
  const shippingMethodId = useSelector(
    (state: RootState) => state.priceAdjustments.shippingMethod
  );
  const cashBackToSpend = useSelector(
    (state: RootState) => state.priceAdjustments.cashBackToSpend
  );
  const order_address_shipping = useSelector(
    (state: RootState) => state.addresses.shipping
  );
  const order_address_billing = useSelector(
    (state: RootState) => state.addresses.billing
  );

  const formatData = {
    giftCardIds,
    shippingMethodId,
    cashBackToSpend,
    codePromo,
    order_address_billing,
    order_address_shipping,
  };

  const { data: pendingOrderCreated, triggerFetch } = useFetch<OrderResponse>(
    "/payment/confirm",
    {
      method: "POST",
      requiredCredentials: true,
    }
  );
  useEffect(() => {
    triggerFetch(formatData);
  }, []);
  useEffect(() => {
    if (pendingOrderCreated) {
      dispatch(setCreatePendingOrder(pendingOrderCreated));
      setPendingOrder(pendingOrderCreated);
    }
  }, [pendingOrderCreated, dispatch]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent && paymentIntent.status) {
        case "succeeded":
          setMessage("Payment réussi !");
          break;
        case "processing":
          setMessage("Votre payment est en cours.");
          break;
        case "requires_payment_method":
          setMessage("Votre payment n'a pas réussi, essayez de nouveau.");
          break;
        default:
          setMessage("Il y a un empêchement au payment.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(reset());
    if (pendingOrder) {
      dispatch(setCreatePendingOrder(pendingOrder));
    }

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment/success?confirmation_number=${pendingOrder?.order.confirmation_number}`,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs" as const,
  };

  return {
    handleSubmit,
    paymentElementOptions,
    isLoading,
    stripe,
    elements,
    message,
  };
};

export default usePaymentForm;
