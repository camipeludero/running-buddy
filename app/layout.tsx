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
        className={`min-h-screen transition-colors duration-300 ${inter.variable} ${NeueMetana.variable}`}
        style={{ 
          background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)',
          minHeight: '100vh'
        }}
      >
        <div className="min-h-screen">
          <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8 max-w-6xl">
            <ToastContainer 
              theme="dark"
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
