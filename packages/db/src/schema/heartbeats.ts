import { pgTable, uuid, varchar, text, integer, real, timestamp, jsonb } from "drizzle-orm/pg-core";
import { agents } from "./agents.js";

// Heartbeat execution records
export const heartbeatRuns = pgTable("heartbeat_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  agentId: uuid("agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 20 }).notNull(), // success, failure, timeout
  output: text("output"),
  inputTokens: integer("input_tokens"),
  outputTokens: integer("output_tokens"),
  costCents: real("cost_cents"),
  durationMs: integer("duration_ms"),
  triggeredBy: varchar("triggered_by", { length: 20 }).notNull(), // scheduler, manual, ceo, webhook
  context: jsonb("context").default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
