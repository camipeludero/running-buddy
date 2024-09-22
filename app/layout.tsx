import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NeueMetana } from "../app/utils/customFonts";

import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
      <body
        className={`bg-bg text-black container py-8 ${inter.variable} ${NeueMetana.variable}`}
      >
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
