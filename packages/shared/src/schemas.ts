import { z } from "zod";

// --- Companies ---

export const companySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z.string(),
  description: z.string().optional(),
  issuePrefix: z.string().max(10),
  budgetMonthlyCents: z.number().int().nonnegative(),
  spentMonthlyCents: z.number().int().nonnegative().default(0),
  requireApproval: z.boolean().default(false),
  ceoAgentId: z.string().uuid().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createCompanySchema = companySchema.pick({
  name: true,
  description: true,
  issuePrefix: true,
  budgetMonthlyCents: true,
  requireApproval: true,
});

// --- Agents ---

export const agentSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  name: z.string().min(1).max(100),
  title: z.string().max(100).optional(),
  role: z.string().max(200).optional(),
  adapterType: z.enum(["ollama", "claude", "hermes_ceo", "process", "http"]),
  adapterConfig: z.record(z.unknown()).default({}),
  model: z.string().optional(),
  systemPrompt: z.string().optional(),
  status: z.enum(["active", "idle", "paused", "error", "terminated"]).default("idle"),
  isCeo: z.boolean().default(false),
  reportsTo: z.string().uuid().optional(),
  budgetMonthlyCents: z.number().int().nonnegative().default(0),
  spentMonthlyCents: z.number().int().nonnegative().default(0),
  totalRuns: z.number().int().nonnegative().default(0),
  lastHeartbeatAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createAgentSchema = agentSchema.pick({
  companyId: true,
  name: true,
  title: true,
  role: true,
  adapterType: true,
  adapterConfig: true,
  model: true,
  systemPrompt: true,
  isCeo: true,
  reportsTo: true,
  budgetMonthlyCents: true,
});

// --- Issues ---

export const issueSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  identifier: z.string(), // e.g., "CONV-1"
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  status: z.enum(["backlog", "todo", "in_progress", "in_review", "done", "cancelled"]).default("backlog"),
  priority: z.enum(["critical", "high", "medium", "low"]).default("medium"),
  assigneeId: z.string().uuid().optional(),
  createdById: z.string().uuid().optional(),
  projectId: z.string().uuid().optional(),
  experimentId: z.string().uuid().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  completedAt: z.date().optional(),
});

// --- Experiments (Karpathy Loop) ---

export const experimentSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  ceoAgentId: z.string().uuid(),
  hypothesis: z.string(),
  variables: z.record(z.unknown()),
  action: z.string(),
  metric: z.string(),
  baselineValue: z.number(),
  resultValue: z.number().optional(),
  outcome: z.enum(["improved", "neutral", "regressed", "error"]).optional(),
  learnings: z.string().optional(),
  skillCreated: z.string().optional(),
  reverted: z.boolean().default(false),
  durationMs: z.number().int().optional(),
  createdAt: z.date(),
  completedAt: z.date().optional(),
});

// --- Skills (CEO Learned Procedures) ---

export const skillSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  ceoAgentId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string(),
  content: z.string(), // Markdown with YAML frontmatter
  usageCount: z.number().int().nonnegative().default(0),
  lastUsedAt: z.date().optional(),
  sourceExperimentId: z.string().uuid().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
