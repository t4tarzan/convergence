import { pgTable, uuid, varchar, text, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { companies } from "./companies.js";
import { agents } from "./agents.js";

// Karpathy Loop experiments
export const experiments = pgTable("experiments", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  ceoAgentId: uuid("ceo_agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
  hypothesis: text("hypothesis").notNull(),
  variables: jsonb("variables").notNull().default({}),
  action: text("action").notNull(),
  metric: varchar("metric", { length: 100 }).notNull(),
  baselineValue: real("baseline_value").notNull(),
  resultValue: real("result_value"),
  outcome: varchar("outcome", { length: 20 }), // improved, neutral, regressed, error
  learnings: text("learnings"),
  skillCreated: varchar("skill_created", { length: 100 }),
  reverted: boolean("reverted").notNull().default(false),
  durationMs: integer("duration_ms"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});
