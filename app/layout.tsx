import React from "react";
import "./globals.css";

export const metadata = {
  title: "iMessage Simulator",
  description: "A simulator for iMessage interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
