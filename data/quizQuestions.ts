export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  eli18Explanation: string;
  category: "registration" | "voting" | "counting" | "rules" | "institutions";
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is the minimum age to register as a voter in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correctIndex: 1,
    explanation:
      "Any Indian citizen who is 18 years or older on the qualifying date (1st January of the year of revision) is eligible to register on the Electoral Roll.",
    eli18Explanation:
      "You need to be 18 years old! If you turn 18 before 1st January of the election year, you can register to vote.",
    category: "registration",
  },
  {
    id: "q2",
    question: "What does EVM stand for?",
    options: [
      "Electoral Verification Machine",
      "Electronic Voting Machine",
      "Election Validity Monitor",
      "Electronic Verification Module",
    ],
    correctIndex: 1,
    explanation:
      "EVM stands for Electronic Voting Machine. It has been used in all Indian elections since 2004 and consists of a Control Unit and a Balloting Unit.",
    eli18Explanation:
      "EVM = Electronic Voting Machine. It's the device where you press a button to cast your vote. No paper, no pen — just a button!",
    category: "voting",
  },
  {
    id: "q3",
    question: "What is the purpose of the VVPAT machine?",
    options: [
      "To count votes automatically",
      "To verify voter identity",
      "To show a paper slip confirming the voter's choice for 7 seconds",
      "To store voter registration data",
    ],
    correctIndex: 2,
    explanation:
      "VVPAT (Voter Verifiable Paper Audit Trail) shows a printed paper slip displaying the candidate's name and symbol for 7 seconds after a vote is cast, allowing the voter to verify their vote was recorded correctly.",
    eli18Explanation:
      "After you press the EVM button, the VVPAT shows you a paper slip for 7 seconds that says 'Yes, you voted for this candidate.' It's a receipt to double-check your vote!",
    category: "voting",
  },
  {
    id: "q4",
    question:
      "How many seats must a party or coalition win in the Lok Sabha to form a majority government?",
    options: ["200 seats", "250 seats", "272 seats", "300 seats"],
    correctIndex: 2,
    explanation:
      "The Lok Sabha has 543 elected seats. A simple majority requires winning more than half — at least 272 seats — to form the government.",
    eli18Explanation:
      "272 out of 543 seats! Think of it as needing more than half of 543. The party that reaches 272 first gets to form the government and pick the Prime Minister.",
    category: "counting",
  },
  {
    id: "q5",
    question: "When does the Model Code of Conduct (MCC) come into effect?",
    options: [
      "One week before voting day",
      "The moment election dates are announced",
      "After the nomination process is complete",
      "On the first day of the campaign period",
    ],
    correctIndex: 1,
    explanation:
      "The Model Code of Conduct comes into effect immediately when the Election Commission announces election dates. It remains in force until the election process is fully complete.",
    eli18Explanation:
      "The MCC kicks in the MOMENT the Election Commission announces the election dates — not before, not after. Politicians must follow the rules from that exact announcement!",
    category: "rules",
  },
  {
    id: "q6",
    question: "Which body is responsible for conducting elections in India?",
    options: [
      "The Supreme Court of India",
      "The Ministry of Home Affairs",
      "The Election Commission of India",
      "The Parliament of India",
    ],
    correctIndex: 2,
    explanation:
      "The Election Commission of India (ECI), established in 1950, is an autonomous constitutional authority that administers all elections to Parliament and State Legislatures.",
    eli18Explanation:
      "The Election Commission of India (ECI) runs everything — it's independent of the government, like a referee who can't be fired by the players. It makes sure elections are free and fair.",
    category: "institutions",
  },
  {
    id: "q7",
    question: "What is NOTA?",
    options: [
      "None Of The Alternatives",
      "None Of The Above",
      "No Option To Abstain",
      "National Options To Abstain",
    ],
    correctIndex: 1,
    explanation:
      "NOTA stands for 'None Of The Above.' It is available as the last option on the EVM, introduced by the Supreme Court in 2013. It lets voters formally reject all candidates without abstaining.",
    eli18Explanation:
      "NOTA = None Of The Above. It's the 'I don't like any of these candidates' button on the voting machine. Your vote still counts, and a high NOTA score tells parties to field better candidates next time!",
    category: "voting",
  },
  {
    id: "q8",
    question: "What is the 'silence period' in Indian elections?",
    options: [
      "A day of silence observed by voters on election day",
      "The 48-hour period before voting during which campaigning is banned",
      "The period after results when no statements can be made",
      "A quiet period at polling booths",
    ],
    correctIndex: 1,
    explanation:
      "The silence period is the 48 hours before polling begins, during which all election campaigning — rallies, advertisements, door-to-door visits — is completely prohibited. This gives voters time to reflect without last-minute influence.",
    eli18Explanation:
      "48 hours before you vote, ALL political campaigning must stop completely — no rallies, no ads, no WhatsApp forwards. It's your quiet time to think clearly before making your choice!",
    category: "rules",
  },
  {
    id: "q9",
    question: "What official document serves as the primary proof of voter registration?",
    options: [
      "Aadhaar Card",
      "EPIC (Elector's Photo Identity Card)",
      "PAN Card",
      "Passport",
    ],
    correctIndex: 1,
    explanation:
      "The EPIC (Elector's Photo Identity Card), commonly called the Voter ID, is the official document issued by the Election Commission that proves voter registration. However, other government-issued photo IDs are also accepted at polling booths.",
    eli18Explanation:
      "Your Voter ID (called EPIC) is the official proof you're registered to vote. But if you lose it, don't panic — you can also use Aadhaar, PAN, passport, or even a student ID to vote!",
    category: "registration",
  },
  {
    id: "q10",
    question: "How many Lok Sabha constituencies does India have?",
    options: ["450", "500", "543", "600"],
    correctIndex: 2,
    explanation:
      "India has 543 Lok Sabha constituencies. Each constituency elects one Member of Parliament (MP). Constituency boundaries are determined by the Delimitation Commission to ensure roughly equal populations.",
    eli18Explanation:
      "India is divided into 543 zones (constituencies) for national elections. Each zone votes for ONE person to represent them in Parliament. Your zone depends on where you're registered to vote!",
    category: "institutions",
  },
];
