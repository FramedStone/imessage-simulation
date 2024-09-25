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

export interface Icons {
  paperPlane: string | null;
  profile: string | null;
  signal: string | null;
  wifi: string | null;
  battery: string | null;
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
  const [icons, setIcons] = useState<Icons>({
    paperPlane: null,
    profile: null,
    signal: null,
    wifi: null,
    battery: null,
  });
  const [statusBarTimestamp, setStatusBarTimestamp] = useState("12:09");
  const [messageTimestamp, setMessageTimestamp] = useState(new Date());

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

  const handleIconUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    iconType: keyof Icons
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const target = e.target;
        if (target && target.result && typeof target.result === "string") {
          setIcons((prev) => ({ ...prev, [iconType]: target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStatusBarTimestampChange = (timestamp: string) => {
    setStatusBarTimestamp(timestamp);
  };

  const handleMessageTimestampChange = (date: Date | null) => {
    if (date) {
      setMessageTimestamp(date);
    }
  };

  return (
    <main className="flex h-screen">
      <AdjustableControls
        statusBarPadding={statusBarPadding}
        inputFieldOffset={inputFieldOffset}
        chevronRightPadding={chevronRightPadding}
        otherSenderMessage={otherSenderMessage}
        statusBarTimestamp={statusBarTimestamp}
        messageTimestamp={messageTimestamp}
        handlePaddingChange={handlePaddingChange}
        handleInputFieldOffsetChange={handleInputFieldOffsetChange}
        handleChevronRightPaddingChange={handleChevronRightPaddingChange}
        handleOtherSenderMessageChange={handleOtherSenderMessageChange}
        handleSendOtherMessage={handleSendOtherMessage}
        handleIconUpload={handleIconUpload}
        handleStatusBarTimestampChange={handleStatusBarTimestampChange}
        handleMessageTimestampChange={handleMessageTimestampChange}
      />
      <div className="flex-1 flex flex-col">
        <IMessageHeader
          statusBarPadding={statusBarPadding}
          inputFieldOffset={inputFieldOffset}
          chevronRightPadding={chevronRightPadding}
          icons={icons}
          statusBarTimestamp={statusBarTimestamp}
        />
        <IMessageBody
          onSendMessage={handleSendMessage}
          messages={messages}
          messageTimestamp={messageTimestamp}
        />
      </div>
    </main>
  );
}
