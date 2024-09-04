import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NeueMetana } from "../app/utils/customFonts"

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`bg-bg text-black mx-auto max-w-md ${inter.className} ${NeueMetana.variable}`}>{children}</body>
    </html>
  );
}
