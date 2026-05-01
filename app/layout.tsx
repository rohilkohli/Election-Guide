import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ELI18Provider } from "@/contexts/ELI18Context";

export const metadata: Metadata = {
  title: "ElectionPath — Understand Elections. Step by Step.",
  description:
    "ElectionPath is an AI-powered civic education assistant that helps you understand the election process, timelines, and steps in a simple, interactive way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <ELI18Provider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ELI18Provider>
        <GoogleAnalytics gaId="G-XYZ1234567" />
      </body>
    </html>
  );
}
