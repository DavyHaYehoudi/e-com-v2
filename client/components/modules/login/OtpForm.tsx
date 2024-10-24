"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const otpSchema = z.object({
  otp: z.string().length(6, "Le code OTP doit comporter 6 chiffres"),
});
interface OtpFormProps {
  email: string;
  authenticate: (token: string) => void;
}
interface AuthResponse {
  token: string;
}
const OtpForm: React.FC<OtpFormProps> = ({ email, authenticate }) => {
  const [error, setError] = useState("");
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const bodyData = { email, otp: data.otp };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/send-verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de l'OTP. Veuillez réessayer.");
      }

      const responseData: AuthResponse = await response.json();
      authenticate(responseData.token);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue."
      );
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="otp">Entrez votre code OTP</FormLabel>
              <FormControl>
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
              </FormControl>
              <FormDescription>
                Le code OTP a été envoyé à votre email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-600">{error}</p>}
        <Button type="submit">Valider OTP</Button>
      </form>
    </Form>
  );
};

export default OtpForm;
