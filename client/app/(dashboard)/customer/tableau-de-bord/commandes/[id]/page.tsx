import React from 'react';
import { notFound } from "next/navigation";
interface OneOrderProps {
    params: {
      id: string;
    };
  }
const page = ({ params }: OneOrderProps) => {
    const { id } = params;
  if (!id) {
    notFound(); // Gère le cas où l'ID est manquant
  }
    return (
        <div>
            une commande en particulier : {id}
        </div>
    );
};

export default page;