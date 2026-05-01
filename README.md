# ElectionPath

**Understand Elections. Step by Step.**

ElectionPath is a smart, AI-powered civic education assistant that helps citizens — especially first-time voters — understand the Indian election process through interactive modules, an intelligent Q&A assistant, and real-time knowledge quizzes. Built for **HACK2SKILL – PromptWars Virtual (Challenge 2)**.

---

## ✨ Features

| Module | Description |
|---|---|
| 🗺️ **Election Journey** | Interactive 5-stage journey through the complete election lifecycle |
| 🤖 **AI Assistant** | Conversational Q&A powered by **Google Gemini 1.5 Flash** with a knowledge-base fallback |
| 📅 **Timeline Explorer** | Visual 6-milestone timeline from registration to results |
| 📚 **Quick Learn & FAQ** | Bite-sized cards + searchable FAQ for common questions |
| 🧠 **Voter Knowledge Quiz** | 10 interactive MCQ questions with instant feedback and explanations |
| 🔗 **Official Resources** | Voter service links, national helpline, and **Google Maps** embed of the ECI office |
| 🎓 **ELI18 Mode** | "Explain Like I'm 18" toggle that simplifies all content for first-time voters |

---

## 🏗️ Architecture

```
┌─────────────┐    HTTP POST /api/chat
│  React UI   │ ─────────────────────► ┌──────────────────────────────┐
│  (Next.js)  │                        │  Route Handler (Edge-safe)   │
└─────────────┘                        │  • IP-based rate limiting    │
                                       │  • Input sanitisation        │
                                       │  • Prompt-injection guard    │
                                       │  ↓ (GEMINI_API_KEY present?) │
                                       │  YES → Google Gemini 1.5 Flash│
                                       │  NO  → Built-in KB fallback  │
                                       └──────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Production Build

```bash
npm run build
npm start
```

### Tests

```bash
npx jest
# 28 tests across 5 test suites
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
# Google Gemini — enables live AI responses (optional but recommended)
GEMINI_API_KEY=your_gemini_api_key_here

# Google Analytics — enables anonymised usage tracking (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Maps — enables the interactive map on the Resources page (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key_here
```

**Without any keys:** The app works fully using the built-in knowledge base and falls back gracefully on every page.

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout — Navbar, Footer, ELI18 provider, skip link
│   ├── page.tsx                # Landing page with hero, features, stats
│   ├── journey/page.tsx        # Interactive 5-stage Election Journey
│   ├── assistant/page.tsx      # AI Chat Assistant (Gemini + KB fallback)
│   ├── timeline/page.tsx       # 6-milestone visual Timeline Explorer
│   ├── learn/page.tsx          # Quick Learn cards + searchable FAQ
│   ├── quiz/page.tsx           # 10-question Voter Knowledge Quiz
│   ├── resources/page.tsx      # Official links + Google Maps embed
│   └── api/chat/route.ts       # Chat API with rate limiting & sanitisation
├── components/
│   ├── Navbar.tsx              # Responsive navigation + ELI18 toggle
│   └── Footer.tsx              # Footer with links and disclaimer
├── contexts/
│   └── ELI18Context.tsx        # Global ELI18 mode state
├── data/
│   ├── electionStages.ts       # 5 election stages (full + ELI18 content)
│   ├── timelineMilestones.ts   # 6 timeline milestones
│   ├── quickLearnCards.ts      # Quick-learn topic cards
│   ├── faqs.ts                 # FAQ entries
│   ├── knowledgeBase.ts        # AI knowledge base (12 Q&A entries)
│   └── quizQuestions.ts        # 10 quiz questions across 5 categories
├── lib/
│   ├── searchKnowledgeBase.ts  # Keyword-scoring KB search
│   ├── sanitize.ts             # Input sanitisation utility
│   └── rateLimiter.ts          # In-memory IP rate limiter
└── __tests__/
    ├── ELI18Context.test.tsx
    ├── knowledgeBase.test.ts
    ├── quizQuestions.test.ts
    ├── rateLimiter.test.ts
    └── sanitize.test.ts
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| AI | Google Gemini 1.5 Flash (`@google/generative-ai`) |
| Analytics | Google Analytics 4 (`@next/third-parties/google`) |
| Maps | Google Maps Embed (`@next/third-parties/google`) |
| Testing | Jest + React Testing Library |

---

## 🗺️ Pages & Routes

| Route | Page |
|---|---|
| `/` | Landing page |
| `/journey` | Interactive 5-stage election journey |
| `/assistant` | AI election assistant chatbot |
| `/timeline` | 6-milestone visual timeline explorer |
| `/learn` | Quick learn cards + searchable FAQ |
| `/quiz` | 10-question voter knowledge quiz |
| `/resources` | Voter service links + Google Maps |

---

## 🔒 Security

- **Rate limiting:** 20 requests per IP per 60-second window on the `/api/chat` endpoint
- **Input sanitisation:** Control characters, zero-width characters, and excessive whitespace are stripped before any text reaches the LLM
- **Prompt injection mitigation:** System instructions are passed in a separate `systemInstruction` field (not concatenated with user input), so adversarial user messages cannot override the assistant's role
- **Security headers:** `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`, `Referrer-Policy`, `Permissions-Policy`, and `Content-Security-Policy`

---

## ♿ Accessibility

- **Skip-to-main-content** link for keyboard and screen-reader users
- `aria-current="page"` on active nav links
- `aria-pressed` and `aria-label` on all toggle buttons
- `role="progressbar"` with `aria-valuenow/min/max` on the quiz progress bar
- `role="radiogroup"` and `aria-checked` on quiz answer options
- Descriptive `aria-label` on all external links
- Semantic HTML (`<nav>`, `<main>`, `<footer>`, `<section>` with `aria-labelledby`)

---

## 📚 Chosen Vertical

**Civic Education / Voter Empowerment**

The solution addresses the challenge of election literacy for India's massive, diverse electorate — especially first-time voters. India has 18-year-olds becoming eligible voters every day, many of whom find the official ECI documentation complex and intimidating.

### Approach & Logic

1. **Multi-modal learning** — Different people learn differently. ElectionPath offers a visual journey, a chat assistant, a timeline, cards, and a quiz to cater to varied learning styles.
2. **Dual complexity modes** — ELI18 Mode strips away legal and bureaucratic language and replaces it with relatable, everyday language — the same content at two different reading levels.
3. **AI with guardrails** — The Gemini assistant uses a strict `systemInstruction` (separate from user input) to stay politically neutral and on-topic. When the API is unavailable, a keyword-scored knowledge base provides instant offline answers.
4. **Immediate feedback loops** — The quiz gives per-question explanations in real time, turning wrong answers into learning moments rather than just mistakes.
5. **Graceful degradation** — Every feature works without any API key. Google services enhance the experience progressively; they are never a single point of failure.

---

## 🌐 Google Services Used

| Service | Integration |
|---|---|
| **Google Gemini 1.5 Flash** | Powers the AI assistant (`/api/chat/route.ts`) |
| **Google Analytics 4** | Anonymised usage tracking via `@next/third-parties/google` |
| **Google Maps Embed** | Shows the ECI office location on the Resources page |

---

## 🔒 Content Policy

- All content is **politically neutral**
- No party bias or political persuasion
- Focused on **process education only**
- Based on the Indian electoral system as governed by the Election Commission of India

---

## 🏆 Hackathon

Built for **HACK2SKILL – PromptWars Virtual (Challenge 2)**

Goal: Make election literacy accessible for everyone, especially first-time voters, by turning complex election procedures into an intuitive guided experience powered by Google AI.

