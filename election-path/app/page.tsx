"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    icon: "🗺️",
    title: "Election Journey",
    description:
      "Walk through 5 key stages of the election process — from registration to government formation.",
    href: "/journey",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: "🤖",
    title: "AI Assistant",
    description:
      "Ask any election question in plain language and get clear, beginner-friendly answers.",
    href: "/assistant",
    color: "bg-indigo-50 border-indigo-100",
    iconBg: "bg-indigo-100",
  },
  {
    icon: "📅",
    title: "Timeline Explorer",
    description:
      "Explore the complete election timeline — from registration opening to results declared.",
    href: "/timeline",
    color: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100",
  },
  {
    icon: "📚",
    title: "Quick Learn & FAQ",
    description:
      "Bite-sized cards covering EVMs, NOTA, constituencies, and answers to common questions.",
    href: "/learn",
    color: "bg-green-50 border-green-100",
    iconBg: "bg-green-100",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Pick a topic",
    description: "Choose to explore the election journey, timeline, or quick-learn cards.",
    icon: "🔍",
  },
  {
    step: "2",
    title: "Explore interactively",
    description: "Click through stages, milestones, and cards at your own pace.",
    icon: "🖱️",
  },
  {
    step: "3",
    title: "Ask questions",
    description: "Use the AI assistant to get instant answers to anything you're unsure about.",
    icon: "💬",
  },
];

const stats = [
  { number: "5", label: "Election Stages" },
  { number: "6", label: "Timeline Milestones" },
  { number: "12+", label: "Quick Learn Cards & FAQs" },
  { number: "100%", label: "Politically Neutral" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6">
              <span>🗳️</span>
              <span>AI-Powered Civic Education</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
              Understand Elections
              <br />
              <span className="text-blue-300">Without the Confusion</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10">
              Explore the full election journey, ask questions, and learn how democracy
              works — step by step. Made for first-time voters and curious citizens.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/journey"
                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-900 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-base"
              >
                <span>🗺️</span> Start Your Journey
              </Link>
              <Link
                href="/assistant"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-base"
              >
                <span>💬</span> Ask a Question
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 60L1440 60L1440 0C1200 40 960 60 720 60C480 60 240 40 0 0L0 60Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <div className="text-3xl font-bold text-indigo-700 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to understand elections
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Four interactive modules that cover the complete election experience — from
              process to participation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={feature.href}
                  className={`group block p-6 rounded-2xl border ${feature.color} hover:shadow-md transition-all`}
                >
                  <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  <div className="mt-4 text-indigo-600 text-sm font-medium flex items-center gap-1">
                    Explore →
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-500">Simple, intuitive, and designed for everyone.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="inline-flex items-center justify-center w-7 h-7 bg-indigo-600 rounded-full text-white text-sm font-bold mb-3">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ELI18 Section */}
      <section className="py-16 bg-amber-50 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-6xl">🎓</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                &ldquo;Explain Like I&apos;m 18&rdquo; Mode
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Toggle ELI18 mode from the navigation bar to simplify all content for first-time
                and young voters. Fewer technical terms, shorter explanations, and relatable examples
                — designed to make democracy accessible for everyone.
              </p>
              <div className="inline-flex items-center gap-2 bg-amber-400 border border-amber-500 text-amber-900 px-4 py-2 rounded-full text-sm font-semibold">
                <span>🎓</span> Use the ELI18 toggle in the navbar
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-700 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to become an informed voter?
            </h2>
            <p className="text-indigo-200 text-lg mb-8">
              Start with the interactive election journey — it takes less than 5 minutes.
            </p>
            <Link
              href="/journey"
              className="inline-flex items-center justify-center gap-2 bg-white text-indigo-900 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-base"
            >
              🗺️ Begin the Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
