"use client";

import React, { useState } from "react";
import AdjustableControls from "./components/AdjustableControls";
import IMessageHeader from "./components/IMessageHeader";
import IMessageBody from "./components/IMessageBody";
import IPhoneWrapper from "./components/IPhoneWrapper";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  delivered: boolean;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [icons, setIcons] = useState<Icons>({
    paperPlane: null,
    profile: null,
    signal: null,
    wifi: null,
    battery: null,
  });
  const [statusBarTimestamp, setStatusBarTimestamp] = useState("12:09");
  const [messageTimestamp, setMessageTimestamp] = useState<Date | "now">(
    new Date()
  );
  const [isMessageDelivered, setIsMessageDelivered] = useState(true);

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
    const newMessage = {
      id: messages.length + 1,
      text,
      sender,
      delivered: isMessageDelivered,
    };
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

  const handleMessageTimestampChange = (date: Date | "now") => {
    setMessageTimestamp(date);
  };

  const handleMessageDeliveryToggle = (isDelivered: boolean) => {
    setIsMessageDelivered(isDelivered);
  };

  return (
    <main className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-2/5 xl:w-1/3 p-4 bg-gray-100 overflow-y-auto">
        <AdjustableControls
          statusBarPadding={statusBarPadding}
          inputFieldOffset={inputFieldOffset}
          chevronRightPadding={chevronRightPadding}
          otherSenderMessage={otherSenderMessage}
          statusBarTimestamp={statusBarTimestamp}
          messageTimestamp={messageTimestamp}
          isMessageDelivered={isMessageDelivered}
          handlePaddingChange={handlePaddingChange}
          handleInputFieldOffsetChange={handleInputFieldOffsetChange}
          handleChevronRightPaddingChange={handleChevronRightPaddingChange}
          handleOtherSenderMessageChange={handleOtherSenderMessageChange}
          handleSendOtherMessage={handleSendOtherMessage}
          handleIconUpload={handleIconUpload}
          handleStatusBarTimestampChange={handleStatusBarTimestampChange}
          handleMessageTimestampChange={handleMessageTimestampChange}
          handleMessageDeliveryToggle={handleMessageDeliveryToggle}
        />
      </div>
      <div className="w-full lg:w-3/5 xl:w-2/3 flex justify-center items-center bg-white">
        <IPhoneWrapper>
          <div className="flex-1 flex flex-col h-full">
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
        </IPhoneWrapper>
      </div>
    </main>
  );
}
