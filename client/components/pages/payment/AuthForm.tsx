"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AuthFormValues, AuthSchema } from "./schema/authSchema";

const AuthForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(AuthSchema),
  });

  // Capture la valeur de l'OTP en temps réel
  const otpValue = watch("otp", "");

  const onSubmit = (data: AuthFormValues) => {
    console.log('data:', data)
    if (data.otp === "123456") {
      // Simuler un OTP correct
      onSuccess();
    } else {
      setError("OTP incorrect");
    }
  };

  // Fonction pour capturer l'entrée de chaque slot de l'OTP
  const handleOtpChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const otpArray = otpValue.split(""); // Convertir en tableau
    otpArray[index] = event.target.value; // Mettre à jour l'index correspondant
    const updatedOtp = otpArray.join(""); // Reformer la chaîne d'OTP
    setValue("otp", updatedOtp); // Mettre à jour le champ otp dans react-hook-form
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email input */}
      <div>
        <label>Email</label>
        <Input {...register("email")} placeholder="Votre email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      {/* Email confirmation */}
      <div>
        <label>Confirmez l'Email</label>
        <Input
          {...register("confirmEmail")}
          placeholder="Confirmez votre email"
        />
        {errors.confirmEmail && <p>{errors.confirmEmail.message}</p>}
      </div>

      {/* OTP input */}
      <div>
        <label>Entrez votre code OTP</label>
        <InputOTP maxLength={6} onChange={(newValue: string) =>
                    setValue("otp", newValue)
                      }>
          <InputOTPGroup>
          <InputOTPSlot index={0}  />
          <InputOTPSlot index={1}  />
          <InputOTPSlot index={2}  />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
          <InputOTPSlot index={3}  />
          <InputOTPSlot index={4}  />
          <InputOTPSlot index={5}  />
          </InputOTPGroup>
        </InputOTP>
        {error && <p className="text-red-600">{error}</p>}
        {errors.otp && <p>{errors.otp.message}</p>}
      </div>

      {/* Submit button */}
      <Button type="submit">
        Valider OTP
      </Button>
    </form>
  );
};
export default AuthForm;
