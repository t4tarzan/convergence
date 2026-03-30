import { pgTable, uuid, varchar, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { companies } from "./companies.js";

export const agents = pgTable("agents", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  title: varchar("title", { length: 100 }),
  role: text("role"),
  adapterType: varchar("adapter_type", { length: 50 }).notNull(), // ollama, claude, hermes_ceo, process, http
  adapterConfig: jsonb("adapter_config").notNull().default({}),
  model: varchar("model", { length: 100 }),
  systemPrompt: text("system_prompt"),
  status: varchar("status", { length: 20 }).notNull().default("idle"),
  isCeo: boolean("is_ceo").notNull().default(false),
  reportsTo: uuid("reports_to"), // self-referencing FK
  budgetMonthlyCents: integer("budget_monthly_cents").notNull().default(0),
  spentMonthlyCents: integer("spent_monthly_cents").notNull().default(0),
  totalRuns: integer("total_runs").notNull().default(0),
  lastHeartbeatAt: timestamp("last_heartbeat_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// CEO persistent memory (Hermes-style MEMORY.md + USER.md per company)
export const ceoMemory = pgTable("ceo_memory", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  agentId: uuid("agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
  memory: text("memory").notNull().default(""), // environment observations
  profile: text("profile").notNull().default(""), // company profile / patterns
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
