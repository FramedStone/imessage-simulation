"use client";

import React, { useState } from "react";
import AdjustableControls from "./components/AdjustableControls";
import IMessageHeader from "./components/IMessageHeader";
import IMessageBody from "./components/IMessageBody";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
}

export default function Home() {
  const [statusBarPadding, setStatusBarPadding] = useState({
    left: 20,
    right: 16,
    top: 20,
    bottom: 2,
    between: 5,
  });
  const [inputFieldOffset, setInputFieldOffset] = useState(0);
  const [chevronRightPadding, setChevronRightPadding] = useState(0);
  const [otherSenderMessage, setOtherSenderMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "hi", sender: "other" },
    { id: 2, text: "hi", sender: "user" },
  ]);

  const handlePaddingChange = (key: string, value: number) => {
    setStatusBarPadding((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputFieldOffsetChange = (value: number) => {
    setInputFieldOffset(value);
  };

  const handleChevronRightPaddingChange = (value: number) => {
    setChevronRightPadding(value);
  };

  const handleOtherSenderMessageChange = (message: string) => {
    setOtherSenderMessage(message);
  };

  const handleSendMessage = (text: string, sender: "user" | "other") => {
    const newMessage = { id: messages.length + 1, text, sender };
    setMessages([...messages, newMessage]);
  };

  const handleSendOtherMessage = () => {
    if (otherSenderMessage.trim()) {
      handleSendMessage(otherSenderMessage, "other");
      setOtherSenderMessage("");
    }
  };

  return (
    <main className="flex h-screen">
      <AdjustableControls
        statusBarPadding={statusBarPadding}
        inputFieldOffset={inputFieldOffset}
        chevronRightPadding={chevronRightPadding}
        otherSenderMessage={otherSenderMessage}
        handlePaddingChange={handlePaddingChange}
        handleInputFieldOffsetChange={handleInputFieldOffsetChange}
        handleChevronRightPaddingChange={handleChevronRightPaddingChange}
        handleOtherSenderMessageChange={handleOtherSenderMessageChange}
        handleSendOtherMessage={handleSendOtherMessage}
      />
      <div className="flex-1 flex flex-col">
        <IMessageHeader
          statusBarPadding={statusBarPadding}
          inputFieldOffset={inputFieldOffset}
          chevronRightPadding={chevronRightPadding}
        />
        <IMessageBody onSendMessage={handleSendMessage} messages={messages} />
      </div>
    </main>
  );
}
