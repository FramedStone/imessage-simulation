"use client";

import React, { useState } from "react";
import { Icons } from "../page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  statusBarTimestamp: string;
  messageTimestamp: Date;
  isMessageDelivered: boolean;
  handlePaddingChange: (key: string, value: number) => void;
  handleInputFieldOffsetChange: (value: number) => void;
  handleChevronRightPaddingChange: (value: number) => void;
  handleOtherSenderMessageChange: (message: string) => void;
  handleSendOtherMessage: () => void;
  handleIconUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    iconType: keyof Icons
  ) => void;
  handleStatusBarTimestampChange: (timestamp: string) => void;
  handleMessageTimestampChange: (date: Date | null) => void;
  handleMessageDeliveryToggle: (isDelivered: boolean) => void;
}

export default function AdjustableControls({
  statusBarPadding,
  inputFieldOffset,
  chevronRightPadding,
  otherSenderMessage,
  statusBarTimestamp,
  messageTimestamp,
  isMessageDelivered,
  handlePaddingChange,
  handleInputFieldOffsetChange,
  handleChevronRightPaddingChange,
  handleOtherSenderMessageChange,
  handleSendOtherMessage,
  handleIconUpload,
  handleStatusBarTimestampChange,
  handleMessageTimestampChange,
  handleMessageDeliveryToggle,
}: AdjustableControlsProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const openDatePicker = () => setIsDatePickerOpen(true);
  const closeDatePicker = () => setIsDatePickerOpen(false);

  return (
    <div className="w-full p-6 bg-white shadow-lg overflow-y-auto h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Adjustable Controls
      </h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Adjust Status Bar Padding
        </h3>
        {Object.entries(statusBarPadding).map(([key, value]) => (
          <div key={key} className="flex items-center mb-4">
            <label className="w-1/4 text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <input
              type="range"
              min="0"
              max="40"
              value={value}
              onChange={(e) =>
                handlePaddingChange(key, parseInt(e.target.value))
              }
              className="w-1/2 mr-4"
            />
            <span className="w-1/4 text-right text-gray-700">{value}px</span>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Adjust Input Field Placement
        </h3>
        <div className="flex items-center mb-4">
          <label className="w-1/4 text-gray-700">Horizontal Offset:</label>
          <input
            type="range"
            min="-50"
            max="50"
            value={inputFieldOffset}
            onChange={(e) =>
              handleInputFieldOffsetChange(parseInt(e.target.value))
            }
            className="w-1/2 mr-4"
          />
          <span className="w-1/4 text-right text-gray-700">
            {inputFieldOffset}px
          </span>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Adjust ChevronRight Icon
        </h3>
        <div className="flex items-center mb-4">
          <label className="w-1/4 text-gray-700">Padding:</label>
          <input
            type="range"
            min="-20"
            max="20"
            value={chevronRightPadding}
            onChange={(e) =>
              handleChevronRightPaddingChange(parseInt(e.target.value))
            }
            className="w-1/2 mr-4"
          />
          <span className="w-1/4 text-right text-gray-700">
            {chevronRightPadding}px
          </span>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Other Sender Message
        </h3>
        <div className="flex flex-col mb-4">
          <input
            type="text"
            value={otherSenderMessage}
            onChange={(e) => handleOtherSenderMessageChange(e.target.value)}
            placeholder="Type a message for 'other'"
            className="w-full p-2 border rounded mb-2 text-black placeholder-gray-500"
          />
          <button
            onClick={handleSendOtherMessage}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send as 'Other'
          </button>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Upload Status Icons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(
            ["paperPlane", "profile", "signal", "wifi", "battery"] as const
          ).map((iconType) => (
            <div key={iconType} className="flex flex-col">
              <label
                htmlFor={`${iconType}Icon`}
                className="mb-2 text-gray-700 capitalize"
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
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Status Bar Timestamp
        </h3>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={statusBarTimestamp}
            onChange={(e) => handleStatusBarTimestampChange(e.target.value)}
            placeholder="Enter status bar timestamp"
            className="w-full p-2 border rounded text-black placeholder-gray-500"
          />
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Message Timestamp
        </h3>
        <div className="flex items-center mb-4">
          <button
            onClick={openDatePicker}
            className="w-full p-2 border rounded text-black bg-white hover:bg-gray-100"
          >
            {messageTimestamp.toLocaleString()}
          </button>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Message Delivery Status
        </h3>
        <div className="flex items-center mb-4">
          <label className="mr-4 text-gray-700">Delivered:</label>
          <input
            type="checkbox"
            checked={isMessageDelivered}
            onChange={(e) => handleMessageDeliveryToggle(e.target.checked)}
            className="form-checkbox h-6 w-6 text-blue-600"
          />
        </div>
      </section>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <DatePicker
              selected={messageTimestamp}
              onChange={(date: Date | null) => {
                if (date) {
                  handleMessageTimestampChange(date);
                  closeDatePicker();
                }
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              inline
            />
            <button
              onClick={closeDatePicker}
              className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
