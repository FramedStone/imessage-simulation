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
  handlePaddingChange: (key: string, value: number) => void;
  handleInputFieldOffsetChange: (value: number) => void;
  handleChevronRightPaddingChange: (value: number) => void;
}

export default function AdjustableControls({
  statusBarPadding,
  inputFieldOffset,
  chevronRightPadding,
  handlePaddingChange,
  handleInputFieldOffsetChange,
  handleChevronRightPaddingChange,
}: AdjustableControlsProps) {
  return (
    <div className="w-64 p-4 bg-white shadow-lg">
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
    </div>
  );
}
