import { pgTable, uuid, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";
import { companies } from "./companies.js";
import { agents } from "./agents.js";

export const issues = pgTable("issues", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  identifier: varchar("identifier", { length: 20 }).notNull(), // "CONV-1"
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 20 }).notNull().default("backlog"),
  priority: varchar("priority", { length: 20 }).notNull().default("medium"),
  assigneeId: uuid("assignee_id").references(() => agents.id),
  createdById: uuid("created_by_id").references(() => agents.id),
  projectId: uuid("project_id"), // FK to projects table (Phase 2)
  experimentId: uuid("experiment_id"), // linked experiment if created by CEO loop
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const issueComments = pgTable("issue_comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  issueId: uuid("issue_id").notNull().references(() => issues.id, { onDelete: "cascade" }),
  agentId: uuid("agent_id").references(() => agents.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
