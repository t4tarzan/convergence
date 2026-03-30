import { createRouter } from "../../lib/create-app.js";
import * as routes from "./companies.routes.js";
import * as handlers from "./companies.handlers.js";

const router = createRouter()
  .openapi(routes.listCompanies, handlers.listCompanies)
  .openapi(routes.createCompany, handlers.createCompany)
  .openapi(routes.getCompany, handlers.getCompany);

export default router;
