export interface QuickLearnCard {
  id: string;
  title: string;
  icon: string;
  summary: string;
  fullExplanation: string;
  eli18Explanation: string;
}

export const quickLearnCards: QuickLearnCard[] = [
  {
    id: "evm",
    title: "What is EVM?",
    icon: "🖥️",
    summary: "Electronic Voting Machine — the device used to cast votes in Indian elections.",
    fullExplanation:
      "An Electronic Voting Machine (EVM) is a standalone electronic device used in Indian elections to record votes. It consists of two units: a Control Unit (held by the Presiding Officer) and a Balloting Unit (used by voters to press their choice). EVMs replaced paper ballots in 2004 to make voting faster, cheaper, and more tamper-resistant. They run on a battery and do not connect to the internet, making external hacking impossible. EVMs have been used successfully in over 350 elections since 1999.",
    eli18Explanation:
      "An EVM is like a simple voting tablet with buttons. Each button represents a candidate. You just press the button next to the name you want to vote for, and it securely records your choice. It's not connected to the internet — so no one can hack it remotely!",
  },
  {
    id: "nota",
    title: "What is NOTA?",
    icon: "❌",
    summary: "None Of The Above — a ballot option to reject all candidates.",
    fullExplanation:
      "NOTA (None Of The Above) is a ballot option on the EVM that allows voters to officially reject all candidates in a constituency without abstaining from voting. It was introduced by the Supreme Court of India in 2013. Pressing NOTA registers your dissatisfaction with all candidates but does not affect the result — the candidate with the most regular votes still wins. However, a high NOTA percentage sends a strong message about voter dissatisfaction and can influence political parties to field better candidates in future elections.",
    eli18Explanation:
      "NOTA is the 'none of the above' option. If you don't like ANY of the candidates, you can press NOTA to show your disappointment without wasting your vote by staying home. It doesn't change who wins, but it tells politicians that voters weren't happy with their choices.",
  },
  {
    id: "constituency",
    title: "What is a Constituency?",
    icon: "🗺️",
    summary: "A geographic area that elects one representative to Parliament or State Assembly.",
    fullExplanation:
      "A constituency (also called a parliamentary or assembly segment) is a defined geographic area whose registered voters elect one representative. India has 543 Lok Sabha constituencies for Parliament and over 4,000 assembly constituencies for state legislatures. Constituency boundaries are drawn by the Delimitation Commission to ensure roughly equal populations. Each constituency is represented by one MP (Member of Parliament) in the Lok Sabha or one MLA (Member of Legislative Assembly) in state legislatures.",
    eli18Explanation:
      "Think of a constituency as your voting neighborhood — a specific area that gets to choose ONE representative. All the people in that area vote, and whoever gets the most votes becomes THEIR representative in Parliament. India is divided into 543 such areas for national elections.",
  },
  {
    id: "polling-booth",
    title: "What is a Polling Booth?",
    icon: "🏫",
    summary: "The official location where voters go to cast their ballots on Election Day.",
    fullExplanation:
      "A polling booth (or polling station) is the physical location where registered voters in a specific area go to cast their votes. Each polling booth covers 1,000–1,500 voters in its vicinity. Polling booths are typically set up in public buildings like schools, community halls, or government offices. They are staffed by polling officers, security personnel, and party polling agents. The Election Commission ensures that no voter has to travel more than 2 km to reach their polling booth.",
    eli18Explanation:
      "Your polling booth is basically a temporary voting center set up in your neighborhood — usually at a nearby school or community building. It's where you go on Election Day to cast your vote. You're assigned to a specific booth based on your address, and you can find yours on the ECI website.",
  },
  {
    id: "voter-id",
    title: "What is Voter ID?",
    icon: "🪪",
    summary: "An official photo identity card issued to registered voters by the Election Commission.",
    fullExplanation:
      "The Voter ID card, officially called the Elector's Photo Identity Card (EPIC), is an identity document issued by the Election Commission of India to all registered voters. It serves as both proof of registration and a general-purpose photo ID. The card contains the voter's name, photo, address, constituency details, and a unique voter ID number. While carrying a Voter ID to the polling booth is helpful, it is not strictly mandatory — other photo IDs are also accepted for voting purposes.",
    eli18Explanation:
      "Your Voter ID (EPIC) is an official government ID card that proves you're registered to vote. It has your photo, name, and voter number on it. It's really useful as a general ID too — kind of like an adult version of your school ID, but issued by the Election Commission.",
  },
  {
    id: "vote-counting",
    title: "What is Vote Counting?",
    icon: "🔢",
    summary: "The official process of tallying all votes to determine election results.",
    fullExplanation:
      "Vote counting is the process of totaling all votes cast across every polling booth in a constituency to determine the winner. In India, counting is done from the EVMs stored since Election Day. The process is conducted at designated Counting Centers under strict security. Counting agents from each candidate verify the process. Votes are counted in multiple rounds — each round tallying EVMs from specific booth groups. Results are announced after each round, and the final winner is declared by the Returning Officer after all booths are counted.",
    eli18Explanation:
      "Vote counting is simply adding up all the votes from all the voting machines in an area. It happens at a central location with representatives from all candidates watching. Results come out in rounds throughout counting day — like sports scores being updated as the game progresses!",
  },
];
