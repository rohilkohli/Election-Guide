# 🗳️ ElectionPath — Understand Elections. Step by Step.

> **HACK2SKILL – PromptWars Virtual (Challenge 2)**  
> An AI-powered civic education assistant built to make Indian democracy accessible to every citizen.

🌐 **Live Demo:** [https://election-guide-196220787717.us-central1.run.app](https://election-guide-196220787717.us-central1.run.app)

---

## 🎯 Chosen Vertical

**Civic Education Assistant** — ElectionPath acts as a knowledgeable, politically neutral civic guide that helps first-time voters and curious citizens understand the Indian electoral system through interactive exploration and real-time AI conversation.

---

## 🧠 Approach & Logic

ElectionPath uses a **two-tier AI response architecture**:

### Tier 1: Google Gemini 1.5 Flash (Primary)
- Powered by the official `@google/generative-ai` SDK
- Uses `gemini-1.5-flash` — the most efficient model for conversational Q&A
- Constrained by a carefully crafted **system instruction** that enforces:
  - Political neutrality at all times
  - Exclusive focus on Indian electoral processes
  - ELI18 mode: simplified language for first-time voters aged 18
- Gemini safety settings block harmful, harassing, or dangerous content at the medium-and-above threshold

### Tier 2: Local Knowledge Base Fallback
- A hand-curated knowledge base of 12 civic Q&A entries covering the most common election questions
- Uses a **keyword-scoring algorithm** (`lib/searchKnowledgeBase.ts`) to match user queries to the best entry
- Automatically activates when the API key is unavailable or Gemini returns an error
- Ensures **zero-downtime** user experience regardless of API availability

### ELI18 Mode ("Explain Like I'm 18")
- A global context toggle that simplifies **all** content across the entire application
- Both the Gemini system prompt and the local knowledge base respond with simplified language when activated
- Designed specifically for first-time voters who may be unfamiliar with civic terminology

---

## 🌟 Key Features

| Module | Description |
|---|---|
| 🗺️ **Election Journey** | Interactive 5-stage walk-through of the complete election lifecycle |
| 🤖 **AI Assistant** | Conversational Q&A with Gemini 1.5 Flash + local knowledge base fallback |
| 📅 **Timeline Explorer** | Visual 6-milestone timeline from registration to results |
| 📚 **Quick Learn & FAQ** | Bite-sized cards + searchable FAQ for common questions |
| 🎓 **ELI18 Mode** | "Explain Like I'm 18" toggle that simplifies all content site-wide |

---

## 🛡️ Evaluation Focus Areas

### ✅ Code Quality
- Clean, modular architecture with separation of concerns (`app/`, `components/`, `lib/`, `data/`, `types/`)
- Centralized TypeScript types in `types/index.ts` — used across the entire codebase
- Comprehensive JSDoc documentation on all public functions and components
- `ErrorBoundary` component to gracefully handle runtime errors
- `app/loading.tsx` for branded loading states across all route transitions
- Passes `npm run lint` with **zero errors or warnings**

### 🔒 Security
- API route validates and sanitizes all incoming request bodies
- **Message length capped** at 500 characters to prevent abuse
- Gemini `safetySettings` block harmful content at `BLOCK_MEDIUM_AND_ABOVE`
- Strict HTTP security headers applied to **every response** via `next.config.ts`:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY` (clickjacking protection)
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Strict-Transport-Security` with preload (HSTS)
- `X-Powered-By` header suppressed to reduce attack surface
- `.env.local` is excluded from version control via `.gitignore`

### ⚡ Efficiency
- **Next.js 16** with App Router for automatic code-splitting and streaming
- `output: "standalone"` for minimal Docker container size in production
- Google Fonts (`Inter`) loaded via `next/font` — zero layout shift, no external round-trips
- `gemini-1.5-flash`: Google's fastest and most token-efficient conversational model
- Immediate knowledge base fallback eliminates user-facing loading failures
- `poweredByHeader: false` reduces unnecessary HTTP overhead

### 🧪 Testing
- **Jest + React Testing Library** configured with `jest.config.ts` and `jest.setup.ts`
- `__tests__/ELI18Context.test.tsx`: Tests that the global toggle initializes correctly and flips state accurately
- `__tests__/knowledgeBase.test.ts`: Tests the keyword search logic for all four code paths (match standard, match ELI18, fallback standard, fallback ELI18)
- Run tests: `npm run test`

### ♿ Accessibility
- **Skip to main content** link for keyboard users (visible on focus)
- `aria-current="page"` on active navigation links (desktop and mobile)
- `aria-pressed` + `aria-label` on the ELI18 toggle button for screen reader state
- `aria-expanded` + `aria-controls` on the mobile hamburger button
- `role="log"` + `aria-live="polite"` on the AI chat message container — screen readers announce new messages automatically
- `role="alert"` on the `ErrorBoundary` fallback UI
- `role="status"` + `aria-label` on the loading skeleton
- `aria-hidden="true"` on decorative hamburger icon lines
- Semantic HTML throughout: `<nav>`, `<main>`, `<section>`, `<h1>`–`<h3>` hierarchy

### 🌐 Google Services
- **Gemini 1.5 Flash** via `@google/generative-ai` SDK — primary intelligence engine
- **Google Analytics** via `@next/third-parties/google` `<GoogleAnalytics />` component in root layout
- **Google Cloud Run** — production deployment target (containerized via Dockerfile)
- **Google Cloud Build** — automated container build pipeline
- **Artifact Registry** — Docker image storage in `us-central1`

---

## 🏗️ Architecture

```
election-path/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, GA, error boundary
│   ├── loading.tsx         # Branded loading skeleton
│   ├── page.tsx            # Landing page with hero, stats, features
│   ├── journey/page.tsx    # Interactive 5-stage election journey
│   ├── assistant/page.tsx  # AI chat assistant
│   ├── timeline/page.tsx   # 6-milestone visual timeline
│   ├── learn/page.tsx      # Quick-learn cards + searchable FAQ
│   └── api/chat/route.ts   # POST /api/chat — Gemini + KB fallback
├── components/
│   ├── Navbar.tsx          # Responsive nav with ELI18 toggle + full ARIA
│   ├── Footer.tsx          # Footer with links
│   └── ErrorBoundary.tsx   # React Error Boundary with recovery UI
├── contexts/
│   └── ELI18Context.tsx    # Global ELI18 mode state (React Context)
├── data/
│   ├── electionStages.ts   # 5 election stages (full + ELI18 content)
│   ├── timelineMilestones.ts
│   ├── quickLearnCards.ts
│   ├── faqs.ts
│   └── knowledgeBase.ts   # 12 curated civic Q&A entries
├── lib/
│   └── searchKnowledgeBase.ts  # Keyword-scoring search algorithm (documented)
├── types/
│   └── index.ts            # Shared TypeScript interfaces
├── __tests__/
│   ├── ELI18Context.test.tsx
│   └── knowledgeBase.test.ts
├── Dockerfile              # Multi-stage Node 20 Alpine build
├── .dockerignore
└── next.config.ts          # Security headers + standalone output
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20.9.0
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Testing

```bash
npm run test
```

### Lint

```bash
npm run lint
```

### Production Build

```bash
npm run build
npm start
```

---

## 🔑 Environment Variables

Create a `.env.local` file:

```env
# Required for live Gemini AI responses
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Google Analytics Measurement ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

> **Without `GEMINI_API_KEY`:** The app uses the built-in knowledge base — no API key needed for demos.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| AI | Google Gemini 1.5 Flash (`@google/generative-ai`) |
| Analytics | Google Analytics (`@next/third-parties/google`) |
| Testing | Jest + React Testing Library |
| Deployment | Google Cloud Run (Dockerfile) |

---

## 📋 Assumptions

1. The application is scoped to the **Indian electoral system** as governed by the Election Commission of India.
2. All content is **politically neutral** — no party bias or candidate endorsements.
3. The knowledge base serves as a curated offline fallback, not an exhaustive legal reference.
4. ELI18 mode is a UX simplification layer — both modes contain the same factually accurate information.

---

## 🏆 Built For

**HACK2SKILL – PromptWars Virtual (Challenge 2)**

*Goal: Make election literacy accessible for everyone, especially first-time voters, by turning complex election procedures into an intuitive guided experience powered by Google AI.*
