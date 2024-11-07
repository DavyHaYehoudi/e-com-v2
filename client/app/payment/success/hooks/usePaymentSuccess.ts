"use client";
import { useFetch } from "@/service/hooks/useFetch";

const usePaymentSuccess = () => {
  const { triggerFetch } = useFetch("/payment/accepted", {
    method: "PUT",
    requiredCredentials: true,
  });

  const getUpdateStatusOrder = async (confirmation_number: string) => {
    await triggerFetch({
      bodyData: { confirmation_number },
    });
  };

  return { getUpdateStatusOrder };
};

export default usePaymentSuccess;
