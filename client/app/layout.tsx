import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { Outfit } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Chroma",
  description: "Seamlessly generate color palettes from an image",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`container max-w-4xl mx-auto min-h-screen pt-8 px-8 pb-4 bg-main text-white ${outfit.className}`}
      >
        <Header />
        {children}
        <Toaster />
	<Analytics />
      </body>
    </html>
  );
}
