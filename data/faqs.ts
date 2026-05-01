export interface FAQ {
  id: string;
  question: string;
  answer: string;
  eli18Answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: "vote-without-id",
    question: "Can I vote without a Voter ID card?",
    answer:
      "Yes, you can vote without a Voter ID card as long as your name appears on the Electoral Roll (voter list). The Election Commission has approved 12 alternative photo ID documents, including Aadhaar Card, PAN Card, Passport, Driving License, MNREGA Job Card, Service ID Cards issued by Central/State Government, Bank/Post Office Passbook with photo, Health Insurance Smart Card (RSBY), Pension document with photo, NPR Smart Card, and Parliamentary/Assembly/Council member official identity card.",
    eli18Answer:
      "Yes! As long as your name is on the voter list, you can vote using other IDs like your Aadhaar, PAN card, passport, or driving license. The Voter ID card is just one of many accepted IDs.",
    category: "Voting",
  },
  {
    id: "vote-another-city",
    question: "Can I vote in another city?",
    answer:
      "Generally, no. You can only vote at the polling booth assigned to you based on where you are registered. Your registration is linked to your place of ordinary residence. If you have moved to a different city, you should update your registration by transferring your name to the new constituency using Form 6. However, service voters (government employees, military personnel) have special provisions for postal voting.",
    eli18Answer:
      "Not usually. You have to vote in the area where you're registered — where you actually live. If you've moved to a new city, update your voter registration to your new address first. Government employees and military staff have a special mail-in voting option.",
    category: "Voting",
  },
  {
    id: "name-missing",
    question: "What if my name is missing from the voter list?",
    answer:
      "If your name is missing from the voter list, you cannot vote in that election (there are no provisions for emergency additions on Election Day). However, you can file Form 6 to register for future elections. To avoid this, always check your name on the voter list at voters.eci.gov.in or through the Voter Helpline App well before any election. If your name was there before and has been deleted, file Form 6 with a request to restore it and contact your local Electoral Registration Officer.",
    eli18Answer:
      "If your name isn't on the list, unfortunately you can't vote in that election. That's why it's really important to check early! Visit voters.eci.gov.in to search for your name. If it's missing, register immediately so you're ready for the next election.",
    category: "Registration",
  },
  {
    id: "voting-compulsory",
    question: "Is voting compulsory in India?",
    answer:
      "Voting is not compulsory in India at the national (Lok Sabha) or most state elections. It is a right, not a legal obligation, at the national level. However, Gujarat is one state that passed a law making voting compulsory for local body elections. While voting is not mandatory, the Election Commission and civil society strongly encourage all eligible voters to exercise their franchise, as higher voter turnout leads to more representative elections.",
    eli18Answer:
      "No, voting is NOT compulsory in India (except in some local elections in Gujarat). But it is strongly encouraged! Your vote is your voice in choosing who runs the country — skipping it means someone else decides for you.",
    category: "Voting",
  },
  {
    id: "fairness-ensured",
    question: "How is fairness ensured in elections?",
    answer:
      "Election fairness in India is ensured through multiple mechanisms: (1) The Election Commission of India is an independent constitutional body that oversees all elections free from government control. (2) The Model Code of Conduct restricts what candidates and parties can do during elections. (3) EVMs are standalone devices not connected to the internet, preventing remote manipulation. (4) VVPAT machines provide a paper trail to verify electronic votes. (5) Multiple layers of security personnel from central and state forces are deployed. (6) Counting agents from all candidates observe the counting process. (7) International and domestic observers monitor the entire process. (8) Any citizen can file election petitions in High Courts to challenge results.",
    eli18Answer:
      "Many things keep elections fair: An independent Election Commission runs things (not the government). Voting machines aren't connected to the internet. Paper slips verify each vote. Representatives from every party watch the counting. Anyone can challenge results in court. International observers also watch the process.",
    category: "Process",
  },
  {
    id: "who-can-contest",
    question: "Who can contest (stand for) elections?",
    answer:
      "To contest Lok Sabha elections, a candidate must be: (1) A citizen of India, (2) At least 25 years of age, (3) On the electoral roll of any constituency in India, (4) Not holding any office of profit under the Union or State government (with exceptions), (5) Not declared of unsound mind by a court, (6) Not an undischarged insolvent. Additional qualifications may apply for reserved (SC/ST) constituencies. Candidates must file a nomination, pay a security deposit (₹25,000 for general, ₹12,500 for SC/ST), and file a detailed affidavit disclosing assets and criminal records.",
    eli18Answer:
      "To run for Parliament, you need to be: an Indian citizen, at least 25 years old, registered as a voter, and not holding a government job. You also pay a deposit (₹25,000) which you get back if you win enough votes. You must disclose all your assets and any criminal cases against you.",
    category: "Candidates",
  },
  {
    id: "evm-secure",
    question: "Are EVMs tamper-proof and secure?",
    answer:
      "EVMs are designed with multiple security features: They are standalone devices with no wireless capability and no internet connection. They use one-time programmable chips that cannot be reprogrammed after manufacturing. The software is burned into the chip at the hardware level. EVMs are sealed with special seals and stored in secured warehouses under 24/7 CCTV surveillance. During elections, they are under constant security escort. VVPAT machines provide an independent paper trail. The Election Commission also conducts mock polls before actual voting to demonstrate EVM accuracy. Multiple courts have upheld EVM integrity after detailed technical examinations.",
    eli18Answer:
      "Yes, EVMs are very secure! They have no internet or wifi — so no remote hacking. The software is locked in a chip that can't be changed. They're stored with heavy security between elections. Plus, paper slips (VVPAT) can verify any EVM's results if needed.",
    category: "Technology",
  },
  {
    id: "postal-voting",
    question: "What is postal voting and who can use it?",
    answer:
      "Postal voting allows certain categories of voters to cast their ballot by mail without visiting a polling booth. Eligible voters include: (1) Service voters — Armed Forces, Central Police Organizations, State Police on duty outside their constituency, (2) Government employees on election duty, (3) Voters with disabilities or those above 85 years of age (optional). Voters in these categories receive a postal ballot paper, mark their choice, and return it in a sealed envelope before the counting date. Postal votes are counted alongside regular votes on counting day.",
    eli18Answer:
      "Postal voting lets certain people vote by mail instead of going to a booth. It's for soldiers, police officers on duty far from home, elderly voters (85+), and people with disabilities. They get a ballot in the mail, fill it, and send it back. Their vote counts just like everyone else's.",
    category: "Voting",
  },
];
