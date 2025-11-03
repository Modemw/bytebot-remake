import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bytebot",
  description: "Bytebot is the container for desktop agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
