"use client";

import React from "react";

interface AdjustableControlsProps {
  statusBarPadding: {
    left: number;
    right: number;
    top: number;
    bottom: number;
    between: number;
  };
  inputFieldOffset: number;
  chevronRightPadding: number;
  otherSenderMessage: string;
  handlePaddingChange: (key: string, value: number) => void;
  handleInputFieldOffsetChange: (value: number) => void;
  handleChevronRightPaddingChange: (value: number) => void;
  handleOtherSenderMessageChange: (message: string) => void;
  handleSendOtherMessage: () => void;
  handleIconUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    iconType: string
  ) => void;
}

export default function AdjustableControls({
  statusBarPadding,
  inputFieldOffset,
  chevronRightPadding,
  otherSenderMessage,
  handlePaddingChange,
  handleInputFieldOffsetChange,
  handleChevronRightPaddingChange,
  handleOtherSenderMessageChange,
  handleSendOtherMessage,
  handleIconUpload,
}: AdjustableControlsProps) {
  return (
    <div className="w-64 p-4 bg-white shadow-lg overflow-y-auto h-screen">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">
        Adjust Status Bar Padding
      </h3>
      {Object.entries(statusBarPadding).map(([key, value]) => (
        <div key={key} className="flex items-center mb-2">
          <label className="w-24 text-gray-700">
            {key.charAt(0).toUpperCase() + key.slice(1)}:
          </label>
          <input
            type="range"
            min="0"
            max="40"
            value={value}
            onChange={(e) => handlePaddingChange(key, parseInt(e.target.value))}
            className="w-full"
          />
          <span className="ml-2 w-8 text-right text-gray-700">{value}px</span>
        </div>
      ))}
      <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">
        Adjust Input Field Placement
      </h3>
      <div className="flex items-center mb-2">
        <label className="w-24 text-gray-700">Horizontal Offset:</label>
        <input
          type="range"
          min="-50"
          max="50"
          value={inputFieldOffset}
          onChange={(e) =>
            handleInputFieldOffsetChange(parseInt(e.target.value))
          }
          className="w-full"
        />
        <span className="ml-2 w-8 text-right text-gray-700">
          {inputFieldOffset}px
        </span>
      </div>
      <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">
        Adjust ChevronRight Icon
      </h3>
      <div className="flex items-center mb-2">
        <label className="w-24 text-gray-700">Padding:</label>
        <input
          type="range"
          min="-20"
          max="20"
          value={chevronRightPadding}
          onChange={(e) =>
            handleChevronRightPaddingChange(parseInt(e.target.value))
          }
          className="w-full"
        />
        <span className="ml-2 w-8 text-right text-gray-700">
          {chevronRightPadding}px
        </span>
      </div>
      <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">
        Other Sender Message
      </h3>
      <div className="flex flex-col mb-2">
        <input
          type="text"
          value={otherSenderMessage}
          onChange={(e) => handleOtherSenderMessageChange(e.target.value)}
          placeholder="Type a message for &rsquo;other&rsquo;"
          className="w-full p-2 border rounded mb-2 text-black placeholder-gray-500"
        />
        <button
          onClick={handleSendOtherMessage}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send as &rsquo;Other&rsquo;
        </button>
      </div>
      <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">
        Upload Status Icons
      </h3>
      <div className="flex flex-col space-y-2">
        {["paperPlane", "profile", "signal", "wifi", "battery"].map(
          (iconType) => (
            <div key={iconType} className="flex items-center">
              <label
                htmlFor={`${iconType}Icon`}
                className="w-24 text-gray-700 capitalize"
              >
                {iconType === "paperPlane" ? "Paper Plane" : iconType} Icon:
              </label>
              <input
                type="file"
                id={`${iconType}Icon`}
                onChange={(e) => handleIconUpload(e, iconType)}
                accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
