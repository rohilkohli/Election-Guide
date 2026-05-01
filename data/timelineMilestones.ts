export interface TimelineMilestone {
  id: string;
  title: string;
  icon: string;
  description: string;
  eli18Description: string;
  duration: string;
  color: string;
  bgColor: string;
  borderColor: string;
  details: string[];
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: "registration-opens",
    title: "Registration Opens",
    icon: "📝",
    description:
      "The Election Commission opens the voter registration window. Citizens can enroll, update, or correct their details on the Electoral Roll.",
    eli18Description:
      "Sign-up begins! You can add your name to the voter list or fix any mistakes on it.",
    duration: "Several weeks to months",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-400",
    details: [
      "Form 6: New voter registration",
      "Form 7: Deletion of entries",
      "Form 8: Correction of existing entries",
      "Online registration available at voters.eci.gov.in",
      "Special camps set up at local offices for assisted registration",
    ],
  },
  {
    id: "nomination-filing",
    title: "Nomination Filing",
    icon: "📄",
    description:
      "Candidates formally declare their intent to contest by filing nomination papers with the Returning Officer of their constituency.",
    eli18Description:
      "Candidates officially say 'I want to run!' by submitting paperwork to the election office.",
    duration: "5–7 days",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-400",
    details: [
      "Candidates submit Form 2B nomination papers",
      "A security deposit (refundable if candidate wins >1/6 votes) must be paid",
      "Papers are scrutinized for eligibility and validity",
      "Candidates can withdraw nominations within 2 days of scrutiny",
      "Final candidate list is published after withdrawal period",
    ],
  },
  {
    id: "campaigning-starts",
    title: "Campaigning Starts",
    icon: "📣",
    description:
      "The official campaign period begins after nomination withdrawals. Candidates and parties actively seek voter support through rallies, ads, and outreach.",
    eli18Description:
      "The 'convince me!' phase begins. Candidates visit neighborhoods, put up posters, and run ads.",
    duration: "2–3 weeks",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-400",
    details: [
      "Model Code of Conduct is strictly enforced",
      "Candidates must track all campaign expenses",
      "Rally permissions required from local authorities",
      "Campaign silence period starts 48 hours before polls",
      "Exit polls banned during voting phases",
    ],
  },
  {
    id: "voting-day",
    title: "Voting Day",
    icon: "🗳️",
    description:
      "Polling booths open across the constituency. Registered voters cast their ballots using Electronic Voting Machines (EVMs).",
    eli18Description:
      "The big day! You go to your polling booth and press the button for your chosen candidate.",
    duration: "1 day (7 AM – 6 PM)",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-400",
    details: [
      "Voters must carry valid photo ID",
      "Indelible ink is applied to prevent double-voting",
      "VVPAT machines confirm your vote visually",
      "Central and state forces deployed for security",
      "Mock polls conducted at the start to test EVM accuracy",
    ],
  },
  {
    id: "counting-day",
    title: "Counting Day",
    icon: "🔢",
    description:
      "EVMs are opened at designated counting centers. Results are tallied in rounds and announced constituency by constituency.",
    eli18Description:
      "All the votes are added up. Results come in throughout the day — it's exciting!",
    duration: "1 day (starts 8 AM)",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-400",
    details: [
      "Counting agents from each candidate present at all times",
      "Each round covers votes from specific booths",
      "VVPAT slips randomly verified for 5 EVMs per constituency",
      "Results announced on ECI website in real-time",
      "Candidates can request recount for closely contested seats",
    ],
  },
  {
    id: "results-declared",
    title: "Results Declared",
    icon: "🏆",
    description:
      "The Election Commission certifies and declares all results. Winning candidates receive certificates and the process of government formation begins.",
    eli18Description:
      "Winners are officially announced! The party with the most wins starts forming the government.",
    duration: "Same day as counting",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-400",
    details: [
      "Returning Officers issue winning certificates",
      "Party/coalition with majority forms the government",
      "President invites majority leader to form government",
      "Prime Minister and Cabinet are sworn in",
      "New Parliament session convened within 6 months",
    ],
  },
];
