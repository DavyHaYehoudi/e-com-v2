"use client";

import { useEffect, useState } from "react";
import { CashBackCartToUseType } from "../types/CashbackCartToUseType";
import { useFetch } from "@/service/hooks/useFetch";

const useCashback = () => {
  const [cashbackOneCustomer, setCashbackOneCustomer] =
    useState<CashBackCartToUseType | null>(null);
  const [availableCashback, setAvailableCashback] = useState(0);

  const { data, triggerFetch } = useFetch<CashBackCartToUseType>(
    "/customer/cash-back-history",
    { requiredCredentials: true }
  );

  const getCashbackOneCustomer = async () => {
    await triggerFetch();
  };

  useEffect(() => {
    if (data) {
      setCashbackOneCustomer(data);
    }
  }, [data]);

  useEffect(() => {
    if (cashbackOneCustomer) {
      setAvailableCashback(
        cashbackOneCustomer.total_earned - cashbackOneCustomer.total_spent
      );
    }
  }, [cashbackOneCustomer]);

  return { cashbackOneCustomer, getCashbackOneCustomer, availableCashback };
};

export default useCashback;
