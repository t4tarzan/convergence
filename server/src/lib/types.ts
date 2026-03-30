import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

// Bindings shared across all routes
export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

// Typed Hono app
export type AppOpenAPI = OpenAPIHono<AppBindings>;

// Type-safe route handler
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;
