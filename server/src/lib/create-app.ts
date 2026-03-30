import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";
import { pinoLogger } from "hono-pino";
import { requestId } from "hono/request-id";
import pino from "pino";

import type { AppBindings } from "./types.js";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false });
}

export function createApp() {
  const app = createRouter();

  // Middleware stack
  app.use(requestId());
  app.use(
    pinoLogger({
      pino: pino({ level: process.env.LOG_LEVEL ?? "info" }),
    })
  );

  // Global error handlers
  app.notFound(notFound);
  app.onError(onError);

  return app;
}
