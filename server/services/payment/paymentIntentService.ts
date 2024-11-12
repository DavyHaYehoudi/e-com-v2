import Stripe from "stripe";
import { getPaymentAmountService } from "./paymentAmountService.js";
import { formatAmount } from "../../utils/format_amount.js";

export async function getPaymentIntentService(
  customerId: number,
  shippingMethodId: number | null,
  giftCardIds: number[],
  codePromo: string | null,
  cashBackToSpend: number | null,
  emailCustomer: string | null
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const amounts = await getPaymentAmountService(
    customerId,
    shippingMethodId,
    giftCardIds,
    codePromo,
    cashBackToSpend
  );
  const amount = formatAmount(amounts.orderAmount);

  try {
    // Rechercher un client existant par email
    const existingCustomers = await stripe.customers.list({
      email: emailCustomer || undefined,
    });

    let customer;
    if (existingCustomers.data.length > 0) {
      // Utiliser le client existant
      customer = existingCustomers.data[0];
    } else {
      // Créer un nouveau client
      customer = await stripe.customers.create({
        email: emailCustomer || undefined,
      });
    }

    const customerId = customer.id;
    const amountFormatStripe = Math.floor(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountFormatStripe,
      currency: "EUR",
      customer: customerId,
    });

    return { clientSecret: paymentIntent.client_secret, amount };
  } catch (error) {}
}
