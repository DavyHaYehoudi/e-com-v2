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
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useFetch } from "@/service/hooks/useFetch";

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
interface OnSubmitData {
  otp: string;
}
interface CartItemsToApi{
  id:number;
  quantityInCart: number;
  selectedVariant:string;
}
interface CartGiftCardsToApi{
  quantity: number;
  amount: number;
}
const OtpForm: React.FC<OtpFormProps> = ({ email, authenticate }) => {
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { triggerFetch } = useFetch<AuthResponse>("/auth/send-verify-otp", {
    method: "POST",
  });
  const getWishlistData = () => {
    const wishlist = localStorage.getItem("wishlistCustomer");
    if (!wishlist) return [];

    try {
      const parsedWishlist = JSON.parse(wishlist);
      return parsedWishlist.items.map((item: { id: number }) => ({
        product_id: item.id,
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération de la wishlist:", error);
      return [];
    }
  };

  const getCartData = () => {
    console.log('getCartData:')
    const cart = localStorage.getItem("cartCustomer");
    if (!cart) return { items: [], giftCards: [] };

    try {
      const parsedCart = JSON.parse(cart);
      const items = parsedCart.items.map((item: CartItemsToApi) => ({
        product_id: item.id,
        quantity: item.quantityInCart,
        variant: item.selectedVariant,
      }));

      const giftCards = parsedCart.giftCards.map((giftCard: CartGiftCardsToApi) => ({
        amount: giftCard.amount,
        quantity: giftCard.quantity,
      }));

      return { items, gift_cards:giftCards };
    } catch (error) {
      console.error("Erreur lors de la récupération du panier:", error);
      return { items: [], gift_cards: [] };
    }
  };
  const onSubmit = async (data: OnSubmitData) => {
    const bodyData = {
      email,
      otp: data.otp,
      wishlist: getWishlistData(),
      cart: getCartData(),
    };
    try {
      const OTPresponse = await triggerFetch(bodyData);
      if (OTPresponse) {
        authenticate(OTPresponse.token);
        toast("Vous êtes connecté 👍");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={() => (
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
                Le code OTP a été envoyé à votre email {email}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Valider OTP</Button>
      </form>
    </Form>
  );
};

export default OtpForm;
