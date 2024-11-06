import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import getStripe from './utils/get-stripejs';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY||"");

const  CheckoutSection=()=> {
  const appearance = {
    theme: "stripe",
  };
  const options = {
    // clientSecret,
    appearance,
  };
  const stripePromise=  getStripe()
  return (
    <Elements stripe={stripePromise} options={options} >
      <CheckoutForm />
    </Elements>
  );
}
export default CheckoutSection;