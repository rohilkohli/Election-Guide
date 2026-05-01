export interface ElectionStage {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  color: string;
  bgColor: string;
  borderColor: string;
  details: {
    whatHappens: string[];
    whyItMatters: string[];
    whatYouShouldKnow: string[];
  };
  eli18: {
    whatHappens: string[];
    whyItMatters: string[];
    whatYouShouldKnow: string[];
  };
}

export const electionStages: ElectionStage[] = [
  {
    id: "voter-registration",
    title: "Voter Registration",
    icon: "📋",
    shortDescription: "Get your name on the electoral roll so you can vote.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    details: {
      whatHappens: [
        "Citizens who meet eligibility criteria apply to be added to the Electoral Roll (voter list).",
        "The Election Commission verifies details like age, nationality, and place of residence.",
        "Approved voters receive a Voter ID card (EPIC) which serves as official identification.",
        "The voter list is updated periodically and published for public review.",
        "Corrections or objections to voter list entries can be submitted during the revision period.",
      ],
      whyItMatters: [
        "Only registered voters can cast their ballot on Election Day.",
        "Registration ensures a fair, accurate count of eligible voters in each constituency.",
        "It prevents fraudulent voting and ensures the integrity of the electoral process.",
        "Registration deadlines ensure the administrative process runs smoothly.",
      ],
      whatYouShouldKnow: [
        "You must be 18 years or older and an Indian citizen to register.",
        "You can register online at voters.eci.gov.in or through a Form 6 at your local ERO office.",
        "Ordinary residence in the constituency is required for registration there.",
        "NRI citizens can also register as overseas voters.",
        "You can check your name on the electoral roll on the ECI website.",
      ],
    },
    eli18: {
      whatHappens: [
        "You sign up to vote — it's like creating an account before an election.",
        "The government checks that you're a real citizen who is old enough to vote.",
        "You get a Voter ID card — like an official pass to the voting booth.",
        "Your name goes on a public list of voters in your area.",
      ],
      whyItMatters: [
        "Without registration, you can't vote — it's your ticket to participate.",
        "It keeps elections fair by making sure only real, eligible people vote.",
      ],
      whatYouShouldKnow: [
        "You need to be 18+ and an Indian citizen.",
        "Register online at voters.eci.gov.in — it takes about 10 minutes.",
        "You must register in the area where you actually live.",
        "Check if your name is already on the voter list before registering again.",
      ],
    },
  },
  {
    id: "campaign-period",
    title: "Campaign Period",
    icon: "📣",
    shortDescription: "Candidates and parties spread their message to win your vote.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    details: {
      whatHappens: [
        "After nominations are filed and accepted, the official campaign period begins.",
        "Candidates and political parties hold rallies, door-to-door visits, and public meetings.",
        "Political advertisements appear on TV, radio, newspapers, and social media.",
        "The Model Code of Conduct (MCC) comes into effect when election dates are announced.",
        "Campaign spending is regulated and candidates must maintain expense accounts.",
        "The campaign period officially ends 48 hours before voting day (silence period).",
      ],
      whyItMatters: [
        "Campaigning allows voters to learn about candidates' qualifications, plans, and positions.",
        "It ensures that democracy functions through informed consent of citizens.",
        "Regulated campaigning creates a level playing field for all candidates.",
        "Public debates and outreach help voters make educated choices.",
      ],
      whatYouShouldKnow: [
        "The Model Code of Conduct prohibits use of government resources for campaigning.",
        "Vote buying (offering money or gifts for votes) is illegal and punishable.",
        "Candidates have strict spending limits set by the Election Commission.",
        "The 48-hour silence period before voting prevents last-minute voter influence.",
        "You can report MCC violations to the Election Commission.",
      ],
    },
    eli18: {
      whatHappens: [
        "Candidates go around asking for your vote — speeches, posters, social media posts.",
        "Political parties try to convince you why you should vote for them.",
        "There are strict rules (called the Model Code of Conduct) about what candidates can and can't do.",
        "Two days before voting, all campaign activities must stop.",
      ],
      whyItMatters: [
        "It's your chance to learn what each candidate stands for before you vote.",
        "Rules keep it fair so rich candidates can't just outspend everyone else.",
      ],
      whatYouShouldKnow: [
        "No one is allowed to pay you or give you gifts to vote for them — that's illegal.",
        "Candidates can only spend a limited amount on their campaign.",
        "The government can't use public money for campaign advertisements.",
        "The 2-day silence before voting gives you time to think clearly before voting.",
      ],
    },
  },
  {
    id: "voting-day",
    title: "Voting Day",
    icon: "🗳️",
    shortDescription: "The day you exercise your democratic right to vote.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    details: {
      whatHappens: [
        "Polling booths open from 7:00 AM to 6:00 PM (timings may vary by constituency).",
        "Voters visit their designated polling booth based on their voter list entry.",
        "Polling officers verify the voter's identity using the electoral roll and ID proof.",
        "The voter's finger is marked with indelible ink to prevent double voting.",
        "The voter presses a button on the Electronic Voting Machine (EVM) to cast their vote.",
        "A Voter Verifiable Paper Audit Trail (VVPAT) slip is displayed for 7 seconds for verification.",
        "Security personnel from multiple agencies are deployed at every polling booth.",
      ],
      whyItMatters: [
        "Voting Day is the culmination of the democratic process — every vote counts.",
        "High voter turnout strengthens democracy and ensures representative outcomes.",
        "The secret ballot ensures voters can vote freely without fear or pressure.",
        "Multiple security layers maintain the integrity of the voting process.",
      ],
      whatYouShouldKnow: [
        "You must carry a valid photo ID (Voter ID, Aadhaar, PAN, Passport, etc.).",
        "You will be assigned to a specific polling booth — check your booth on the ECI website.",
        "Voting is simple: verify identity → get ballot slip → press EVM button → done.",
        "If your name is on the voter list, you have the right to vote even without a Voter ID card.",
        "You cannot be denied entry to a polling booth if your name is on the electoral roll.",
      ],
    },
    eli18: {
      whatHappens: [
        "You go to your local polling booth (like a community hall or school).",
        "Officers check your ID and voter registration.",
        "They put ink on your finger so you can't vote twice.",
        "You press a button on a voting machine (called an EVM) for your chosen candidate.",
        "A paper slip briefly shows who you voted for — this is for checking accuracy.",
      ],
      whyItMatters: [
        "This is YOUR moment — you directly decide who represents your area in government.",
        "Your vote is 100% secret — no one can see who you voted for.",
      ],
      whatYouShouldKnow: [
        "Bring any photo ID — Voter ID, Aadhaar, PAN card, Passport, or Student ID.",
        "Check your assigned polling booth beforehand at voters.eci.gov.in.",
        "The whole process takes about 5 minutes.",
        "Polling booths are open from 7 AM to 6 PM — go whenever it's convenient.",
      ],
    },
  },
  {
    id: "vote-counting",
    title: "Vote Counting",
    icon: "🔢",
    shortDescription: "Votes are tallied transparently to determine the winner.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    details: {
      whatHappens: [
        "Counting takes place at designated counting centers, usually a few days after voting.",
        "EVMs are transported in sealed, secure vehicles under police escort.",
        "Counting agents from each candidate's party are present to observe the process.",
        "EVM results are read out and recorded round by round for each constituency.",
        "Results are tallied and the candidate with the highest votes is declared winner.",
        "The Election Commission announces results officially and issues certificates.",
        "VVPAT counting is done for 5 randomly selected EVMs per constituency for verification.",
      ],
      whyItMatters: [
        "Transparent counting ensures public trust in election results.",
        "The presence of party agents and observers prevents manipulation.",
        "The process is legally prescribed to ensure accuracy and fairness.",
        "Results determine who will form the government and lead the nation.",
      ],
      whatYouShouldKnow: [
        "Counting is usually held on a single day for all constituencies simultaneously.",
        "Results are announced on the ECI website in real-time as counting progresses.",
        "Any candidate can request a recount if the margin is very close.",
        "International and domestic observers monitor the counting process.",
        "Results become official only after the Returning Officer's declaration.",
      ],
    },
    eli18: {
      whatHappens: [
        "On counting day, officials open the voting machines and add up all the votes.",
        "Representatives from each candidate's team watch to make sure it's done fairly.",
        "Results come out one area (constituency) at a time.",
        "The candidate with the most votes in their area wins that seat.",
      ],
      whyItMatters: [
        "Transparent counting means everyone can trust the results.",
        "Multiple observers make sure no one cheats.",
      ],
      whatYouShouldKnow: [
        "You can watch live results on the ECI website or any news channel.",
        "Counting usually starts at 8 AM and results come in throughout the day.",
        "Paper slips from machines can be cross-checked if anyone doubts the result.",
        "A candidate can ask for a recount if they think a mistake was made.",
      ],
    },
  },
  {
    id: "results-formation",
    title: "Results & Government Formation",
    icon: "🏛️",
    shortDescription: "Winners are declared and a new government takes shape.",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    details: {
      whatHappens: [
        "The Election Commission declares the final results for all constituencies.",
        "In a general election, the party or coalition with 272+ seats (simple majority) is invited to form the government.",
        "The President invites the leader of the majority party/coalition to become Prime Minister.",
        "The Prime Minister is sworn in and then forms the Council of Ministers (Cabinet).",
        "New Members of Parliament (MPs) are sworn in and the new Lok Sabha session begins.",
        "The new government presents its agenda and begins its term (up to 5 years).",
        "A post-election period follows for transition of power from the outgoing government.",
      ],
      whyItMatters: [
        "The results directly determine who governs the country for the next term.",
        "Government formation creates the executive branch that implements policies affecting citizens.",
        "The peaceful transfer of power is a hallmark of a functioning democracy.",
        "The outcome reflects the collective will of all voters across the country.",
      ],
      whatYouShouldKnow: [
        "For state elections, the Chief Minister is sworn in (not the Prime Minister).",
        "If no single party wins a majority, parties may form coalitions to reach 272 seats.",
        "The outgoing government continues in a caretaker capacity until the new government is sworn in.",
        "The new government's first major task is typically to present the Union Budget.",
        "Citizens can track their elected representative's work on the Parliament website.",
      ],
    },
    eli18: {
      whatHappens: [
        "Final results are announced — it's like the scoreboard of democracy.",
        "The party that wins the most seats gets to form the government.",
        "They need to win at least 272 out of 543 seats to have a majority.",
        "The winning party's leader becomes the Prime Minister and picks a team (Cabinet).",
        "Everyone gets sworn in and the new government officially starts.",
      ],
      whyItMatters: [
        "This is the result of millions of votes — YOUR vote helped decide this outcome.",
        "The new government will make decisions that affect your daily life for 5 years.",
      ],
      whatYouShouldKnow: [
        "If no party wins enough seats alone, multiple parties team up (called a coalition).",
        "The new government has 5 years before the next election.",
        "You can track what your elected MP is doing on the Parliament of India website.",
        "Elections happen every 5 years — your next chance to vote will come around.",
      ],
    },
  },
];
