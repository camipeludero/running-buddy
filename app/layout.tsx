import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NeueMetana } from "../app/utils/customFonts"

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Running Buddy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-bg text-black container ${inter.variable} ${NeueMetana.variable}`}>{children}</body>
    </html>
  );
}
