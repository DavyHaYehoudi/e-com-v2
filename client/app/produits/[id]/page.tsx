import React from "react";
import { notFound } from "next/navigation";

interface MasterProductProps {
  params: {
    id: string;
  };
}

const MasterProduct = ({ params }: MasterProductProps) => {
  const { id } = params;

  if (!id) {
    notFound(); // Gère le cas où l'ID est manquant
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Détails du produit : {id}</h1>
    </div>
  );
};

export default MasterProduct;
