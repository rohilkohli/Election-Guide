# ElectionPath

**Understand Elections. Step by Step.**

ElectionPath is an AI-powered civic education assistant that helps users understand the election process, timelines, and steps in a simple, interactive, and easy-to-follow way. Built for **HACK2SKILL – PromptWars Virtual (Challenge 2)**.

---

## ✨ Features

| Module | Description |
|---|---|
| 🗺️ **Election Journey** | Interactive 5-stage journey through the complete election lifecycle |
| 🤖 **AI Assistant** | Conversational Q&A with mock knowledge base + Gemini API integration ready |
| 📅 **Timeline Explorer** | Visual 6-milestone timeline from registration to results |
| 📚 **Quick Learn & FAQ** | Bite-sized cards + searchable FAQ for common questions |
| 🎓 **ELI18 Mode** | "Explain Like I'm 18" toggle that simplifies all content for first-time voters |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
cd election-path
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

---

## 🔑 Environment Variables

Create a `.env.local` file in the `election-path/` directory:

```env
# Optional: Enable Gemini AI responses (currently uses mock knowledge base fallback)
GEMINI_API_KEY=your_gemini_api_key_here
```

**Without `GEMINI_API_KEY`:** The app uses a built-in mock knowledge base to answer questions — no API key required for the demo.

**With `GEMINI_API_KEY`:** Uncomment the Gemini integration block in `app/api/chat/route.ts` to enable live AI responses.

---

## 📁 Project Structure

```
election-path/
├── app/
│   ├── layout.tsx           # Root layout with Navbar, Footer, ELI18 provider
│   ├── page.tsx             # Landing page
│   ├── journey/
│   │   └── page.tsx         # Interactive Election Journey (5 stages)
│   ├── assistant/
│   │   └── page.tsx         # AI Chat Assistant
│   ├── timeline/
│   │   └── page.tsx         # Timeline Explorer (6 milestones)
│   ├── learn/
│   │   └── page.tsx         # Quick Learn Cards + FAQ
│   └── api/
│       └── chat/
│           └── route.ts     # Chat API (mock KB + Gemini placeholder)
├── components/
│   ├── Navbar.tsx           # Responsive navigation with ELI18 toggle
│   └── Footer.tsx           # Footer with links
├── contexts/
│   └── ELI18Context.tsx     # Global ELI18 mode state
├── data/
│   ├── electionStages.ts    # 5 election stages with full + simplified content
│   ├── timelineMilestones.ts # 6 timeline milestones
│   ├── quickLearnCards.ts   # 6 quick-learn cards (EVM, NOTA, etc.)
│   ├── faqs.ts              # 8 FAQ entries
│   └── knowledgeBase.ts     # Mock AI knowledge base (12 Q&A entries)
└── README.md
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Emoji-based (no external icon library required)
- **AI Integration:** Mock knowledge base + Gemini API placeholder

---

## 🗺️ Pages & Routes

| Route | Page |
|---|---|
| `/` | Landing page with hero, features, how-it-works |
| `/journey` | Interactive 5-stage election journey |
| `/assistant` | AI election assistant chatbot |
| `/timeline` | 6-milestone visual timeline explorer |
| `/learn` | Quick learn cards + searchable FAQ |

---

## 🔒 Content Policy

- All content is **politically neutral**
- No party bias or political persuasion
- Focused on **process education only**
- Based on the Indian electoral system as governed by the Election Commission of India

---

## 🏆 Hackathon

Built for **HACK2SKILL – PromptWars Virtual (Challenge 2)**

Goal: Make election literacy accessible for everyone, especially first-time voters, by turning complex election procedures into an intuitive guided experience.
