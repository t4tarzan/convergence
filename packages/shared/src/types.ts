import type { z } from "zod";
import type {
  companySchema,
  agentSchema,
  issueSchema,
  experimentSchema,
  skillSchema,
} from "./schemas.js";

export type Company = z.infer<typeof companySchema>;
export type Agent = z.infer<typeof agentSchema>;
export type Issue = z.infer<typeof issueSchema>;
export type Experiment = z.infer<typeof experimentSchema>;
export type Skill = z.infer<typeof skillSchema>;

// Adapter execution context
export interface AdapterExecuteContext {
  agentId: string;
  companyId: string;
  runId: string;
  adapterConfig: Record<string, unknown>;
  systemPrompt?: string;
  model?: string;
  timeoutMs: number;
  triggeredBy: "scheduler" | "manual" | "ceo" | "webhook";
  context: Record<string, unknown>;
}

// Adapter execution result
export interface AdapterExecuteResult {
  output: string;
  inputTokens?: number;
  outputTokens?: number;
  durationMs: number;
  cost?: number;
  error?: string;
}

// CEO experiment cycle
export interface ExperimentCycle {
  id: string;
  companyId: string;
  hypothesis: string;
  variables: Record<string, unknown>;
  action: string;
  measurement: {
    metric: string;
    before: number;
    after: number;
  };
  outcome: "improved" | "neutral" | "regressed" | "error";
  learnings: string;
  skillCreated?: string;
  durationMs: number;
  createdAt: Date;
}

// CEO memory snapshot
export interface CEOMemory {
  companyId: string;
  memory: string; // MEMORY.md content
  userProfile: string; // USER.md content
  lastUpdated: Date;
}

// WebSocket event types
export type WSEventType =
  | "heartbeat:start"
  | "heartbeat:complete"
  | "heartbeat:error"
  | "issue:updated"
  | "experiment:start"
  | "experiment:complete"
  | "skill:created"
  | "skill:updated"
  | "ceo:insight";
