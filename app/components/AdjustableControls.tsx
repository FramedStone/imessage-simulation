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
}

export default function AdjustableControls({
  statusBarPadding,
  inputFieldOffset,
  chevronRightPadding,
  otherSenderMessage,
  statusBarTimestamp,
  messageTimestamp,
  handlePaddingChange,
  handleInputFieldOffsetChange,
  handleChevronRightPaddingChange,
  handleOtherSenderMessageChange,
  handleSendOtherMessage,
  handleIconUpload,
  handleStatusBarTimestampChange,
  handleMessageTimestampChange,
}: AdjustableControlsProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const openDatePicker = () => setIsDatePickerOpen(true);
  const closeDatePicker = () => setIsDatePickerOpen(false);

  const handleDateChange = (
    date: Date | null,
    event: React.SyntheticEvent<any> | undefined
  ) => {
    if (date) {
      handleMessageTimestampChange(date);
      closeDatePicker();
    }
  };

  return (
    <div className="w-64 p-4 bg-white shadow-lg overflow-y-auto h-screen">
      {/* ... (previous code remains unchanged) */}

      <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">
        Message Timestamp
      </h3>
      <div className="flex items-center mb-2">
        <button
          onClick={openDatePicker}
          className="w-full p-2 border rounded text-black bg-white hover:bg-gray-100"
        >
          {messageTimestamp.toLocaleString()}
        </button>
      </div>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <DatePicker
              selected={messageTimestamp}
              onChange={handleDateChange}
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
