"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useELI18 } from "@/contexts/ELI18Context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/journey", label: "Journey" },
  { href: "/assistant", label: "AI Assistant" },
  { href: "/timeline", label: "Timeline" },
  { href: "/learn", label: "Learn" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { eli18Mode, toggleEli18Mode } = useELI18();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🗳️</span>
            <span className="text-xl font-bold text-indigo-700 tracking-tight">
              ElectionPath
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ELI18 Toggle + Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleEli18Mode}
              title="Toggle Explain Like I'm 18 mode"
              className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                eli18Mode
                  ? "bg-amber-400 border-amber-500 text-amber-900"
                  : "bg-white border-gray-200 text-gray-600 hover:border-amber-400 hover:text-amber-700"
              }`}
            >
              <span>🎓</span>
              <span>{eli18Mode ? "ELI18: ON" : "ELI18"}</span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 space-y-1">
                <span
                  className={`block h-0.5 bg-gray-600 transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                />
                <span
                  className={`block h-0.5 bg-gray-600 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 bg-gray-600 transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleEli18Mode();
              setMenuOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              eli18Mode
                ? "bg-amber-100 text-amber-800"
                : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
            }`}
          >
            <span>🎓</span>
            <span>
              {eli18Mode ? "ELI18 Mode: ON (tap to turn off)" : "Turn on ELI18 Mode"}
            </span>
          </button>
        </div>
      )}
    </nav>
  );
}
