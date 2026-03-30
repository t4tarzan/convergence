import { pgTable, uuid, varchar, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { companies } from "./companies.js";

// Immutable activity log
export const activityLog = pgTable("activity_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  actorType: varchar("actor_type", { length: 20 }).notNull(), // agent, system, human
  actorId: uuid("actor_id"),
  action: varchar("action", { length: 100 }).notNull(), // issue.created, agent.hired, experiment.completed, etc.
  targetType: varchar("target_type", { length: 50 }),
  targetId: uuid("target_id"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
