"use client";
import React from "react";
import Chat from "@/components/pages/dashboard/customer/chat/Chat";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: {
    id: string;
  };
}
const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
  const { id } = params;
  if (!id) {
    notFound(); // Gère le cas où l'ID est manquant
  }
  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-center mb-20">Echanger avec un responsable</h1>
      <Link
        href="/customer/tableau-de-bord/commandes/liste"
        className="underline text-blue-300"
      >
        Retour à la liste
      </Link>
      <Chat orderId={id} />
    </div>
  );
};

export default ChatPage;
