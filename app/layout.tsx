import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ELI18Provider } from "@/contexts/ELI18Context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Script from "next/script";

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

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I register to vote?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To register to vote in India, visit voters.eci.gov.in and fill out Form 6. You'll need to provide your name, date of birth, address, and upload a photo and address proof. You can also visit your local Electoral Registration Officer (ERO) office to submit a physical form.",
        },
      },
      {
        "@type": "Question",
        name: "What happens on voting day?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On voting day, polling booths open from 7 AM to 6 PM. Go to your assigned polling booth. Carry a valid photo ID. Officers will verify your name on the electoral roll and mark your finger with indelible ink. You'll receive a ballot slip and be directed to the EVM. Press the button next to your chosen candidate's name and symbol.",
        },
      },
      {
        "@type": "Question",
        name: "What is an EVM?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An EVM (Electronic Voting Machine) is the electronic device used in Indian elections since 2004. It has two parts: a Control Unit operated by the Presiding Officer, and a Balloting Unit that voters press to cast their vote.",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`}>
      <head>
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </head>
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
