import type { UniversalStageId } from "./universal-stages";

export type Insight = {
  id: string;
  text: string;
  source?: string;
  category?:
    | "aspiration"
    | "outcome"
    | "job-step"
    | "sub-job"
    | "related-job"
    | "general";
  addedAt?: string;
  weight?: "high" | "medium" | "low";
};

export type Satisfaction = {
  score: number;
  trend: number | null;
  sampleSize: number;
  history: number[];
  npsBreakdown: {
    promoters: number;
    passives: number;
    detractors: number;
  } | null;
  topPain: string;
  source: string;
};

export const surveyCsat = {
  question: "How satisfied are you with using Payroll?",
  totalResponses: 32,
  averageScore: 3.625,
  scoreScale: 5,
  topTwoBoxPercent: 56,
  distribution: [
    { score: 5, label: "Extremely happy", count: 8, color: "#10b981" },
    { score: 4, label: "Happy", count: 10, color: "#86efac" },
    { score: 3, label: "Neutral", count: 9, color: "#f59e0b" },
    { score: 2, label: "Unsatisfied", count: 4, color: "#fb923c" },
    { score: 1, label: "Extremely unsatisfied", count: 1, color: "#ef4444" },
  ],
  dateRange: "25 Apr – 20 May 2026",
  source: "In-product survey · Payroll Runs page (secure.e-conomic.com)",
};

export const insightsMeta = {
  generatedAt: "2026-05-20T14:15:00+02:00",
  generatedBy: "ecoai",
  methodology: {
    type: "proxy" as const,
    summary:
      "Proxy CSAT — sentiment-analysed from support and sales feedback. No quantitative Payroll survey yet.",
    caveats: [
      "Selection bias: feedback from support and sales channels over-represents negative experiences",
      "No time series: trend and 6-month history not yet available",
      "Small sample: 64 records is directional — not statistically robust",
      "NPS/CSAT survey is live, but data not yet accessible",
    ],
  },
  sources: [
    "Airtable Feedback from Support and Sales (n=64, Jan–May 2026, Area=Payroll)",
    "Dovetail · Validate Jobs To Be Done with AOs (79 insights, 100 highlights)",
    "Slite · Handle Payroll journey · Problem Scopes for DP5 Payroll",
  ],
};

export type IllustrationKey =
  | "inbox"
  | "shield"
  | "play"
  | "send"
  | "sliders"
  | "ledger"
  | "archive"
  | "chat";

export type JobPhase = {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  mainJob: string;
  universalStage: UniversalStageId;
  illustration: IllustrationKey;
  satisfaction: Satisfaction;
  subJobs: { title: string; detail: string }[];
  relatedJobs: string[];
  aspirations: string[];
  jobSteps: string[];
  outcomes: { metric: string; description: string }[];
  insights: Insight[];
  color: string;
};

