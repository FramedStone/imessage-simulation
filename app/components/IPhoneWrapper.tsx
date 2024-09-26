import React from "react";

interface IPhoneWrapperProps {
  children: React.ReactNode;
}

export default function IPhoneWrapper({ children }: IPhoneWrapperProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[393px] h-[852px] bg-white rounded-[55px] overflow-hidden shadow-2xl border-[14px] border-black mx-auto my-8">
        <div className="w-full h-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
