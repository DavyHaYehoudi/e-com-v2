import OrdersList from "@/components/pages/dashboard/customer/orders/liste/OrdersList";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-center mb-10">Liste des commandes</h1>
      <div className="xl:w-3/4 xl:mx-auto 2xl:w-1/2 w-[300px]">
        <OrdersList />
      </div>
    </div>
  );
};

export default page;
