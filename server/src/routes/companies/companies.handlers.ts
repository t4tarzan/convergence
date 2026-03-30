import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { companies } from "@convergence/db";
import type { AppRouteHandler } from "../../lib/types.js";
import type {
  ListCompaniesRoute,
  CreateCompanyRoute,
  GetCompanyRoute,
} from "./companies.routes.js";

export const listCompanies: AppRouteHandler<ListCompaniesRoute> = async (c) => {
  const result = await db.select().from(companies);
  return c.json(result, 200);
};

export const createCompany: AppRouteHandler<CreateCompanyRoute> = async (c) => {
  const body = c.req.valid("json");
  const slug = body.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const [created] = await db
    .insert(companies)
    .values({ ...body, slug })
    .returning();

  return c.json(created, 201);
};

export const getCompany: AppRouteHandler<GetCompanyRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const [company] = await db
    .select()
    .from(companies)
    .where(eq(companies.id, id));

  if (!company) {
    return c.json({ message: "Company not found" }, 404);
  }

  return c.json(company, 200);
};
