import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createCompanySchema, companySchema } from "@convergence/shared";

// List all companies
export const listCompanies = createRoute({
  tags: ["Companies"],
  method: "get",
  path: "/companies",
  responses: {
    200: jsonContent(z.array(companySchema), "List of companies"),
  },
});

// Create a company
export const createCompany = createRoute({
  tags: ["Companies"],
  method: "post",
  path: "/companies",
  request: {
    body: jsonContentRequired(createCompanySchema, "Company to create"),
  },
  responses: {
    201: jsonContent(companySchema, "Created company"),
    422: jsonContent(
      z.object({ message: z.string() }),
      "Validation error"
    ),
  },
});

// Get company by ID
export const getCompany = createRoute({
  tags: ["Companies"],
  method: "get",
  path: "/companies/{id}",
  request: {
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    200: jsonContent(companySchema, "Company details"),
    404: jsonContent(
      z.object({ message: z.string() }),
      "Company not found"
    ),
  },
});

export type ListCompaniesRoute = typeof listCompanies;
export type CreateCompanyRoute = typeof createCompany;
export type GetCompanyRoute = typeof getCompany;
