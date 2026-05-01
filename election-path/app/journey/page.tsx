"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { electionStages } from "@/data/electionStages";
import { useELI18 } from "@/contexts/ELI18Context";

export default function JourneyPage() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const { eli18Mode } = useELI18();

  const selectedStage = electionStages.find((s) => s.id === activeStage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              Interactive Journey
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              The Election Journey
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Click on any stage below to explore what happens, why it matters, and what you should know.
            </p>
            {eli18Mode && (
              <div className="mt-3 inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                🎓 ELI18 Mode: Simplified explanations active
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stage Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {electionStages.map((stage, index) => (
            <motion.button
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() =>
                setActiveStage(activeStage === stage.id ? null : stage.id)
              }
              className={`relative text-left p-5 rounded-2xl border-2 transition-all ${
                activeStage === stage.id
                  ? `${stage.bgColor} ${stage.borderColor} shadow-md`
                  : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                    activeStage === stage.id ? "bg-white shadow-sm" : stage.bgColor
                  }`}
                >
                  {stage.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${stage.color} mb-1 block`}>
                      Stage {index + 1}
                    </span>
                    <span
                      className={`text-lg transition-transform ${
                        activeStage === stage.id ? "rotate-180" : ""
                      }`}
                    >
                      ⌄
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                    {stage.shortDescription}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          {selectedStage && (
            <motion.div
              key={selectedStage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl border-2 ${selectedStage.bgColor} ${selectedStage.borderColor} overflow-hidden`}
            >
              {/* Stage Header */}
              <div className="p-6 border-b border-white/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                    {selectedStage.icon}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${selectedStage.color}`}>
                      Stage {electionStages.findIndex((s) => s.id === selectedStage.id) + 1} of 5
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedStage.title}</h2>
                    <p className="text-gray-600 text-sm mt-0.5">{selectedStage.shortDescription}</p>
                  </div>
                </div>
              </div>

              {/* Detail Content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* What Happens */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">📋</span>
                    <h3 className="font-semibold text-gray-900">What happens</h3>
                  </div>
                  <ul className="space-y-2">
                    {(eli18Mode
                      ? selectedStage.eli18.whatHappens
                      : selectedStage.details.whatHappens
                    ).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why It Matters */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">⭐</span>
                    <h3 className="font-semibold text-gray-900">Why it matters</h3>
                  </div>
                  <ul className="space-y-2">
                    {(eli18Mode
                      ? selectedStage.eli18.whyItMatters
                      : selectedStage.details.whyItMatters
                    ).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-amber-400 mt-0.5 flex-shrink-0">★</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What You Should Know */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">💡</span>
                    <h3 className="font-semibold text-gray-900">What you should know</h3>
                  </div>
                  <ul className="space-y-2">
                    {(eli18Mode
                      ? selectedStage.eli18.whatYouShouldKnow
                      : selectedStage.details.whatYouShouldKnow
                    ).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation between stages */}
              <div className="px-6 pb-6 flex justify-between gap-3">
                {electionStages.findIndex((s) => s.id === selectedStage.id) > 0 && (
                  <button
                    onClick={() => {
                      const idx = electionStages.findIndex((s) => s.id === selectedStage.id);
                      setActiveStage(electionStages[idx - 1].id);
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
                  >
                    ← Previous Stage
                  </button>
                )}
                <div className="flex-1" />
                {electionStages.findIndex((s) => s.id === selectedStage.id) <
                  electionStages.length - 1 && (
                  <button
                    onClick={() => {
                      const idx = electionStages.findIndex((s) => s.id === selectedStage.id);
                      setActiveStage(electionStages[idx + 1].id);
                    }}
                    className="flex items-center gap-2 text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Next Stage →
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!activeStage && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-5xl mb-3">👆</div>
            <p className="text-lg font-medium">Click any stage above to explore details</p>
          </div>
        )}
      </div>
    </div>
  );
}
