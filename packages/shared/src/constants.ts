// Agent statuses
export const AGENT_STATUS = {
  ACTIVE: "active",
  IDLE: "idle",
  PAUSED: "paused",
  ERROR: "error",
  TERMINATED: "terminated",
} as const;

// Issue statuses (kanban columns)
export const ISSUE_STATUS = {
  BACKLOG: "backlog",
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  IN_REVIEW: "in_review",
  DONE: "done",
  CANCELLED: "cancelled",
} as const;

// Issue priorities
export const ISSUE_PRIORITY = {
  CRITICAL: "critical",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;

// Adapter types
export const ADAPTER_TYPE = {
  OLLAMA: "ollama",
  CLAUDE: "claude",
  HERMES_CEO: "hermes_ceo",
  PROCESS: "process",
  HTTP: "http",
} as const;

// Experiment outcomes
export const EXPERIMENT_OUTCOME = {
  IMPROVED: "improved",
  NEUTRAL: "neutral",
  REGRESSED: "regressed",
  ERROR: "error",
} as const;

// CEO Engine
export const CEO_DEFAULTS = {
  MEMORY_MAX_CHARS: 2200,
  USER_PROFILE_MAX_CHARS: 1375,
  SKILL_NUDGE_INTERVAL: 15,
  MEMORY_NUDGE_INTERVAL: 10,
  EXPERIMENT_TIMEOUT_MS: 300_000, // 5 minutes (Karpathy default)
} as const;
