import { GoogleMapsEmbed } from "@next/third-parties/google";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources — ElectionPath",
  description:
    "Official election resources, helplines, and voter services for Indian citizens. Find the Election Commission of India office and access key voter tools.",
};

const officialLinks = [
  {
    icon: "🗳️",
    title: "Voter Registration",
    description: "Register to vote, update your details, or check your name on the electoral roll.",
    url: "https://voters.eci.gov.in",
    label: "voters.eci.gov.in",
  },
  {
    icon: "📋",
    title: "Election Commission of India",
    description: "Official website of the ECI — election schedules, forms, and voter education.",
    url: "https://eci.gov.in",
    label: "eci.gov.in",
  },
  {
    icon: "📱",
    title: "Voter Helpline — 1950",
    description: "Call the national voter helpline for assistance with registration, booth location, and grievances.",
    url: "tel:1950",
    label: "Dial 1950 (toll-free)",
  },
  {
    icon: "📲",
    title: "Voter Helpline App",
    description: "Download the ECI Voter Helpline app to access all voter services from your smartphone.",
    url: "https://play.google.com/store/apps/details?id=com.eci.citizen",
    label: "Download on Google Play",
  },
  {
    icon: "🔍",
    title: "Know Your Polling Booth",
    description: "Find your assigned polling station and check your voter details before election day.",
    url: "https://electoralsearch.eci.gov.in",
    label: "electoralsearch.eci.gov.in",
  },
  {
    icon: "📄",
    title: "Download e-EPIC",
    description: "Download a digital copy of your Voter ID card (e-EPIC) in PDF format.",
    url: "https://voters.eci.gov.in/download-eepic",
    label: "voters.eci.gov.in",
  },
];

export default function ResourcesPage() {
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <span className="inline-block bg-teal-100 text-teal-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
            Official Resources
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Voter Resources &amp; Links
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Everything you need to register, verify, and participate in Indian elections —
            all in one place.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Official Links Grid */}
        <section aria-labelledby="official-links-heading" className="mb-14">
          <h2
            id="official-links-heading"
            className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-lg">
              🔗
            </span>
            Official Voter Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {officialLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.title} — opens in a new tab`}
                className="group block bg-white rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-md p-5 transition-all"
              >
                <div className="text-2xl mb-3">{link.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  {link.description}
                </p>
                <span className="text-xs text-teal-600 font-medium">{link.label} ↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* Election Commission of India — Location */}
        <section aria-labelledby="map-heading" className="mb-14">
          <h2
            id="map-heading"
            className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
              📍
            </span>
            Election Commission of India
          </h2>
          <p className="text-gray-500 mb-6">
            Nirvachan Sadan, Ashoka Road, New Delhi — 110001
          </p>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            {mapsApiKey ? (
              <GoogleMapsEmbed
                apiKey={mapsApiKey}
                height={400}
                width="100%"
                mode="place"
                q="Election+Commission+of+India,+Nirvachan+Sadan,+New+Delhi"
                zoom="15"
                style="border-radius:0"
              />
            ) : (
              /* Graceful no-key fallback — plain iframe embed (no key required) */
              <iframe
                title="Election Commission of India — Location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1!2d77.2095!3d28.6182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd4b7f5b53bf%3A0x3e93e7c54b5a2e4c!2sElection%20Commission%20of%20India!5e0!3m2!1sen!2sin!4v1714480000000"
                width="100%"
                height="400"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="border-0 block"
              />
            )}
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Map powered by{" "}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600"
            >
              Google Maps
            </a>
          </p>
        </section>

        {/* Helpline box */}
        <section
          aria-labelledby="helpline-heading"
          className="bg-indigo-700 text-white rounded-2xl p-8 text-center"
        >
          <div className="text-5xl mb-4">📞</div>
          <h2 id="helpline-heading" className="text-2xl font-bold mb-2">
            Voter Helpline: <span className="text-blue-200">1950</span>
          </h2>
          <p className="text-indigo-200 mb-6 max-w-lg mx-auto">
            Available in multiple languages. Get help with voter registration, finding your
            polling booth, or lodging complaints about election violations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/assistant"
              className="inline-flex items-center justify-center gap-2 bg-white text-indigo-900 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              💬 Ask ElectionPath AI
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
            >
              📚 Quick Learn Cards
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
