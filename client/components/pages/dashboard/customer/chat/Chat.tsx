"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format, isSameMinute } from "date-fns";

type Message = {
  role: "customer" | "admin";
  text: string;
  createdAt: string;
};

type ChatProps = {
  messages: Message[];
};

import {mockMessages as messages} from "./mockChat"
const Chat = ()=> {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => {
        const isSameAuthor =
          index > 0 && messages[index - 1].role === message.role;
        const isCloseInTime =
          index > 0 &&
          isSameMinute(
            new Date(messages[index - 1].createdAt),
            new Date(message.createdAt)
          );

        return (
          <div
            key={index}
            className={cn(
              "flex",
              message.role === "admin" ? "justify-end" : "justify-start"
            )}
          >
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
                  {format(new Date(message.createdAt), "HH:mm")}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Chat