import {ReactNode} from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Colors API Application",
  description: "Welcome to the Colors API Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full lg:h-auto">
      <body className={`h-full ${inter.className}`}>{children}</body>
    </html>
  );
}
