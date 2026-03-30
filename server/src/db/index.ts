import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "@convergence/db";

const DATA_DIR = process.env.DATABASE_URL ?? ".convergence/data";

const client = new PGlite(DATA_DIR);

export const db = drizzle(client, {
  schema,
  casing: "snake_case",
});

export type Database = typeof db;
