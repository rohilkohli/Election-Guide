"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { quizQuestions } from "@/data/quizQuestions";
import { useELI18 } from "@/contexts/ELI18Context";

type QuizState = "intro" | "question" | "result";

const CATEGORY_LABELS: Record<string, string> = {
  registration: "Voter Registration",
  voting: "Voting Process",
  counting: "Vote Counting",
  rules: "Election Rules",
  institutions: "Institutions",
};

const SCORE_TIERS = [
  { min: 9, emoji: "🏆", title: "Election Expert!", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200", message: "Outstanding! You have a thorough understanding of the Indian electoral process. You're ready to be a fully informed voter." },
  { min: 7, emoji: "🎓", title: "Civic Scholar", color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-200", message: "Excellent work! You know the essentials of Indian elections very well. A quick review of the topics you missed will make you a complete expert." },
  { min: 5, emoji: "📚", title: "Good Progress!", color: "text-blue-600", bg: "bg-blue-50 border-blue-200", message: "Good effort! You have a solid foundation. Explore the Journey and Learn sections to fill in the gaps." },
  { min: 3, emoji: "🌱", title: "Learning Voter", color: "text-green-600", bg: "bg-green-50 border-green-200", message: "A great start! Elections can be complex — use the AI Assistant and Quick Learn cards to build your knowledge." },
  { min: 0, emoji: "💡", title: "Just Getting Started", color: "text-orange-600", bg: "bg-orange-50 border-orange-200", message: "No worries — everyone starts somewhere! Begin with the Election Journey page for an easy step-by-step guide." },
];

function getScoreTier(score: number) {
  return SCORE_TIERS.find((t) => score >= t.min)!;
}

export default function QuizPage() {
  const { eli18Mode } = useELI18();
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quizQuestions.length).fill(null)
  );
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quizQuestions[currentIndex];
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === currentQuestion?.correctIndex;

  const score = answers.filter(
    (ans, i) => ans === quizQuestions[i]?.correctIndex
  ).length;

  const handleOptionSelect = useCallback(
    (optionIndex: number) => {
      if (isAnswered) return;
      setSelectedOption(optionIndex);
      setShowExplanation(true);
      const newAnswers = [...answers];
      newAnswers[currentIndex] = optionIndex;
      setAnswers(newAnswers);
    },
    [isAnswered, answers, currentIndex]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizState("result");
    }
  }, [currentIndex]);

  const handleRestart = useCallback(() => {
    setQuizState("intro");
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers(new Array(quizQuestions.length).fill(null));
    setShowExplanation(false);
  }, []);

  const scoreTier = getScoreTier(score);
  const progressPct = ((currentIndex + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-center">
          <span className="inline-block bg-violet-100 text-violet-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
            Knowledge Quiz
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Voter Knowledge Quiz
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Test what you know about Indian elections — {quizQuestions.length} questions covering
            registration, voting, counting, and more.
          </p>
          {eli18Mode && (
            <div className="mt-3 inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
              🎓 ELI18 Mode — simplified explanations active
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <AnimatePresence mode="wait">
          {/* ── Intro Screen ── */}
          {quizState === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center"
            >
              <div className="text-6xl mb-6">🗳️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Ready to test your election knowledge?
              </h2>
              <p className="text-gray-500 mb-6 max-w-lg mx-auto leading-relaxed">
                This quiz covers {quizQuestions.length} multiple-choice questions on voter
                registration, EVMs, the Model Code of Conduct, government formation, and more.
                Each question has an explanation so you learn as you go!
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto">
                <div className="bg-indigo-50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-indigo-700">{quizQuestions.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Questions</div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-green-700">5</div>
                  <div className="text-xs text-gray-500 mt-1">Topics</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-amber-700">∞</div>
                  <div className="text-xs text-gray-500 mt-1">Attempts</div>
                </div>
              </div>
              <button
                onClick={() => setQuizState("question")}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-sm text-base"
              >
                <span>🚀</span> Start the Quiz
              </button>
            </motion.div>
          )}

          {/* ── Question Screen ── */}
          {quizState === "question" && currentQuestion && (
            <motion.div
              key={`q-${currentIndex}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>
                    Question {currentIndex + 1} of {quizQuestions.length}
                  </span>
                  <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    {CATEGORY_LABELS[currentQuestion.category]}
                  </span>
                </div>
                <div
                  className="h-2 bg-gray-200 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={Math.round(progressPct)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Quiz progress: question ${currentIndex + 1} of ${quizQuestions.length}`}
                >
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
                <h2 className="text-lg font-semibold text-gray-900 leading-snug mb-6">
                  {currentQuestion.question}
                </h2>

                <div className="space-y-3" role="radiogroup" aria-label="Answer options">
                  {currentQuestion.options.map((option, i) => {
                    const isSelected = selectedOption === i;
                    const isRight = i === currentQuestion.correctIndex;
                    let optionStyle =
                      "bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50";

                    if (isAnswered) {
                      if (isRight) {
                        optionStyle = "bg-green-50 border-green-400 text-green-800";
                      } else if (isSelected && !isRight) {
                        optionStyle = "bg-red-50 border-red-400 text-red-800";
                      } else {
                        optionStyle = "bg-white border-gray-200 text-gray-400";
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleOptionSelect(i)}
                        disabled={isAnswered}
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={`Option ${String.fromCharCode(65 + i)}: ${option}${
                          isAnswered
                            ? isRight
                              ? " (correct)"
                              : isSelected
                              ? " (incorrect)"
                              : ""
                            : ""
                        }`}
                        className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border-2 transition-all ${optionStyle} disabled:cursor-default`}
                      >
                        <span
                          className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5 ${
                            isAnswered && isRight
                              ? "bg-green-500 border-green-500 text-white"
                              : isAnswered && isSelected && !isRight
                              ? "bg-red-500 border-red-500 text-white"
                              : "border-current"
                          }`}
                        >
                          {isAnswered
                            ? isRight
                              ? "✓"
                              : isSelected
                              ? "✗"
                              : String.fromCharCode(65 + i)
                            : String.fromCharCode(65 + i)}
                        </span>
                        <span className="leading-relaxed text-sm">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`rounded-2xl border p-5 mb-4 ${
                        isCorrect
                          ? "bg-green-50 border-green-200"
                          : "bg-amber-50 border-amber-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">
                          {isCorrect ? "✅" : "💡"}
                        </span>
                        <div>
                          <p
                            className={`font-semibold mb-1 ${
                              isCorrect ? "text-green-800" : "text-amber-800"
                            }`}
                          >
                            {isCorrect ? "Correct!" : "Not quite — here's the explanation:"}
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {eli18Mode
                              ? currentQuestion.eli18Explanation
                              : currentQuestion.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next button */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-end"
                >
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    {currentIndex < quizQuestions.length - 1
                      ? "Next Question →"
                      : "See Results 🏁"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── Results Screen ── */}
          {quizState === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Score card */}
              <div
                className={`rounded-2xl border-2 p-8 text-center mb-6 ${scoreTier.bg}`}
              >
                <div className="text-6xl mb-3">{scoreTier.emoji}</div>
                <h2 className={`text-2xl font-bold mb-1 ${scoreTier.color}`}>
                  {scoreTier.title}
                </h2>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">
                  {score}/{quizQuestions.length}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {Math.round((score / quizQuestions.length) * 100)}% correct
                </p>
                <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                  {scoreTier.message}
                </p>
              </div>

              {/* Per-question review */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your Answers</h3>
                <div className="space-y-3">
                  {quizQuestions.map((q, i) => {
                    const userAnswer = answers[i];
                    const correct = userAnswer === q.correctIndex;
                    return (
                      <div key={q.id} className="flex items-start gap-3 text-sm">
                        <span
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            correct
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {correct ? "✓" : "✗"}
                        </span>
                        <div className="flex-1">
                          <p className="text-gray-700 font-medium leading-snug">{q.question}</p>
                          {!correct && (
                            <p className="text-gray-400 text-xs mt-0.5">
                              Correct: {q.options[q.correctIndex]}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRestart}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  🔄 Retake Quiz
                </button>
                <Link
                  href="/assistant"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-700 font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  💬 Ask the AI Assistant
                </Link>
                <Link
                  href="/learn"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-700 font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  📚 Quick Learn Cards
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
