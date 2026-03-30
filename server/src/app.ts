import { createApp } from "./lib/create-app.js";
import { configureOpenAPI } from "./lib/configure-open-api.js";
import companiesRouter from "./routes/companies/companies.index.js";

const app = createApp();

// OpenAPI docs + Scalar reference UI
configureOpenAPI(app);

// Mount route groups
const routes = app
  .route("/api", companiesRouter);
  // .route("/api", agentsRouter)       // Phase 1
  // .route("/api", issuesRouter)       // Phase 1
  // .route("/api", heartbeatsRouter)   // Phase 1
  // .route("/api", experimentsRouter)  // Phase 3
  // .route("/api", skillsRouter)       // Phase 2
  // .route("/api", activityRouter)     // Phase 1

// Export type for RPC client (end-to-end type safety)
export type AppType = typeof routes;

export default app;
