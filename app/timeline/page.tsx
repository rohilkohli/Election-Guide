"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { timelineMilestones } from "@/data/timelineMilestones";
import { useELI18 } from "@/contexts/ELI18Context";

export default function TimelinePage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { eli18Mode } = useELI18();

  const active = timelineMilestones.find((m) => m.id === activeId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
            Timeline Explorer
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Election Timeline
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Follow the election roadmap from start to finish. Click any milestone to explore what
            happens at that stage.
          </p>
          {eli18Mode && (
            <div className="mt-3 inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
              🎓 ELI18 Mode active
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Desktop Timeline */}
        <div className="hidden md:block">
          {/* Connector line */}
          <div className="relative">
            <div className="absolute top-10 left-0 right-0 h-1 bg-gray-200 rounded-full" />
            <div className="grid grid-cols-6 gap-0 relative">
              {timelineMilestones.map((milestone, i) => (
                <div key={milestone.id} className="flex flex-col items-center px-2">
                  {/* Node */}
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() =>
                      setActiveId(activeId === milestone.id ? null : milestone.id)
                    }
                    className={`relative z-10 w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center text-2xl transition-all mb-4 ${
                      activeId === milestone.id
                        ? `${milestone.bgColor} ${milestone.borderColor} shadow-lg scale-110`
                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    {milestone.icon}
                    {/* Step number */}
                    <span
                      className={`absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold text-white ${
                        activeId === milestone.id ? "bg-indigo-600" : "bg-gray-400"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </motion.button>

                  {/* Label */}
                  <div className="text-center">
                    <p
                      className={`text-xs font-semibold leading-tight ${
                        activeId === milestone.id ? milestone.color : "text-gray-700"
                      }`}
                    >
                      {milestone.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{milestone.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline (vertical) */}
        <div className="md:hidden space-y-3">
          {timelineMilestones.map((milestone, i) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative pl-12"
            >
              {/* Vertical connector */}
              {i < timelineMilestones.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200" />
              )}
              {/* Node */}
              <div
                className={`absolute left-0 top-0 w-10 h-10 rounded-xl border-2 flex items-center justify-center text-lg ${
                  activeId === milestone.id
                    ? `${milestone.bgColor} ${milestone.borderColor}`
                    : "bg-white border-gray-200"
                }`}
              >
                {milestone.icon}
              </div>

              <button
                onClick={() =>
                  setActiveId(activeId === milestone.id ? null : milestone.id)
                }
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeId === milestone.id
                    ? `${milestone.bgColor} ${milestone.borderColor}`
                    : "bg-white border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`text-xs font-semibold ${milestone.color}`}>
                      Step {i + 1}
                    </p>
                    <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                    <p className="text-xs text-gray-400">{milestone.duration}</p>
                  </div>
                  <span className="text-gray-400">
                    {activeId === milestone.id ? "▲" : "▼"}
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Detail Card */}
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-10 rounded-2xl border-2 ${active.bgColor} ${active.borderColor} p-6`}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
                {active.icon}
              </div>
              <div>
                <p className={`text-sm font-semibold ${active.color}`}>
                  Step {timelineMilestones.findIndex((m) => m.id === active.id) + 1} of 6
                </p>
                <h2 className="text-xl font-bold text-gray-900">{active.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-white px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 font-medium">
                    ⏱ {active.duration}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              {eli18Mode ? active.eli18Description : active.description}
            </p>

            <div className="bg-white rounded-xl p-5 border border-white/50 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>📌</span> Key Details
              </h4>
              <ul className="space-y-2">
                {active.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {!active && (
          <div className="text-center py-12 text-gray-400 hidden md:block">
            <div className="text-5xl mb-3">☝️</div>
            <p className="text-lg font-medium">Click any milestone above to explore details</p>
          </div>
        )}
      </div>
    </div>
  );
}
