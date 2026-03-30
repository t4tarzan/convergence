import { pgTable, uuid, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";
import { companies } from "./companies.js";
import { agents } from "./agents.js";
import { experiments } from "./experiments.js";

// CEO learned skills (Hermes-style procedural memory)
export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  ceoAgentId: uuid("ceo_agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(), // Markdown with YAML frontmatter
  usageCount: integer("usage_count").notNull().default(0),
  lastUsedAt: timestamp("last_used_at"),
  sourceExperimentId: uuid("source_experiment_id").references(() => experiments.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
