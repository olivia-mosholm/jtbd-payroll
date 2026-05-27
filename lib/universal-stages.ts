export type UniversalStageId =
  | "define"
  | "locate"
  | "prepare"
  | "confirm"
  | "execute"
  | "monitor"
  | "modify"
  | "conclude";

export type UniversalStage = {
  id: UniversalStageId;
  number: number;
  label: string;
  verbs: string;
  description: string;
  color: string;
};

export const universalStages: UniversalStage[] = [
  {
    id: "define",
    number: 1,
    label: "Define",
    verbs: "Plan, select, determinate",
    description: "Determine the goals and prerequisites for the job.",
    color: "#c4b5fd",
  },
  {
    id: "locate",
    number: 2,
    label: "Locate",
    verbs: "Gather, access, retrieve",
    description: "Source the inputs needed to perform the job.",
    color: "#f9a8d4",
  },
  {
    id: "prepare",
    number: 3,
    label: "Prepare",
    verbs: "Setup, organize, examine",
    description: "Organise and prepare inputs so they are ready to use.",
    color: "#fda4af",
  },
  {
    id: "confirm",
    number: 4,
    label: "Confirm",
    verbs: "Validate, prioritize, decide",
    description: "Verify that everything is correct before the action itself.",
    color: "#fdba74",
  },
  {
    id: "execute",
    number: 5,
    label: "Execute",
    verbs: "Perform, transact, administer",
    description: "Perform the core action of the job.",
    color: "#fde047",
  },
  {
    id: "monitor",
    number: 6,
    label: "Monitor",
    verbs: "Verify, track, check",
    description: "Track that the job is progressing as expected.",
    color: "#bef264",
  },
  {
    id: "modify",
    number: 7,
    label: "Modify",
    verbs: "Update, adjust, maintain",
    description: "Adjust the job along the way when something changes.",
    color: "#86efac",
  },
  {
    id: "conclude",
    number: 8,
    label: "Conclude",
    verbs: "Store, finish, close",
    description: "Wrap up the job, document and close it down.",
    color: "#5eead4",
  },
];

export const universalStageById: Record<UniversalStageId, UniversalStage> =
  Object.fromEntries(universalStages.map((s) => [s.id, s])) as Record<
    UniversalStageId,
    UniversalStage
  >;
