import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VapiWidget } from "@/components/VapiWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YallaTalk - Voice AI Solutions",
  description: "Premium voice AI solutions for modern businesses with YallaTalk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <VapiWidget />
      </body>
    </html>
  );
}
