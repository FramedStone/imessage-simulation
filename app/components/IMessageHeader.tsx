"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Video, Camera } from "lucide-react";

interface IMessageHeaderProps {
  statusBarPadding: {
    left: number;
    right: number;
    top: number;
    bottom: number;
    between: number;
  };
  inputFieldOffset: number;
  chevronRightPadding: number;
  icons: {
    paperPlane: string | null;
    profile: string | null;
    signal: string | null;
    wifi: string | null;
    battery: string | null;
  };
}

export default function IMessageHeader({
  statusBarPadding,
  inputFieldOffset,
  chevronRightPadding,
  icons,
}: IMessageHeaderProps) {
  const [time, setTime] = useState("12:09");
  const [contactName, setContactName] = useState("Hong");
  const [inputWidth, setInputWidth] = useState(0);

  const contactNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (contactNameInputRef.current) {
      setInputWidth(contactNameInputRef.current.scrollWidth);
    }
  }, [contactName]);

  const handleContactNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactName(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  return (
    <div className="bg-gradient-to-b from-gray-200 to-gray-100">
      {/* Status Bar */}
      <div
        style={{
          padding: `${statusBarPadding.top}px ${statusBarPadding.right}px ${statusBarPadding.bottom}px ${statusBarPadding.left}px`,
        }}
        className="flex justify-between items-center text-gray-800 text-sm font-medium"
      >
        <div
          className="flex items-center"
          style={{ gap: `${statusBarPadding.between}px` }}
        >
          <input
            type="text"
            value={time}
            onChange={handleTimeChange}
            className="w-10 bg-transparent font-medium outline-none text-gray-800"
          />
          <div className="w-4 h-4 flex items-center justify-center">
            {icons.paperPlane ? (
              <img
                src={icons.paperPlane}
                alt="Paper Plane Icon"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera size={16} className="text-gray-600" />
            )}
          </div>
        </div>
        <div
          className="flex items-center"
          style={{ gap: `${statusBarPadding.between}px` }}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            {icons.signal ? (
              <img
                src={icons.signal}
                alt="Signal Icon"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera size={20} className="text-gray-600" />
            )}
          </div>
          <div className="w-5 h-5 flex items-center justify-center">
            {icons.wifi ? (
              <img
                src={icons.wifi}
                alt="WiFi Icon"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera size={20} className="text-gray-600" />
            )}
          </div>
          <div className="w-7 h-5 flex items-center justify-center">
            {icons.battery ? (
              <img
                src={icons.battery}
                alt="Battery Icon"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera size={20} className="text-gray-600" />
            )}
          </div>
        </div>
      </div>

      {/* Conversation Header */}
      <div className="px-4 py-2 flex items-center space-x-4">
        <ChevronLeft className="text-blue-500 w-6 h-6" />
        <div className="flex flex-col items-center flex-grow">
          <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-xl font-semibold text-white mb-1">
            {icons.profile ? (
              <img
                src={icons.profile}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              "HJ"
            )}
          </div>
          <div
            className="flex items-center"
            style={{ transform: `translateX(${inputFieldOffset}px)` }}
          >
            <input
              ref={contactNameInputRef}
              type="text"
              value={contactName}
              onChange={handleContactNameChange}
              className="font-semibold text-sm bg-transparent outline-none p-0 m-0 text-center text-gray-800"
              style={{ width: `${inputWidth}px` }}
            />
            <ChevronRight
              className="text-blue-500 w-4 h-4"
              strokeWidth={3}
              style={{
                marginLeft: `${chevronRightPadding}px`,
              }}
            />
          </div>
        </div>
        <Video className="text-blue-500 w-6 h-6" />
      </div>
    </div>
  );
}
