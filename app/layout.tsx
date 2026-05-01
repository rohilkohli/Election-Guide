import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ELI18Provider } from "@/contexts/ELI18Context";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Load Inter from Google Fonts for optimal performance via next/font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ElectionPath — Understand Elections. Step by Step.",
  description:
    "ElectionPath is an AI-powered civic education assistant that helps you understand the Indian election process, timelines, and steps in a simple, interactive way. Built for first-time voters.",
  keywords: [
    "election guide",
    "India election",
    "how to vote",
    "voter registration",
    "EVM",
    "election commission",
    "civic education",
    "first time voter",
  ],
  openGraph: {
    title: "ElectionPath — Understand Elections. Step by Step.",
    description:
      "AI-powered civic education for Indian voters. Explore the full election journey, ask questions, and learn how democracy works.",
    type: "website",
    locale: "en_IN",
    siteName: "ElectionPath",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";

  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        {/* Skip to main content for keyboard / screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-indigo-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>

        <ELI18Provider>
          <Navbar />
          <main id="main-content" className="flex-1">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
          <Footer />
        </ELI18Provider>

        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
