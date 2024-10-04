"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Utilisation correcte du Dialog
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"; // Assurez-vous que ce chemin est correct
import { Input } from "@/components/ui/input"; // Assurez-vous que ce chemin est correct
import {
  loginSchema,
  LoginFormValues,
} from "@/components/modules/login/loginSchema"; // Fichier séparé pour Zod

interface LoginModalProps {
  authenticate: (boolean: boolean) => void;
}
const LoginModal: React.FC<LoginModalProps> = ({ authenticate }) => {
  const [otpSent, setOtpSent] = useState(true);
  const [otpValidated, setOtpValidated] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", otp: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    if (!otpSent) {
      // Envoi de l'OTP
      await sendOtpToEmail(data.email);
      setOtpSent(true);
    } else {
      // Vérification de l'OTP
      if (validateOtp(data.otp)) {
        setOtpValidated(true);
        authenticate(true);
        setError("");
      } else {
        setError("Le code OTP est incorrect. Veuillez réessayer.");
      }
    }
  };

  const sendOtpToEmail = async (email: string) => {
    console.log(`OTP envoyé à l'adresse: ${email}`);
    // Simulez l'envoi d'un OTP (ajoutez votre logique d'envoi ici)
  };

  const validateOtp = (otp: string) => {
    return otp === "123456"; // Exemple d'OTP correct
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[var(--golden-2)] hover:bg-[var(--golden-2-hover)]">
          Se connecter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connexion</DialogTitle>
          <DialogDescription>
            {otpValidated ? (
              <p>Connexion réussie ! Bienvenue.</p>
            ) : (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {!otpSent ? (
                  <>
                    <label htmlFor="email">Votre email</label>
                    <Input
                      {...form.register("email")}
                      type="email"
                      id="email"
                      placeholder="email@exemple.com"
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor="otp">Entrez votre code OTP</label>
                    <InputOTP
                      maxLength={6}
                      onChange={(newValue: string) =>
                        form.setValue("otp", newValue)
                      }
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </>
                )}
                {error && <p className="text-red-600">{error}</p>}
                <Button type="submit">
                  {otpSent ? "Valider OTP" : "Envoyer OTP"}
                </Button>
              </form>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
