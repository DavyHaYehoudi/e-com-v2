"use client";
import React from "react";
import Chat from "@/components/pages/dashboard/customer/chat/Chat";

const ChatPage = () => {
  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-center mb-20">Echanger avec un responsable</h1>
      <Chat />
    </div>
  );
};

export default ChatPage;
