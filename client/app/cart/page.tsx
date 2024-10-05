import CartTable from "@/components/pages/cart/CartTable";
import React from "react";

const page = () => {
  return (
    <main>
      <h1 className="uppercase text-center m-10">mon panier</h1>
      <section className="w-full flex justify-center">
        <div className="w-full sm:w-full md:w-3/4 lg:w-1/2">
          <CartTable />
        </div>
      </section>
      <section className="uppercase">avantages</section>
    </main>
  );
};

export default page;
