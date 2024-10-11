"use client"
import ShippingForm from '@/components/pages/payment/ShippingForm';
import Auth from '@/components/pages/payment/Auth';
import BillingForm from '@/components/pages/payment/BillingForm';
import ProgressBarCheckout from '@/components/pages/payment/ProgressBarCheckout';
import PaymentMock from '@/components/pages/payment/StripeMock';
import React, { useState } from 'react';

// Les étapes
enum Step {
  AUTH = 1,
  SHIPPING = 2,
  BILLING = 3,
  PAYMENT = 4,
}

const CheckoutPage= () => {
  const [step, setStep] = useState(Step.AUTH);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sameAddress, setSameAddress] = useState(true); // Pour gérer si les adresses sont identiques

  return (
    <div className="max-w-4xl mx-auto p-8">
      <ProgressBarCheckout step={step} />

      {step === Step.AUTH && !isAuthenticated && (
        <Auth
          onSuccess={() => {
            setIsAuthenticated(true);
            setStep(Step.SHIPPING);
          }}
        />
      )}

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

      {step === Step.PAYMENT && <PaymentMock />}
    </div>
  );
};
export default CheckoutPage;