import { apiReference } from "@scalar/hono-api-reference";
import type { AppOpenAPI } from "./types.js";

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.1.0",
    info: {
      title: "Convergence API",
      version: "0.1.0",
      description:
        "Autonomous company orchestration with self-evolving CEO agents",
    },
  });

  app.get(
    "/reference",
    apiReference({
      spec: { url: "/doc" },
      theme: "kepler",
      layout: "modern",
      defaultHttpClient: { targetKey: "javascript", clientKey: "fetch" },
    })
  );
}
