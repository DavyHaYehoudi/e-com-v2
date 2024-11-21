"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format, isSameDay, isSameMinute } from "date-fns";

type Message = {
  role: "customer" | "admin";
  text: string;
  createdAt: string;
};

type ChatProps = {
  messages: Message[];
};

import { mockMessages as initialMessages } from "./mockChat";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Ajouter le message dans les messages
    const newMessageObj: Message = {
      role: "customer",
      text: newMessage.trim(),
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessageObj]);
    setNewMessage(""); // Réinitialiser la boîte d'entrée
  };

  return (
    <div className="flex flex-col h-[92%]">
      {/* Zone des messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((message, index) => {
          const isSameAuthor =
            index > 0 && messages[index - 1].role === message.role;
          const isCloseInTime =
            index > 0 &&
            isSameMinute(
              new Date(messages[index - 1].createdAt),
              new Date(message.createdAt)
            );
          const isSameDayMessage =
            index > 0 &&
            isSameDay(
              new Date(messages[index - 1].createdAt),
              new Date(message.createdAt)
            );

          return (
            <div key={index} className={cn("flex", message.role === "admin" ? "justify-end" : "justify-start")}>
              {!isSameAuthor && (
                <div className="mr-2">
                  <Avatar>
                    <AvatarImage
                      src={
                        message.role === "customer"
                          ? "/customer-avatar.png"
                          : "/admin-avatar.png"
                      }
                      alt={message.role}
                    />
                    <AvatarFallback>
                      {message.role === "customer" ? "C" : "A"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              <div>
                <div
                  className={cn(
                    "p-3 rounded-lg max-w-xs text-sm",
                    message.role === "admin"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  )}
                >
                  {message.text}
                </div>
                {!isCloseInTime && (
                  <span className="text-xs text-gray-500">
                    {format(new Date(message.createdAt), isSameDayMessage ? "HH:mm" : "dd/MM/yyyy HH:mm")}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Barre de rédaction fixe */}
      <div className="p-4 border-t flex items-center flex-wrap justify-center gap-5 space-x-2 bg-white sticky bottom-0">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-lg text-sm"
          placeholder="Écrire un message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default Chat;
