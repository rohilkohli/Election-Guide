export interface KnowledgeEntry {
  keywords: string[];
  question: string;
  answer: string;
  eli18Answer: string;
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ["register", "registration", "how to register", "sign up", "enroll", "voter list", "electoral roll"],
    question: "How do I register to vote?",
    answer:
      "To register to vote in India, visit voters.eci.gov.in and fill out Form 6. You'll need to provide your name, date of birth, address, and upload a photo and address proof. You can also visit your local Electoral Registration Officer (ERO) office to submit a physical form. After submission, your application is verified and if approved, your name is added to the Electoral Roll and you'll receive a Voter ID card. The deadline for registration is typically 1–2 months before election dates are announced.",
    eli18Answer:
      "Registering to vote is easy! Go to voters.eci.gov.in, fill in your details (name, age, address), upload a photo and any address proof (like an Aadhaar or utility bill), and submit. It takes about 10 minutes. You'll get a Voter ID card after verification!",
  },
  {
    keywords: ["voting day", "vote", "how to vote", "polling booth", "cast vote", "vote process", "election day"],
    question: "What happens on voting day?",
    answer:
      "On voting day, polling booths open from 7 AM to 6 PM. Go to your assigned polling booth (find it on voters.eci.gov.in). Carry a valid photo ID. Officers will verify your name on the electoral roll and mark your finger with indelible ink. You'll receive a ballot slip and be directed to the EVM. Press the button next to your chosen candidate's name and symbol. A VVPAT paper slip will briefly display your choice for verification. The entire process takes about 5 minutes.",
    eli18Answer:
      "On voting day: Go to your assigned polling booth. Show your ID. They'll ink your finger so you can't vote twice. Walk to the voting machine (EVM) and press the button for the candidate you choose. A paper slip shows for 7 seconds to confirm. Done! The whole thing takes 5 minutes.",
  },
  {
    keywords: ["evm", "electronic voting machine", "voting machine", "how evm works"],
    question: "What is an EVM?",
    answer:
      "An EVM (Electronic Voting Machine) is the electronic device used in Indian elections since 2004. It has two parts: a Control Unit operated by the Presiding Officer, and a Balloting Unit that voters press to cast their vote. EVMs are standalone devices with no internet or wireless connectivity, making remote manipulation impossible. They use one-time programmable chips. Each candidate's name, symbol, and party affiliation is listed on the ballot unit. Press the blue button next to your choice to vote. A VVPAT (Voter Verifiable Paper Audit Trail) machine connected to the EVM shows a paper slip confirming your vote for 7 seconds.",
    eli18Answer:
      "An EVM is basically a secure voting tablet! It has buttons for each candidate. Press the button next to your candidate's name. It records your vote electronically and shows you a paper slip to confirm. No internet connection means no one can hack it remotely!",
  },
  {
    keywords: ["count", "counting", "how counted", "vote counting", "result counting", "tally"],
    question: "How are votes counted?",
    answer:
      "Vote counting happens at designated counting centers on a specific date after voting. EVMs are transported under security escort from storage. Counting agents from each candidate verify the process. Votes are tallied in rounds — each round covers EVMs from specific polling booths. The count for each candidate is announced after each round and continuously updated. After all booths in a constituency are counted, the candidate with the highest total votes is declared the winner by the Returning Officer. VVPAT slips from 5 randomly selected EVMs per constituency are also manually counted to verify accuracy.",
    eli18Answer:
      "On counting day, officials open the voting machines one by one and read the vote totals. Representatives from every candidate watch to make sure it's fair. Results come out in rounds, like a scoreboard updating throughout the day. The candidate with the most votes at the end wins!",
  },
  {
    keywords: ["model code of conduct", "mcc", "code of conduct", "election rules", "campaign rules"],
    question: "What is the Model Code of Conduct?",
    answer:
      "The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission of India that regulates the behavior of political parties, candidates, and the government during elections. It comes into effect the moment election dates are announced and remains active until the election process is complete. Key provisions include: no use of government resources for campaigning, no new policy announcements by the ruling government, no hate speech or communal appeals, prohibition on vote buying, regulation of election rallies and meetings, and equal treatment of all candidates by government machinery.",
    eli18Answer:
      "The Model Code of Conduct is a rulebook for politicians during elections. Once elections are announced, politicians can't: use government money for campaigns, make big new government promises, offer gifts for votes, or say things that divide people by religion/caste. It's like the 'fair play' rulebook for elections.",
  },
  {
    keywords: ["contest", "candidate", "who can stand", "eligibility candidate", "run for election", "contestant"],
    question: "Who can contest elections?",
    answer:
      "To contest Lok Sabha (national) elections, you must be: a citizen of India, at least 25 years old, on the electoral roll of any constituency in India, and not hold any office of profit under the government. You cannot contest if you have been declared of unsound mind by a court, are an undischarged insolvent, or have been convicted with 2+ year sentences in certain offenses. To file nomination, you need the signatures of 10 voters from your constituency, a security deposit of ₹25,000 (₹12,500 for SC/ST), and a disclosure affidavit of assets and criminal records.",
    eli18Answer:
      "To run for Parliament: You must be Indian, at least 25 years old, and a registered voter. You pay a deposit (₹25,000), get 10 voters to support your nomination, and declare your assets and any court cases. If you're a criminal convicted of serious crimes, you're disqualified.",
  },
  {
    keywords: ["nota", "none of the above", "reject all", "nota option"],
    question: "What is NOTA?",
    answer:
      "NOTA (None Of The Above) is a ballot option available on the EVM since 2013, introduced by a Supreme Court order. It allows voters to formally reject all candidates without abstaining. It appears as the last option on the ballot. Pressing NOTA does not affect the result — the candidate with the most votes still wins. However, a high NOTA percentage signals voter dissatisfaction and can embarrass political parties into fielding better candidates. NOTA has no 'right to reject' power currently — even if NOTA gets the most votes, the candidate with the highest regular votes wins.",
    eli18Answer:
      "NOTA is the 'I don't like ANY of these candidates' option. You press it to show your vote counts even if you dislike all candidates. It doesn't change who wins right now, but a high NOTA score sends a message that voters want better choices next time.",
  },
  {
    keywords: ["voter id", "epic", "voter card", "id card", "election card", "voter identification"],
    question: "What is a Voter ID card?",
    answer:
      "The Voter ID card (officially called EPIC — Elector's Photo Identity Card) is an official photo identity card issued by the Election Commission to all registered voters. It contains your name, photo, address, constituency, part number, and voter serial number. While it serves as proof of voting registration, you don't strictly need it to vote — other photo IDs are accepted. The Voter ID also serves as a general-purpose photo ID for various government services. You can download a digital version (e-EPIC) from the ECI website.",
    eli18Answer:
      "Your Voter ID (EPIC) is an official ID card from the Election Commission. It has your photo, name, and voter number. You use it at the polling booth to prove your identity. But if you lose it, don't worry — you can also use Aadhaar, PAN card, or passport to vote!",
  },
  {
    keywords: ["constituency", "parliamentary constituency", "area", "district", "segment", "ward"],
    question: "What is a constituency?",
    answer:
      "A constituency is a defined geographic area whose registered voters elect one representative to Parliament (MP) or State Assembly (MLA). India has 543 Lok Sabha constituencies for Parliament. Constituency boundaries are determined by the Delimitation Commission to ensure roughly equal populations. Each constituency has one representative. 'Reserved' constituencies are set aside for candidates from Scheduled Castes (SC) or Scheduled Tribes (ST). Your constituency is determined by your registered address.",
    eli18Answer:
      "A constituency is your voting zone — a specific geographic area that gets to elect ONE person to represent them in Parliament. India has 543 of these zones for national elections. The area you live in determines your constituency, and you vote for candidates competing in YOUR constituency only.",
  },
  {
    keywords: ["postal vote", "postal ballot", "vote from home", "absentee voting", "mail vote"],
    question: "What is postal voting?",
    answer:
      "Postal voting allows certain voters to vote by mail without visiting a polling booth. Eligible categories include: service voters (armed forces, police on election duty), government employees on election duty elsewhere, voters above 85 years, and voters with disabilities. They receive a postal ballot paper, mark their choice in secrecy, seal it in an envelope, and return it before counting day. Postal votes are counted along with EVM votes on counting day.",
    eli18Answer:
      "Postal voting is voting by mail for people who can't go to a booth. Soldiers, police on duty, old people (85+), and disabled voters can request a ballot be sent to them. They fill it, seal it, send it back — and it counts just like a booth vote!",
  },
  {
    keywords: ["election commission", "eci", "who conducts", "who runs", "governs election", "election body"],
    question: "What is the Election Commission of India?",
    answer:
      "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering elections in India. Established in 1950, it oversees elections to the Lok Sabha, Rajya Sabha, State Assemblies, and Presidential/Vice-Presidential elections. It is headed by the Chief Election Commissioner and Election Commissioners. The ECI enforces the Model Code of Conduct, manages EVMs, prepares electoral rolls, issues polling schedules, and resolves election disputes. Its constitutional independence ensures free and fair elections without government interference.",
    eli18Answer:
      "The Election Commission of India (ECI) is the independent body that runs all elections. Think of it as the referee of democracy. It's not controlled by the government — it makes sure elections are fair, announces dates, manages voting machines, and stops politicians from breaking the rules.",
  },
  {
    keywords: ["government formation", "prime minister", "who becomes", "majority", "coalition", "forming government"],
    question: "How is the government formed after elections?",
    answer:
      "After Lok Sabha election results, the President invites the leader of the party or coalition that commands a majority (272+ of 543 seats) to form the government. The invited leader is sworn in as Prime Minister. The PM then selects Cabinet ministers (Council of Ministers) who are sworn in by the President. If no party has a clear majority, parties negotiate to form a coalition. The new government presents itself for a confidence vote on the floor of the Lok Sabha to formally prove its majority.",
    eli18Answer:
      "After results, the party that won the most seats forms the government. They need 272+ seats out of 543 to have a majority. Their leader becomes Prime Minister, sworn in by the President. If no party wins 272 seats, multiple parties team up (coalition) to reach the magic number.",
  },
];
