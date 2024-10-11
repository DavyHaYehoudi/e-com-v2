// export default AuthForm;
import { useState } from "react";
import EmailForm from "./EmailForm";
import OTPForm from "./OTPForm";

const Auth = ({ onSuccess }: { onSuccess: () => void }) => {
  const [step, setStep] = useState(1); // Étape actuelle : 1 pour email, 2 pour OTP
  const [emailData, setEmailData] = useState(null);

  const handleEmailSubmit = (data: any) => {
    setEmailData(data); // On peut enregistrer l'email si nécessaire
    setStep(2); // Passe à l'étape OTP
  };

  const handleOTPSubmit = (data: any) => {
    if (data.otp === "123456") {
      onSuccess(); // OTP correct, succès
    } else {
      alert("Code incorrect");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {step === 1 && <EmailForm onSubmit={handleEmailSubmit} />}
      {step === 2 && <OTPForm onSubmit={handleOTPSubmit} />}
    </div>
  );
};

export default Auth;