export const jobs: JobPhase[] = [
  {
    id: "indhentning",
    number: 1,
    title: "Collecting payroll data",
    shortTitle: "Collecting",
    description:
      "Ensure correct and up-to-date data is collected before payroll can be calculated.",
    mainJob:
      "Collect all relevant payroll data from employees, systems and processes so the foundation for the payroll run is complete and correct.",
    universalStage: "locate",
    illustration: "inbox",
    satisfaction: {
      score: 50,
      trend: null,
      sampleSize: 11,
      history: [],
      npsBreakdown: null,
      topPain:
        "AOs have to manually chase clients for the period's payroll data — it creates stress for both them and the BO.",
      source:
        "Airtable Feedback (n=11), Dovetail highlights (n=4), Jan–May 2026, proxy sentiment",
    },
    insights: [
      {
        id: "indhentning-0",
        text: "AOs are frustrated at having to chase their clients for the period's payroll information. It stresses both them and the client.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-04-17",
        category: "job-step",
        weight: "high",
        addedAt: "2026-04-17",
      },
      {
        id: "indhentning-1",
        text: "Our clients are happy because their employees get paid and we get it right and remember all the things we now have to remember. We have our system to remember it, but it's manual. It's our app and our lists.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "job-step",
        weight: "high",
        addedAt: "2025-11",
      },
      {
        id: "indhentning-2",
        text: "So we sit with our manual lists, and we have a little payroll-check app where we tick off when we've run payroll. We also keep track of who runs Autoløn and who we need to remember things for.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "sub-job",
        weight: "high",
        addedAt: "2025-11",
      },
      {
        id: "indhentning-3",
        text: "Clients send data too late, in inconsistent formats, or incomplete — chasing inputs eats into processing time.",
        source: "Slite Handle Payroll journey, Stage 1, payroll bookkeeper",
        category: "job-step",
        weight: "high",
      },
      {
        id: "indhentning-4",
        text: "Ideally the system could send an automatic reminder to the BO to send the period's payroll information.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-04-17",
        category: "aspiration",
        weight: "medium",
        addedAt: "2026-04-17",
      },
      {
        id: "indhentning-5",
        text: "A BO has somewhere between 100–130 payslips per month — they transfer data manually from Workfeed to e-conomic Payroll. Wants an integration or CSV file.",
        source: "Airtable, Brødsgaard Thomsen, 2026-05-07",
        category: "sub-job",
        weight: "high",
        addedAt: "2026-05-07",
      },
      {
        id: "indhentning-6",
        text: "Being able to integrate with other time-tracking systems — e.g. CleanManager and Apacta.",
        source: "Airtable, Hanne, 2026-04-14",
        category: "aspiration",
        weight: "high",
        addedAt: "2026-04-14",
      },
      {
        id: "indhentning-7",
        text: "3 × AOs are used to Danløn's submission deadline and work with clients who can only submit later. Want us to match Danløn's submission deadline.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-04-16",
        category: "related-job",
        weight: "medium",
        addedAt: "2026-04-16",
      },
      {
        id: "indhentning-8",
        text: "AOs lack more flexibility around payroll periods. They have monthly-paid employees who should be paid from the 1st–30/31st, and hourly-paid employees who should be paid from the 16th–15th.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-04-17",
        category: "job-step",
        weight: "high",
        addedAt: "2026-04-17",
      },
      {
        id: "indhentning-9",
        text: "There's a lot of manual work in reporting self-paid holiday days for an employee. You have to manually calculate the holiday-pay basis and holiday-pay taken.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-04-29",
        category: "sub-job",
        weight: "high",
        addedAt: "2026-04-29",
      },
      {
        id: "indhentning-10",
        text: "There's risk, but we try to have these manual systems in place. It just takes some time.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "outcome",
        weight: "medium",
        addedAt: "2025-11",
      },
    ],
    subJobs: [
      {
        title: "Employee information",
        detail:
          "Collect master data for new employees (CPR number, address, account number, tax card, pension details, employment terms).",
      },
      {
        title: "Working hours",
        detail:
          "Collect timesheets, shift plans or hours from time-tracking systems for monthly-paid and hourly-paid employees.",
      },
      {
        title: "Supplements and deductions",
        detail:
          "Record overtime, mileage allowance, per diems, bonus, commission, fringe benefits or salary deductions.",
      },
      {
        title: "Sick leave and holiday",
        detail:
          "Collect data on sick days, parental leave, holiday and child sick days that can affect payroll.",
      },
      {
        title: "Other changes",
        detail:
          "Record changes in working hours, position, salary adjustments, terminations or one-off payments.",
      },
    ],
    relatedJobs: [
      "Onboard new employees",
      "Maintain master data in the HR system",
      "Administer the time-tracking system",
      "Follow up on missing information from managers",
    ],
    aspirations: [
      "Be the reliable source of all payroll data",
      "Feel at ease before the payroll run begins",
      "Create a professional impression with new employees",
    ],
    jobSteps: [
      "Identify all data sources for the period",
      "Collect data from employees and managers",
      "Import data from HR and time-tracking systems",
      "Validate that all required information is present",
      "Follow up on missing data before the deadline",
    ],
    outcomes: [
      {
        metric: "Time spent on data collection",
        description: "Reduce time spent chasing missing information.",
      },
      {
        metric: "Share of complete data sets before the run",
        description: "Increase the share of periods where everything is ready on time.",
      },
      {
        metric: "Number of follow-up emails",
        description: "Minimize check-ins and reminders to colleagues.",
      },
    ],
    color: "#60a5fa",
  },
  {
    id: "validering",
    number: 2,
    title: "Validating payroll data",
    shortTitle: "Validation",
    description:
      "Quality-check collected data before it's used in the payroll run.",
    mainJob:
      "Ensure collected data is correct, complete and aligned with collective agreements, contracts and applicable legislation.",
    universalStage: "confirm",
    illustration: "shield",
    satisfaction: {
      score: 38,
      trend: null,
      sampleSize: 14,
      history: [],
      npsBreakdown: null,
      topPain:
        "Defaults for ATP, holiday scheme and SH savings lead to errors that are only discovered after the payroll run.",
      source: "Airtable Feedback (n=14), Jan–May 2026, proxy sentiment",
    },
    insights: [
      {
        id: "validering-0",
        text: "Payroll didn't go through — he's missing an error message that it didn't go through. He only notices once the payroll is delayed.",
        source: "Airtable, Fanø, 2026-05-04",
        category: "job-step",
        weight: "high",
        addedAt: "2026-05-04",
      },
      {
        id: "validering-1",
        text: "Today the system auto-selects the ATP contribution rate 'At least 117 hours per month (A contribution)' — errors would drop if 'Variable working hours' were the default.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-05",
        category: "job-step",
        weight: "high",
        addedAt: "2026-02-05",
      },
      {
        id: "validering-2",
        text: "Once an employee has received their first payroll, you can't change the holiday scheme afterwards — and that's a problem.",
        source: "Airtable, Johanne, 2026-02-05",
        category: "job-step",
        weight: "high",
        addedAt: "2026-02-05",
      },
      {
        id: "validering-3",
        text: "For employees on 'Pay during holiday': Holiday accounting AND automatic reduction of the holiday-pay basis must be enabled manually — they should be the default.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-05",
        category: "sub-job",
        weight: "high",
        addedAt: "2026-02-05",
      },
      {
        id: "validering-4",
        text: "Errors in payroll are costly — you don't dare experiment.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "outcome",
        weight: "high",
        addedAt: "2025-11",
      },
      {
        id: "validering-5",
        text: "In the employee's employment details, the option for an exemption card isn't shown in the tax-card dropdown. Showing it would head off a lot of questions.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-05",
        category: "sub-job",
        weight: "medium",
        addedAt: "2026-02-05",
      },
      {
        id: "validering-6",
        text: "When you set up SH savings, you have to choose when it pays out. The system picks 'On termination' as the default — but 'Annual' would save the AO from many errors.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-05",
        category: "job-step",
        weight: "high",
        addedAt: "2026-02-05",
      },
      {
        id: "validering-7",
        text: "You can't tell whether the system asks for working hours per week or per month. The field is cleared the moment you click away from it.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-05",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-02-05",
      },
      {
        id: "validering-8",
        text: "Foreign payees: only supports a max of 4 digits in the postcode, but abroad it's often 5–10 digits.",
        source: "Airtable, Fanø, 2026-05-04",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-05-04",
      },
      {
        id: "validering-9",
        text: "Foreign payees: no notice that the payment won't be transferred — you have to handle the transfer manually yourself.",
        source: "Airtable, Fanø, 2026-05-04",
        category: "job-step",
        weight: "high",
        addedAt: "2026-05-04",
      },
      {
        id: "validering-10",
        text: "Bug: you can pick headings in 'accounting setup'. That lets the AO accidentally pick parts of the chart of accounts that aren't actual accounts.",
        source: "Airtable, Mads, 2026-03-25",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-03-25",
      },
      {
        id: "validering-11",
        text: "When I search the pay-component list for 'Fri bil' or 'Fri telefon', I'm offered 30+ components. Once you type something after 'Fri', the other components shouldn't appear anymore.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-06",
        category: "job-step",
        weight: "low",
        addedAt: "2026-02-06",
      },
      {
        id: "validering-12",
        text: "It's frustrating that terminated employees aren't hidden in the employee overview. It clutters the view.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-05",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-02-05",
      },
      {
        id: "validering-13",
        text: "It's annoying that employees aren't sorted alphabetically or by employee number — you have to hunt for them.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-04-10",
        category: "job-step",
        weight: "low",
        addedAt: "2026-04-10",
      },
    ],
    subJobs: [
      {
        title: "Check of hours and absence",
        detail:
          "Verify that reported hours match work schedules, and that sick notes are correctly recorded.",
      },
      {
        title: "Collective agreements and contracts",
        detail:
          "Ensure payroll is calculated correctly per the applicable collective agreement, contract or company policies.",
      },
      {
        title: "Tax details",
        detail:
          "Verify that the correct tax cards are used (auto-fetched from eIndkomst / the Danish Tax Agency).",
      },
    ],
    relatedJobs: [
      "Perform internal control and audit",
      "Follow up on compliance requirements",
      "Stay up to date on collective agreements",
    ],
    aspirations: [
      "Be known as thorough and reliable",
      "Have a clear conscience when payroll goes out",
      "Protect the business from compliance errors",
    ],
    jobSteps: [
      "Compare reported data with the original sources",
      "Validate payroll calculation against the collective agreement",
      "Verify tax cards and tax details",
      "Flag discrepancies for clarification",
      "Document the scope of the check",
    ],
    outcomes: [
      {
        metric: "Error rate on payslips",
        description:
          "Reduce the number of errors discovered after the payroll run.",
      },
      {
        metric: "Number of after-the-fact corrections",
        description: "Minimise the need for corrections in later periods.",
      },
      {
        metric: "Compliance score",
        description: "Ensure 100% adherence to collective agreements.",
      },
    ],
    color: "#a78bfa",
  },
  {
    id: "lonkorsel",
    number: 3,
    title: "Running payroll",
    shortTitle: "Payroll run",
    description: "Calculate and pay employees correctly and on time.",
    mainJob:
      "Run payroll so employees receive the right amount on the agreed date — every time.",
    universalStage: "execute",
    illustration: "play",
    satisfaction: {
      score: 46,
      trend: null,
      sampleSize: 12,
      history: [],
      npsBreakdown: null,
      topPain:
        "Autoløn requires approval of each pay component and resets after every run — it should run automatically.",
      source:
        "Airtable Feedback (n=12), Dovetail highlights (n=8), Jan–May 2026, proxy sentiment",
    },
    insights: [
      {
        id: "lonkorsel-0",
        text: "Autoløn: It doesn't make sense to have to tick off each pay component. When Autoløn is on, it should run without needing to approve each line.",
        source: "Airtable, Proceed2, 2026-04-21",
        category: "job-step",
        weight: "high",
        addedAt: "2026-04-21",
      },
      {
        id: "lonkorsel-1",
        text: "Autoløn resets after every payroll run — regardless of pay component. Wishes to control this per component like in Danløn, which is missed for fixed vs. variable pay components.",
        source: "Airtable, Roesgaard, 2026-04-21",
        category: "job-step",
        weight: "high",
        addedAt: "2026-04-21",
      },
      {
        id: "lonkorsel-2",
        text: "It's impractical that the system automatically shows the earliest possible payroll period.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-06",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-02-06",
      },
      {
        id: "lonkorsel-3",
        text: "When using Autoløn (thousands of payroll runs): Need a carte blanche to add e.g. mileage allowance without approving each one individually.",
        source: "Airtable, BDO, 2026-04-21",
        category: "sub-job",
        weight: "high",
        addedAt: "2026-04-21",
      },
      {
        id: "lonkorsel-4",
        text: "Favourite pay components don't work optimally — fields (e.g. holiday days) don't reset after a payroll run, and you can't toggle pay components on/off for a given time range.",
        source: "Airtable, Admin4you, 2026-04-21",
        category: "job-step",
        weight: "high",
        addedAt: "2026-04-21",
      },
      {
        id: "lonkorsel-5",
        text: "That thing where it doesn't make sense that you have to tick off each pay component if it's supposed to be autoløn.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "job-step",
        weight: "high",
        addedAt: "2025-11",
      },
      {
        id: "lonkorsel-6",
        text: "When I demo Payroll, Autoløn is always something where they pause and think, cool, I can use this for this company.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "outcome",
        weight: "medium",
        addedAt: "2025-11",
      },
      {
        id: "lonkorsel-7",
        text: "People are really happy with it, but I also get the sense that they take it a bit for granted. Of course you should be able to do automatic payroll — it's a showstopper.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "outcome",
        weight: "medium",
        addedAt: "2025-11",
      },
      {
        id: "lonkorsel-8",
        text: "Of course you should send the first payroll for approval before doing the others. And others just think it's great that it just runs.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "job-step",
        weight: "medium",
        addedAt: "2025-11",
      },
      {
        id: "lonkorsel-9",
        text: "This thing where you can just toggle it on in the employee's master data — they love that. They really do.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "outcome",
        weight: "medium",
        addedAt: "2025-11",
      },
      {
        id: "lonkorsel-10",
        text: "I think we should stick with — first, of course you should send the first payroll for approval.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "job-step",
        weight: "medium",
        addedAt: "2025-11",
      },
      {
        id: "lonkorsel-11",
        text: "The client needs to edit the February payroll with 'Net pay already paid out' enabled. You can't see whether it's enabled or not in the draft.",
        source: "Airtable, AO Kunde, 2026-02-26",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-02-26",
      },
    ],
    subJobs: [
      {
        title: "Set up the payroll run",
        detail:
          "Enter and import data into the payroll system (e.g. Danløn, Dataløn, Lessor, Epos).",
      },
      {
        title: "Calculation",
        detail:
          "The system calculates gross and net amounts, AM contribution, ATP, pension, holiday pay, tax, A-tax and B-tax.",
      },
      {
        title: "Control runs",
        detail:
          "Review draft payslips for errors or anomalies.",
      },
      {
        title: "Approval",
        detail:
          "Get internal approval from management or the finance department.",
      },
      {
        title: "Payout",
        detail:
          "Upload the file to online banking and pay salaries to employees' accounts.",
      },
    ],
    relatedJobs: [
      "Maintain the payroll system",
      "Track budget against actual payroll spend",
      "Handle erroneous payments and corrections",
    ],
    aspirations: [
      "Deliver error-free payroll on time every single time",
      "Create calm and predictability across the organisation",
      "Be the person no one needs to worry about",
    ],
    jobSteps: [
      "Import data into the payroll system",
      "Run payroll calculation",
      "Review draft payslips",
      "Get internal approval",
      "Transfer the file to online banking and release the payout",
    ],
    outcomes: [
      {
        metric: "Share of on-time payouts",
        description: "Keep payroll payouts at 100% on time.",
      },
      {
        metric: "Number of erroneous payments",
        description: "Reduce the number of payslips that need to be re-run.",
      },
      {
        metric: "Time from data to payout",
        description: "Shorten the cycle from validated data to paid-out salary.",
      },
    ],
    color: "#34d399",
  },
  {
    id: "indberetninger",
    number: 4,
    title: "Reporting and settlement",
    shortTitle: "Reporting",
    description: "Report payroll to authorities and settle contributions correctly.",
    mainJob:
      "Ensure all reporting and settlements to authorities, pension providers and other parties happen correctly and on time.",
    universalStage: "execute",
    illustration: "send",
    satisfaction: {
      score: 42,
      trend: null,
      sampleSize: 10,
      history: [],
      npsBreakdown: null,
      topPain:
        "Payslips without YTD balances are misleading — AOs reject Payroll because of it.",
      source:
        "Airtable Feedback (n=10), Dovetail highlights (n=3), Jan–May 2026, proxy sentiment",
    },
    insights: [
      {
        id: "indberetninger-0",
        text: "A lot of AOs reject Payroll because we can't list YTD balances — they think payslips become misleading without year-to-date balances.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-04-15",
        category: "outcome",
        weight: "high",
        addedAt: "2026-04-15",
      },
      {
        id: "indberetninger-1",
        text: "Being able to pull a report — especially holiday-pay liability for a prior period (e.g. 30/6/xxxx). If we can combine our reports with the overview on Payroll's front page, we'd save clients a lot of time.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-13",
        category: "job-step",
        weight: "high",
        addedAt: "2026-02-13",
      },
      {
        id: "indberetninger-2",
        text: "Missing a single consolidated report he can send to the BO with all the deductions they need to be aware of each month.",
        source: "Airtable, Fanø, 2026-05-04",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-05-04",
      },
      {
        id: "indberetninger-3",
        text: "When an employee is terminated, you can save the termination without deciding how the remaining holiday pay should be paid out — that should be mandatory.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-03-25",
        category: "sub-job",
        weight: "high",
        addedAt: "2026-03-25",
      },
      {
        id: "indberetninger-4",
        text: "Multiple reporting destinations; no consolidated confirmation that everything has been reported correctly.",
        source: "Slite Handle Payroll journey, Stage 6, payroll bookkeeper",
        category: "job-step",
        weight: "medium",
      },
      {
        id: "indberetninger-5",
        text: "On this thing with zero-reporting, I'd actually really like automatic zero-reporting to be enabled every time I create a company in e-conomic Payroll.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "aspiration",
        weight: "medium",
        addedAt: "2025-11",
      },
      {
        id: "indberetninger-6",
        text: "Holiday accounting — you can see at the top what the employee has accrued; you shouldn't have to go back and forth to see the same thing.",
        source: "Airtable, Maybritts, 2026-02-03",
        category: "job-step",
        weight: "low",
        addedAt: "2026-02-03",
      },
      {
        id: "indberetninger-7",
        text: "It seems we should distinguish between AOs' requirements for ERP and their (often stricter) requirements for payroll systems.",
        source: "Airtable, KPMG, 2026-03-27",
        category: "general",
        weight: "medium",
        addedAt: "2026-03-27",
      },
      {
        id: "indberetninger-8",
        text: "When onboarding a new payroll system, with many things to keep track of, it would be nice to have a checklist to work through.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-13",
        category: "sub-job",
        weight: "medium",
        addedAt: "2026-02-13",
      },
      {
        id: "indberetninger-9",
        text: "The admin has to manually write 'payroll, month' on every payroll posting that's created.",
        source: "Airtable, Camilla, 2026-04-01",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-04-01",
      },
    ],
    subJobs: [
      {
        title: "eIndkomst",
        detail: "Automatic reporting of payroll data to the Danish Tax Agency.",
      },
      {
        title: "ATP",
        detail: "Pay ATP contributions.",
      },
      {
        title: "Pension",
        detail:
          "Report and pay pension contributions to pension providers.",
      },
      {
        title: "Feriekonto and Feriefonden",
        detail:
          "Report and pay if the company doesn't administer holiday pay itself.",
      },
      {
        title: "A-tax and AM contribution",
        detail: "Settle with the Tax Agency via the Tax Account.",
      },
      {
        title: "Refunds",
        detail:
          "Apply for sick-pay and parental-leave refunds via NemRefusion when relevant.",
      },
    ],
    relatedJobs: [
      "Stay up to date on legislation",
      "Follow up on refund cases",
      "Reconcile reports against the books",
    ],
    aspirations: [
      "Avoid fines and reminders from authorities",
      "Ensure the company receives every refund it's entitled to",
      "Be in top compliance shape",
    ],
    jobSteps: [
      "Report payroll data to authorities",
      "Settle contributions to ATP, pension and the Tax Agency",
      "Apply for relevant refunds",
      "Document all submissions",
      "Follow up on rejections or errors",
    ],
    outcomes: [
      {
        metric: "Share of on-time reports",
        description: "Keep 100% on-time across all deadlines.",
      },
      {
        metric: "Refunds received",
        description: "Maximise the refunds the company is entitled to.",
      },
      {
        metric: "Number of fines or reminders",
        description: "Keep this number at zero.",
      },
    ],
    color: "#f59e0b",
  },
  {
    id: "reguleringer",
    number: 5,
    title: "Payroll adjustments and changes",
    shortTitle: "Adjustments",
    description:
      "Handle ongoing changes to payroll terms across the year.",
    mainJob:
      "Ensure every change to an employee's payroll terms is reflected correctly in payroll — from hire to termination.",
    universalStage: "modify",
    illustration: "sliders",
    satisfaction: {
      score: 43,
      trend: null,
      sampleSize: 12,
      history: [],
      npsBreakdown: null,
      topPain:
        "Collective-agreement negotiations require manually changing hourly rates for many employees at once.",
      source:
        "Airtable Feedback (n=12), Dovetail highlights (n=10), Jan–May 2026, proxy sentiment",
    },
    insights: [
      {
        id: "reguleringer-0",
        text: "For mass updates across employees, we lack a tool. With collective-agreement negotiations, hourly rates need to change for many employees at once.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-03-12",
        category: "job-step",
        weight: "high",
        addedAt: "2026-03-12",
      },
      {
        id: "reguleringer-1",
        text: "Their wish is for all pay components to always update automatically — e.g. new mileage rate rules, daily-allowance rates etc.",
        source: "Airtable, Jysk Revision, 2026-01-23",
        category: "aspiration",
        weight: "high",
        addedAt: "2026-01-23",
      },
      {
        id: "reguleringer-2",
        text: "Many companies are members of a collective agreement — which means employees' hourly rates change continually. It would be a fantastic USP if we could offer date-based control.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-13",
        category: "sub-job",
        weight: "high",
        addedAt: "2026-02-13",
      },
      {
        id: "reguleringer-3",
        text: "90% of all salaried employees need to be paid the statutory holiday supplement plus the Great Prayer Day supplement in May, and many forget — this should be flaggable at company or employee level.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-04-30",
        category: "job-step",
        weight: "high",
        addedAt: "2026-04-30",
      },
      {
        id: "reguleringer-4",
        text: "And of course it's a challenge when we work with many different collective agreements. Because it's never the same date.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "outcome",
        weight: "high",
        addedAt: "2025-11",
      },
      {
        id: "reguleringer-5",
        text: "So in Danløn there's a feature called something like mass editing. And then I can go in and change this rate. It could be free choice or SH.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "related-job",
        weight: "high",
        addedAt: "2025-11",
      },
      {
        id: "reguleringer-6",
        text: "Yes, because that's what we see in those collective agreements. And then it lies years into the future, where we have to remember this.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "outcome",
        weight: "high",
        addedAt: "2025-11",
      },
      {
        id: "reguleringer-7",
        text: "And then I can go through all the employees and tick off or remove those who shouldn't be included. All my employees come up, so I don't have to go into each one.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "job-step",
        weight: "high",
        addedAt: "2025-11",
      },
      {
        id: "reguleringer-8",
        text: "We probably have the most clients with these SH and free-choice rates, so it would benefit the most clients.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "outcome",
        weight: "medium",
        addedAt: "2025-11",
      },
      {
        id: "reguleringer-9",
        text: "That's fine too, but if the employment contract or collective agreement says you have to have been employed for at least nine months before you're granted these accrued days off, then it's a problem.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "job-step",
        weight: "high",
        addedAt: "2025-11",
      },
      {
        id: "reguleringer-10",
        text: "I really have to be sharp about some employee groups when I create them, so I put them in the group covered by the same rates and rules.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "outcome",
        weight: "high",
        addedAt: "2025-11",
      },
      {
        id: "reguleringer-11",
        text: "Well, I think of date-based control as something that helps us remember some of these different pay types, or some of what needs to be attached to our employees.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "aspiration",
        weight: "high",
        addedAt: "2025-11",
      },
      {
        id: "reguleringer-12",
        text: "it would also be great if I could have multiple dates in advance. So I can actually enter these hourly rates across their entire apprenticeship period.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "aspiration",
        weight: "medium",
        addedAt: "2025-11",
      },
      {
        id: "reguleringer-13",
        text: "Their wish is that, like for Pension, you can use date-based control, and also be able to set that X employees should have Y rate from Z date.",
        source: "Airtable, Jysk Revision, 2026-01-23",
        category: "aspiration",
        weight: "high",
        addedAt: "2026-01-23",
      },
    ],
    subJobs: [
      {
        title: "Salary adjustments",
        detail:
          "Adjust pay for annual raises, position changes and bonus payouts.",
      },
      {
        title: "After-the-fact corrections",
        detail: "Correct errors from previous payroll periods.",
      },
      {
        title: "Terminations",
        detail:
          "Calculate final pay, holiday-pay balance and any severance.",
      },
      {
        title: "Creating new employees",
        detail: "Set up new hires correctly in the payroll system.",
      },
    ],
    relatedJobs: [
      "Coordinate with HR on hires and terminations",
      "Follow up on pay negotiations",
      "Document payroll history",
    ],
    aspirations: [
      "Handle changes smoothly without anything slipping through the cracks",
      "Treat every employee fairly and precisely",
      "Be a trustworthy partner for HR",
    ],
    jobSteps: [
      "Receive changes from HR or managers",
      "Calculate adjustments and final settlements",
      "Correct errors in previous periods",
      "Create or terminate employees",
      "Communicate the impact to the employee",
    ],
    outcomes: [
      {
        metric: "Time from notice to adjustment",
        description: "Reduce the time from HR notice to payroll being correct.",
      },
      {
        metric: "Corrections per employee",
        description: "Minimise the need to fix things retroactively.",
      },
      {
        metric: "Correct final pay on termination",
        description: "Get the calculation right the first time.",
      },
    ],
    color: "#f472b6",
  },
  {
    id: "bogforing",
    number: 6,
    title: "Posting payroll",
    shortTitle: "Posting",
    description: "Post payroll components correctly in the company's books.",
    mainJob:
      "Ensure all payroll entries, offsetting accounts and reconciliations are reflected correctly in the books and can be documented.",
    universalStage: "conclude",
    illustration: "ledger",
    satisfaction: {
      score: 46,
      trend: null,
      sampleSize: 10,
      history: [],
      npsBreakdown: null,
      topPain:
        "Payroll vouchers are created when payroll runs, not when it's approved — and dimensions aren't supported.",
      source:
        "Airtable Feedback (n=10), Slite Handle Payroll (n=1), Jan–May 2026, proxy sentiment",
    },
    insights: [
      {
        id: "bogforing-0",
        text: "Auto-reconciliation of payroll — strong interest in automatic reconciliation between the payroll system, the books and e-conomic.",
        source: "Airtable, Proceed2, 2026-04-21",
        category: "aspiration",
        weight: "high",
        addedAt: "2026-04-21",
      },
      {
        id: "bogforing-1",
        text: "Today the payroll voucher is only created when payroll runs — i.e. not when payroll is approved. The wish is that a voucher is created as soon as payroll is approved.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-04-01",
        category: "job-step",
        weight: "high",
        addedAt: "2026-04-01",
      },
      {
        id: "bogforing-2",
        text: "Posting on dimensions — rated more as need-to-have than nice-to-have. They want to be able to use dimensions.",
        source: "Airtable, Proceed2, 2026-04-21",
        category: "sub-job",
        weight: "high",
        addedAt: "2026-04-21",
      },
      {
        id: "bogforing-3",
        text: "Journal entries are often created manually or via CSV import; mapping errors between systems are common.",
        source: "Slite Handle Payroll journey, Stage 5, payroll bookkeeper",
        category: "job-step",
        weight: "high",
      },
      {
        id: "bogforing-4",
        text: "The bank account is set in multiple places in the setup — if the default account isn't correct, it has to be fixed in multiple places. Wish to consolidate the setup in one place.",
        source: "Airtable, Roesgaard, 2026-04-22",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-04-22",
      },
      {
        id: "bogforing-5",
        text: "The AO finds bookkeeping/integration challenging. It would be nice to be able to pick a separate posting — e.g. board fees to their own account.",
        source: "Airtable, Roesgaard, 2026-02-03",
        category: "job-step",
        weight: "high",
        addedAt: "2026-02-03",
      },
      {
        id: "bogforing-6",
        text: "When a chart of accounts is mapped to the accounting setup, the same accounts often need to be used multiple times. Wish to be able to tab and ctrl-c/ctrl-v.",
        source: "Airtable, Mads, 2026-03-25",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-03-25",
      },
      {
        id: "bogforing-7",
        text: "If the client doesn't use the standard chart of accounts, the system should suggest a setup.",
        source: "Airtable, Proceed2, 2026-04-21",
        category: "aspiration",
        weight: "medium",
        addedAt: "2026-04-21",
      },
      {
        id: "bogforing-8",
        text: "(Accounting setup) Missing/lacking descriptions — super important to know whether it's an operating account or, say, an intermediate account.",
        source: "Airtable, Nöhrlind, 2026-05-07",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-05-07",
      },
      {
        id: "bogforing-9",
        text: "Their wish for the upcoming time-tracking app is to be able to attach a project to e.g. hourly pay. That would help the client with e.g. project management.",
        source: "Airtable, Jysk Revision, 2026-01-23",
        category: "related-job",
        weight: "medium",
        addedAt: "2026-01-23",
      },
    ],
    subJobs: [
      {
        title: "Payroll entries",
        detail:
          "Post gross pay, A-tax, AM contribution, ATP, pension, holiday pay and net pay to the right accounts.",
      },
      {
        title: "Offsetting accounts",
        detail:
          "Reconcile payroll payouts against the company's bank account.",
      },
      {
        title: "Accruals",
        detail:
          "Accrue salary or holiday pay as needed.",
      },
      {
        title: "Reconciliation",
        detail:
          "Reconcile payroll-related balance sheet accounts (e.g. accrued holiday pay, A-tax payable).",
      },
    ],
    relatedJobs: [
      "Contribute to month-end close",
      "Prepare the annual financial statements",
      "Work with the auditor",
    ],
    aspirations: [
      "Have clean reconciliations with no open items",
      "Deliver correct numbers to management and the auditor",
      "Be fully in control of the books",
    ],
    jobSteps: [
      "Post payroll entries to the right accounts",
      "Reconcile against the bank account",
      "Accrue as needed",
      "Reconcile balance sheet accounts",
      "Document vouchers and notes",
    ],
    outcomes: [
      {
        metric: "Open items in reconciliation",
        description: "Keep the number of unexplained items as low as possible.",
      },
      {
        metric: "Time to month-end close",
        description: "Reduce time spent on payroll-related close.",
      },
      {
        metric: "Auditor remarks",
        description: "Minimise remarks from the auditor.",
      },
    ],
    color: "#22d3ee",
  },
  {
    id: "arkivering",
    number: 7,
    title: "Archiving and reporting",
    shortTitle: "Archiving",
    description:
      "Document, archive and report payroll-related data.",
    mainJob:
      "Ensure all documentation is preserved, and that management and authorities receive the reports they need.",
    universalStage: "conclude",
    illustration: "archive",
    satisfaction: {
      score: 50,
      trend: null,
      sampleSize: 8,
      history: [],
      npsBreakdown: null,
      topPain:
        "You can't download multiple payslips at once — and the Archive doesn't show the employee name.",
      source: "Airtable Feedback (n=8), Jan–May 2026, proxy sentiment",
    },
    insights: [
      {
        id: "arkivering-0",
        text: "In the Archive you can see employees' payslips, but not which employee a payslip belongs to. It would be a huge help if there were a column with the employee name.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-11",
        category: "job-step",
        weight: "high",
        addedAt: "2026-02-11",
      },
      {
        id: "arkivering-1",
        text: "It's frustrating for the AO that you can't download multiple payslips at once — you have to download them one by one. Wants to be able to download all payslips at once.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-04-20",
        category: "job-step",
        weight: "high",
        addedAt: "2026-04-20",
      },
      {
        id: "arkivering-2",
        text: "The AO says their payroll clients want their own logo to appear on employees' payslips, instead of e-conomic's.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-13",
        category: "aspiration",
        weight: "medium",
        addedAt: "2026-02-13",
      },
      {
        id: "arkivering-3",
        text: "The AO wants to be able to see how the payslip looks for employees on an ongoing basis without having to create a draft.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-03",
        category: "sub-job",
        weight: "medium",
        addedAt: "2026-02-03",
      },
      {
        id: "arkivering-4",
        text: "'Feriegodtgørelse' is an old-fashioned word for holiday pay and it only appears in one place in the whole system — when you're in Payroll, it should be called Feriepenge.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-04-27",
        category: "general",
        weight: "low",
        addedAt: "2026-04-27",
      },
      {
        id: "arkivering-5",
        text: "Language: Danløn's wording is more understandable, e.g. 'timeløn' instead of 'Normaltimer'.",
        source: "Airtable, Maybritts, 2026-02-03",
        category: "general",
        weight: "low",
        addedAt: "2026-02-03",
      },
      {
        id: "arkivering-6",
        text: "The new pay component, where you can change the name — it takes a while before it also shows up on the 'draft' payslip.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-02-25",
        category: "job-step",
        weight: "low",
        addedAt: "2026-02-25",
      },
      {
        id: "arkivering-7",
        text: "This AO wishes an HR function were built into e-conomic Payroll. They have many inputs about their employees they'd like to gather in one place.",
        source: "Airtable, Skov Regnskab, 2026-04-27",
        category: "aspiration",
        weight: "medium",
        addedAt: "2026-04-27",
      },
    ],
    subJobs: [
      {
        title: "Archiving documentation",
        detail:
          "Archive timesheets, refund applications and payslips in line with legislation and GDPR.",
      },
      {
        title: "Reports",
        detail:
          "Produce reports for management on payroll spend, absence statistics and budget follow-up.",
      },
      {
        title: "Year-end close",
        detail:
          "Prepare payroll statistics, file the annual statement with the Tax Agency and report to Statistics Denmark when relevant.",
      },
    ],
    relatedJobs: [
      "Comply with GDPR requirements",
      "Prepare for audit or review",
      "Deliver data for management reporting",
    ],
    aspirations: [
      "Have a well-organised archive where you can always find something",
      "Deliver insight that makes a difference for management",
      "Be ready when the auditor arrives",
    ],
    jobSteps: [
      "Archive vouchers and documentation systematically",
      "Generate reports for management",
      "Prepare the annual statement",
      "Report statistics to authorities",
      "Maintain access control and GDPR compliance",
    ],
    outcomes: [
      {
        metric: "Time to find a voucher",
        description: "Reduce time spent locating documentation.",
      },
      {
        metric: "Usefulness of management reports",
        description: "Increase management's use of payroll reports for decisions.",
      },
      {
        metric: "Audit readiness",
        description: "Be ready for an audit without extra preparation.",
      },
    ],
    color: "#fb7185",
  },
  {
    id: "kommunikation",
    number: 8,
    title: "Communication and support",
    shortTitle: "Communication",
    description:
      "Answer questions from employees and act as the link to authorities.",
    mainJob:
      "Give employees, managers and authorities the right answers about pay, tax, pension and holiday pay — quickly and understandably.",
    universalStage: "monitor",
    illustration: "chat",
    satisfaction: {
      score: 50,
      trend: null,
      sampleSize: 9,
      history: [],
      npsBreakdown: null,
      topPain:
        "The approval workflow creates duplicate work — BOs feel they put unnecessary load on their clients.",
      source:
        "Airtable Feedback (n=9), Dovetail highlights (n=3), Jan–May 2026, proxy sentiment",
    },
    insights: [
      {
        id: "kommunikation-0",
        text: "The AO is missing a better guide for new features. Would love it if a big feature like Autoløn came with a guide.",
        source: "Airtable, Fanø, 2026-05-04",
        category: "job-step",
        weight: "high",
        addedAt: "2026-05-04",
      },
      {
        id: "kommunikation-1",
        text: "Some AOs feel they're imposing duplicate work on their clients when the AO has to send payroll for approval. It would be ideal if the BO could choose whether to send payroll for approval.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-04-27",
        category: "sub-job",
        weight: "high",
        addedAt: "2026-04-27",
      },
      {
        id: "kommunikation-2",
        text: "Admin overview: it's experienced as annoying that Autoløn is shown coloured as 'not approved' — you have to click in to see whether it's Autoløn that's pending.",
        source: "Airtable, Proceed2, 2026-04-21",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-04-21",
      },
      {
        id: "kommunikation-3",
        text: "The AO experiences having to find an approver — but unfortunately a lot of people she doesn't know show up. Only the relevant approver should appear.",
        source: "Airtable, CB Administration, 2026-03-25",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-03-25",
      },
      {
        id: "kommunikation-4",
        text: "AO complains that we don't show all in-progress payrolls in the company overview. We claim to offer one consolidated overview, but Maus for Manges' payroll overrides all the others.",
        source: "Airtable, Feedback from Support and Sales, payroll bookkeeper, 2026-04-22",
        category: "job-step",
        weight: "high",
        addedAt: "2026-04-22",
      },
      {
        id: "kommunikation-5",
        text: "They've previously experienced that one of their employees was, for example, sick or on leave. So they can be 'behind' on holiday taken. They need to be able to see whether holiday has been taken or not.",
        source: "Airtable, Jysk Revision, 2026-01-23",
        category: "sub-job",
        weight: "medium",
        addedAt: "2026-01-23",
      },
      {
        id: "kommunikation-6",
        text: "Their wish would be to easily and quickly copy an employee or an employee group. It would save the AO a lot of time.",
        source: "Airtable, Jysk Revision, 2026-01-23",
        category: "aspiration",
        weight: "medium",
        addedAt: "2026-01-23",
      },
      {
        id: "kommunikation-7",
        text: "3 problems: 1. I can't sort employees. 2. I can't tab through the fields. 3. When I click on an employee and want to go back, I'm thrown back to page 1.",
        source: "Airtable, Dennis, 2026-01-28",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-01-28",
      },
      {
        id: "kommunikation-8",
        text: "The AO experienced that there's no info about outages, and that was the reason she couldn't add companies. Generally, faster notification about outages.",
        source: "Airtable, Roesgaard, 2026-02-03",
        category: "job-step",
        weight: "medium",
        addedAt: "2026-02-03",
      },
      {
        id: "kommunikation-9",
        text: "I think we could really meet people where they are if there were just a 'Next employee' button. Then we'd have made it a single click instead of clicking through several menus.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "job-step",
        weight: "medium",
        addedAt: "2025-11",
      },
      {
        id: "kommunikation-10",
        text: "I think what's become wonderful for us is really hearing that roadmap — we keep freezing on it. You're a big outfit, you're not a small, fast startup.",
        source: "Dovetail highlight, payroll bookkeeper, 2025-11",
        category: "outcome",
        weight: "medium",
        addedAt: "2025-11",
      },
    ],
    subJobs: [
      {
        title: "Employee questions",
        detail:
          "Answer questions about payslips, tax, pension and holiday pay.",
      },
      {
        title: "Dialogue with authorities",
        detail:
          "Maintain dialogue with the Tax Agency, Feriekonto and pension providers.",
      },
    ],
    relatedJobs: [
      "Equip managers to answer payroll questions",
      "Create FAQs and self-service",
      "Follow up on cases with authorities",
    ],
    aspirations: [
      "Be the helpful voice employees trust",
      "Build trust between the business and employees",
      "Reduce uncertainty around payroll",
    ],
    jobSteps: [
      "Receive and prioritise enquiries",
      "Investigate the basis for the case",
      "Reply with correct and understandable information",
      "Follow up until the employee feels assured",
      "Document answers and update the FAQ",
    ],
    outcomes: [
      {
        metric: "Response time to enquiries",
        description: "Reduce average response time.",
      },
      {
        metric: "First-contact resolution rate",
        description: "Increase first-contact resolution.",
      },
      {
        metric: "Employee satisfaction with payroll support",
        description: "Improve satisfaction measured in the employee survey.",
      },
    ],
    color: "#fde047",
  },
];
