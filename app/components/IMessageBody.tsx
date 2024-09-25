"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Mic, ArrowUp } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
}

export default function IMessageBody() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "hi", sender: "other" },
    { id: 2, text: "hi", sender: "user" },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: inputText, sender: "user" },
      ]);
      setInputText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const conversationStartTime = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-center text-gray-500 text-sm mb-4">
          {conversationStartTime}
        </div>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`rounded-2xl py-2 px-4 max-w-[70%] ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t">
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
