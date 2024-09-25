"use client";

import React, { useState } from "react";
import AdjustableControls from "./components/AdjustableControls";
import IMessageHeader from "./components/IMessageHeader";
import IMessageBody from "./components/IMessageBody";

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

  const handlePaddingChange = (key: string, value: number) => {
    setStatusBarPadding((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputFieldOffsetChange = (value: number) => {
    setInputFieldOffset(value);
  };

  const handleChevronRightPadding = (value: number) => {
    setChevronRightPadding(value);
  };

  return (
    <main className="flex h-screen bg-gray-100">
      <div className="w-80 bg-white shadow-lg overflow-y-auto">
        <AdjustableControls
          statusBarPadding={statusBarPadding}
          inputFieldOffset={inputFieldOffset}
          chevronRightPadding={chevronRightPadding}
          handlePaddingChange={handlePaddingChange}
          handleInputFieldOffsetChange={handleInputFieldOffsetChange}
          handleChevronRightPaddingChange={handleChevronRightPadding}
        />
      </div>
      <div className="flex-1 flex flex-col max-w-md mx-auto bg-white shadow-lg">
        <IMessageHeader
          statusBarPadding={statusBarPadding}
          inputFieldOffset={inputFieldOffset}
          chevronRightPadding={chevronRightPadding}
        />
        <IMessageBody />
      </div>
    </main>
  );
}
