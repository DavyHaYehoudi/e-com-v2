import SearchByTrackingNumber from "@/components/shared/SearchByTrackingNumber";
import React from "react";

const page = () => {
  return (
    <div className="text-center">
      <h1 className="mb-10">Suivez votre colis</h1>
      <SearchByTrackingNumber />
    </div>
  );
};

export default page;
