"use client";
import ShippingForm from "@/components/pages/payment/ProgressForm/ShippingForm";
import Auth from "@/components/pages/payment/ProgressForm/Auth";
import BillingForm from "@/components/pages/payment/ProgressForm/BillingForm";
import ProgressBarCheckout from "@/components/pages/payment/ProgressForm/ProgressBarCheckout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import CheckoutSection from "@/components/pages/payment/CheckoutSection";

// Les étapes
enum Step {
  AUTH = 1,
  SHIPPING = 2,
  BILLING = 3,
  PAYMENT = 4,
}

const CheckoutPage = () => {
  const [step, setStep] = useState(Step.AUTH);
  const [sameAddress, setSameAddress] = useState(true); // Pour gérer si les adresses sont identiques
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  useEffect(() => {
    if (isAuthenticated) {
      setStep(Step.SHIPPING); // Si l'utilisateur est authentifié, on passe à l'étape de livraison après authentification ou directement si déjà authentifié
    }
  }, [isAuthenticated]);
  return (
    <div className="max-w-4xl mx-auto p-8">
      <ProgressBarCheckout step={step} />

      {step === Step.AUTH && !isAuthenticated && <Auth />}

      {isAuthenticated && step === Step.SHIPPING && (
        <ShippingForm
          onNext={() => setStep(sameAddress ? Step.PAYMENT : Step.BILLING)}
          onSameAddressChange={(checked: boolean) => setSameAddress(checked)}
          sameAddress={sameAddress}
        />
      )}

      {step === Step.BILLING && (
        <BillingForm onNext={() => setStep(Step.PAYMENT)} />
      )}

      {step === Step.PAYMENT && <CheckoutSection />}
    </div>
  );
};
export default CheckoutPage;
