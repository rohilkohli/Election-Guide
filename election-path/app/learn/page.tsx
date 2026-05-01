"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quickLearnCards } from "@/data/quickLearnCards";
import { faqs } from "@/data/faqs";
import { useELI18 } from "@/contexts/ELI18Context";

export default function LearnPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { eli18Mode } = useELI18();

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
            Learn
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Quick Learn & FAQ
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Bite-sized cards for quick learning and answers to the most common election questions.
          </p>
          {eli18Mode && (
            <div className="mt-3 inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
              🎓 ELI18 Mode active — simplified explanations
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Quick Learn Cards Section */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-lg">
              ⚡
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Learn Cards</h2>
          </div>
          <p className="text-gray-500 mb-6">
            Click any card to read a full explanation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLearnCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <button
                  onClick={() =>
                    setExpandedCard(expandedCard === card.id ? null : card.id)
                  }
                  className={`w-full text-left rounded-2xl border-2 p-5 transition-all ${
                    expandedCard === card.id
                      ? "bg-indigo-50 border-indigo-200 shadow-md"
                      : "bg-white border-gray-100 hover:border-indigo-100 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{card.icon}</span>
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                        {card.title}
                      </h3>
                    </div>
                    <span
                      className={`text-gray-400 text-lg transition-transform flex-shrink-0 ${
                        expandedCard === card.id ? "rotate-180" : ""
                      }`}
                    >
                      ⌄
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{card.summary}</p>

                  <AnimatePresence>
                    {expandedCard === card.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-indigo-100">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {eli18Mode
                              ? card.eli18Explanation
                              : card.fullExplanation}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
              ❓
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-2">🤷</div>
              <p>No questions match your search. Try different keywords.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-xl border-2 overflow-hidden transition-all ${
                    expandedFaq === faq.id
                      ? "bg-blue-50 border-blue-200"
                      : "bg-white border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                    }
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-blue-500 text-lg flex-shrink-0 mt-0.5">Q</span>
                      <span className="font-medium text-gray-900 text-sm">
                        {faq.question}
                      </span>
                    </div>
                    <span
                      className={`text-gray-400 flex-shrink-0 transition-transform ${
                        expandedFaq === faq.id ? "rotate-180" : ""
                      }`}
                    >
                      ⌄
                    </span>
                  </button>

                  <AnimatePresence>
                    {expandedFaq === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <div className="pt-3 border-t border-blue-100">
                            <div className="flex items-start gap-3">
                              <span className="text-green-500 text-lg flex-shrink-0 mt-0.5">A</span>
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {eli18Mode ? faq.eli18Answer : faq.answer}
                              </p>
                            </div>
                          </div>
                          <span className="mt-3 inline-block text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                            {faq.category}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
