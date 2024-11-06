import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

const usePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      switch (paymentIntent&&paymentIntent.status) {
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
    // const { orderNumber } = await handleCreateOrder();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_BASE_URL_CLIENT}/cart/payment/success?orderNumber=${orderNumber}`,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message||"");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
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
