"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format, isSameDay, isSameMinute } from "date-fns";

// import { mockMessages as initialMessages } from "./mockChat";
import useMessagesCustomer, {
  OneMessageCustomer,
} from "../hooks/useMessagesCustomer";
import { toast } from "sonner";
interface ChatProps {
  orderId: string;
}
const Chat: React.FC<ChatProps> = ({ orderId }) => {
  const [messages, setMessages] = useState<OneMessageCustomer[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const { messagesCustomerGet, messageCustomerCreate } =
    useMessagesCustomer(orderId);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await messagesCustomerGet(orderId);
        if (data) {
          setMessages(data);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la discussion :",
          error
        );
      }
    };
    fetchMessages();
  }, [orderId, messagesCustomerGet]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const bodyData = {
        sender: "customer",
        body: newMessage,
      };
      await messageCustomerCreate(bodyData);
      // Ajouter le message dans les messages
      const newMessageObj: OneMessageCustomer = {
        id: 0,
        sender: "customer",
        body: newMessage.trim(),
        is_read: 0,
        order_id: parseInt(orderId),
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessageObj]);
      setNewMessage(""); // Réinitialiser la boîte d'entrée
      toast("Votre message a bien été envoyé.");
    } catch (error) {
      toast(
        "Il y a eu une erreur lors de l'envoi de votre message. Veuillez réessayer."
      );
      console.log("Erreur lors de l'envoi d'un message :", error);
    }
  };

  return (
    <div className="flex flex-col h-[92%] bg-purple-50 rounded-3xl my-10">
      {/* Zone des messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages &&
          messages.length > 0 &&
          messages.map((message, index) => {
            const isSameAuthor =
              index > 0 && messages[index - 1].sender === message.sender;
            const isCloseInTime =
              index > 0 &&
              isSameMinute(
                new Date(messages[index - 1].created_at),
                new Date(message.created_at)
              );
            const isSameDayMessage =
              index > 0 &&
              isSameDay(
                new Date(messages[index - 1].created_at),
                new Date(message.created_at)
              );

            return (
              <div
                key={index}
                className={cn(
                  "flex",
                  message.sender === "admin" ? "justify-end" : "justify-start"
                )}
              >
                {!isSameAuthor && (
                  <div className="mr-2">
                    <Avatar>
                      <AvatarImage
                        src={
                          message.sender === "customer"
                            ? "/customer-avatar.png"
                            : "/admin-avatar.png"
                        }
                        alt={message.sender}
                      />
                      <AvatarFallback>
                        {message.sender === "customer" ? "C" : "A"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}
                <div>
                  <div
                    className={cn(
                      "p-3 rounded-lg max-w-xs text-sm",
                      message.sender === "admin"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    )}
                  >
                    {message.body}
                  </div>
                  {!isCloseInTime && (
                    <span className="text-xs text-gray-500">
                      {format(
                        new Date(message?.created_at),
                        isSameDayMessage ? "HH:mm" : "dd/MM/yyyy HH:mm"
                      )}
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
          placeholder="Ecrire un message..."
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
