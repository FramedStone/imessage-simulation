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
}

export default function IMessageHeader({
  statusBarPadding,
  inputFieldOffset,
  chevronRightPadding,
}: IMessageHeaderProps) {
  const [time, setTime] = useState("12:09");
  const [timeIcon, setTimeIcon] = useState<string | null>(null);
  const [profileIcon, setProfileIcon] = useState<string | null>(null);
  const [contactName, setContactName] = useState("Hong");
  const [signalIcon, setSignalIcon] = useState<string | null>(null);
  const [wifiIcon, setWifiIcon] = useState<string | null>(null);
  const [batteryIcon, setBatteryIcon] = useState<string | null>(null);
  const [inputWidth, setInputWidth] = useState(0);

  const timeIconInputRef = useRef<HTMLInputElement>(null);
  const profileIconInputRef = useRef<HTMLInputElement>(null);
  const signalIconInputRef = useRef<HTMLInputElement>(null);
  const wifiIconInputRef = useRef<HTMLInputElement>(null);
  const batteryIconInputRef = useRef<HTMLInputElement>(null);
  const contactNameInputRef = useRef<HTMLInputElement>(null);

  const handleIconUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setIcon: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setIcon(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
          <div
            className="w-4 h-4 flex items-center justify-center cursor-pointer"
            onClick={() => timeIconInputRef.current?.click()}
          >
            {timeIcon ? (
              <img
                src={timeIcon}
                alt="Time Icon"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera size={16} className="text-gray-600" />
            )}
          </div>
          <input
            type="file"
            ref={timeIconInputRef}
            className="hidden"
            onChange={(e) => handleIconUpload(e, setTimeIcon)}
            accept="image/*"
          />
        </div>
        <div
          className="flex items-center"
          style={{ gap: `${statusBarPadding.between}px` }}
        >
          <div
            className="w-5 h-5 flex items-center justify-center cursor-pointer"
            onClick={() => signalIconInputRef.current?.click()}
          >
            {signalIcon ? (
              <img
                src={signalIcon}
                alt="Signal Icon"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera size={20} className="text-gray-600" />
            )}
          </div>
          <input
            type="file"
            ref={signalIconInputRef}
            className="hidden"
            onChange={(e) => handleIconUpload(e, setSignalIcon)}
            accept="image/*"
          />
          <div
            className="w-5 h-5 flex items-center justify-center cursor-pointer"
            onClick={() => wifiIconInputRef.current?.click()}
          >
            {wifiIcon ? (
              <img
                src={wifiIcon}
                alt="WiFi Icon"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera size={20} className="text-gray-600" />
            )}
          </div>
          <input
            type="file"
            ref={wifiIconInputRef}
            className="hidden"
            onChange={(e) => handleIconUpload(e, setWifiIcon)}
            accept="image/*"
          />
          <div
            className="w-7 h-5 flex items-center justify-center cursor-pointer"
            onClick={() => batteryIconInputRef.current?.click()}
          >
            {batteryIcon ? (
              <img
                src={batteryIcon}
                alt="Battery Icon"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera size={20} className="text-gray-600" />
            )}
          </div>
          <input
            type="file"
            ref={batteryIconInputRef}
            className="hidden"
            onChange={(e) => handleIconUpload(e, setBatteryIcon)}
            accept="image/*"
          />
        </div>
      </div>

      {/* Conversation Header */}
      <div className="px-4 py-2 flex items-center space-x-4">
        <ChevronLeft className="text-blue-500 w-6 h-6" />
        <div className="flex flex-col items-center flex-grow">
          <div
            className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-xl font-semibold text-white cursor-pointer mb-1"
            onClick={() => profileIconInputRef.current?.click()}
          >
            {profileIcon ? (
              <img
                src={profileIcon}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              "HJ"
            )}
          </div>
          <input
            type="file"
            ref={profileIconInputRef}
            className="hidden"
            onChange={(e) => handleIconUpload(e, setProfileIcon)}
            accept="image/*"
          />
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
