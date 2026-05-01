import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🗳️</span>
              <span className="text-lg font-bold text-indigo-700">ElectionPath</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Understand Elections. Step by Step.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Built for HACK2SKILL – PromptWars Virtual (Challenge 2)
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Explore</h3>
            <ul className="space-y-2">
              {[
                { href: "/journey", label: "Election Journey" },
                { href: "/assistant", label: "AI Assistant" },
                { href: "/timeline", label: "Timeline Explorer" },
                { href: "/learn", label: "Quick Learn & FAQ" },
                { href: "/quiz", label: "Voter Quiz" },
                { href: "/resources", label: "Official Resources" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">About</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              ElectionPath is an educational platform dedicated to civic literacy.
              All content is politically neutral and focuses on election process education only.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Information based on the Indian electoral system as governed by the
              Election Commission of India.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-400">
            © 2025 ElectionPath. For educational purposes only.
          </p>
          <p className="text-xs text-gray-400">
            Politically neutral · Process education only
          </p>
        </div>
      </div>
    </footer>
  );
}
