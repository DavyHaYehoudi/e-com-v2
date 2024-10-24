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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useState } from "react";

// Schéma de validation Zod
const emailSchema = z.object({
  email: z.string().email("L'email doit être valide"),
});

interface EmailFormProps {
  onEmailSubmit: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onEmailSubmit }) => {
  const [error, setError] = useState("");
  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: any) => {
    const bodyData = { email: data.email };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/open-session`,
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

      await response.json();
      onEmailSubmit(data.email);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue."
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Votre email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  id="email"
                  placeholder="email@exemple.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Entrez votre adresse e-mail pour recevoir un code OTP.
              </FormDescription>
              <FormMessage>
                {error && <p className="text-red-600">{error}</p>}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Envoyer OTP</Button>
      </form>
    </Form>
  );
};

export default EmailForm;
