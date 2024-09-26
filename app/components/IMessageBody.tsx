"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Mic, ArrowUp, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  delivered: boolean;
}

interface IMessageBodyProps {
  onSendMessage: (text: string, sender: "user") => void;
  messages: Message[];
  messageTimestamp: Date | "now";
}

export default function IMessageBody({
  onSendMessage,
  messages,
  messageTimestamp,
}: IMessageBodyProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      onSendMessage(inputText, "user");
      setInputText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const formatMessageTimestamp = (timestamp: Date | "now") => {
    if (timestamp === "now") {
      return "Now";
    }
    return timestamp.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-center text-gray-500 text-sm mb-4">
          {formatMessageTimestamp(messageTimestamp)}
        </div>
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-1`}
            >
              <div className="relative max-w-[70%]">
                <div className="flex items-center">
                  <div
                    className={`py-2 px-4 rounded-3xl ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                  {message.sender === "user" && !message.delivered && (
                    <div className="ml-2">
                      <AlertCircle size={20} className="text-red-500" />
                    </div>
                  )}
                </div>
                {message.sender === "user" && (
                  <div className="flex items-center mt-0.5 justify-end">
                    {message.delivered ? (
                      <span className="text-xs text-gray-500">Delivered</span>
                    ) : (
                      <span className="text-xs text-red-500">
                        Not Delivered
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 pb-5 border-t">
        <div className="flex items-center bg-gray-100 rounded-full">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Plus className="w-6 h-6 text-blue-500" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="iMessage"
            className="flex-1 bg-transparent py-2 px-4 outline-none text-black placeholder-gray-500"
          />
          {inputText ? (
            <button
              onClick={handleSendMessage}
              className="p-1.5 m-1 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center"
              style={{ width: "32px", height: "32px" }}
            >
              <ArrowUp className="w-5 h-5 text-white" strokeWidth={3} />
            </button>
          ) : (
            <button className="p-2 rounded-full hover:bg-gray-200">
              <Mic className="w-6 h-6 text-blue-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
