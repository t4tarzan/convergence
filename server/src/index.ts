import { serve } from "@hono/node-server";
import app from "./app.js";
import { connection } from "./lib/queue.js";

const PORT = Number(process.env.PORT ?? 3001);

console.log(`
  ╔═══════════════════════════════════════════╗
  ║         CONVERGENCE SERVER v0.1.0         ║
  ║  Autonomous Company Orchestration Engine  ║
  ╠═══════════════════════════════════════════╣
  ║  API:       http://localhost:${PORT}          ║
  ║  Docs:      http://localhost:${PORT}/reference ║
  ║  OpenAPI:   http://localhost:${PORT}/doc       ║
  ╚═══════════════════════════════════════════╝
`);

const server = serve({ fetch: app.fetch, port: PORT });

// Graceful shutdown
function shutdown() {
  console.log("\nShutting down...");
  connection.disconnect();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
