# Convergence — AI Agent Coding Guide

## What is this project?

Convergence is an autonomous company orchestration platform. Each "company" is managed by a CEO agent (Hermes-based recursive learner) that self-improves through a Karpathy-style experiment loop.

## Architecture

```
convergence/
├── packages/
│   ├── db/              — Drizzle ORM schema + migrations
│   └── shared/          — Shared types, Zod schemas, constants
├── server/
│   ├── src/
│   │   ├── routes/      — Hono Zod-OpenAPI route definitions + handlers
│   │   ├── services/    — Business logic (companies, agents, issues, heartbeat)
│   │   ├── adapters/    — Agent execution backends (ollama, claude, hermes, process)
│   │   ├── lib/         — App factory, types, queue, OpenAPI config
│   │   └── db/          — Drizzle + PGlite connection
│   └── ceo-engine/      — Hermes CEO brain + Karpathy loop bridge
├── ui/
│   └── src/
│       ├── pages/       — Dashboard, Agents, Issues, Goals, CEO Insights, Costs
│       ├── components/  — Shared UI components (MetricCard, StatusBadge, etc.)
│       ├── api/         — Typed fetch clients
│       └── context/     — CompanyContext, ThemeContext
├── docs/                — Architecture docs, ADRs
└── scripts/             — Dev tooling, seed data
```

## Coding conventions

- TypeScript strict mode for server + UI
- Zod for all API validation (shared package)
- Drizzle ORM for all DB queries (no raw SQL)
- React 19 with function components + hooks only
- TailwindCSS 4 for styling (no CSS modules)
- Hono + @hono/zod-openapi for type-safe API routes with auto-generated OpenAPI docs
- BullMQ + Redis for job queues (heartbeat scheduler, experiment runner, CEO tasks)
- WebSocket (ws) for real-time dashboard updates
- Pino for structured JSON logging
- Zustand for client state, TanStack Query for server state, TanStack Router for routing

## Server route pattern

Each feature has 3 files:
- `*.routes.ts` — Zod-OpenAPI route definitions (request/response schemas)
- `*.handlers.ts` — Type-safe handlers using `AppRouteHandler<RouteType>`
- `*.index.ts` — Router composition via `.openapi(route, handler)` chains

Business logic lives in `services/` — handlers are thin, services are testable.

## Key concepts

- **Company** — An org unit with budget, agents, goals, and a CEO agent
- **CEO Agent** — Hermes-based recursive learner assigned to a company
- **Heartbeat** — Periodic agent invocation (configurable interval)
- **Experiment** — A Karpathy-loop cycle: hypothesis → action → measurement → keep/revert
- **Skill** — Learned procedure stored by CEO, reusable across sessions
- **Adapter** — Pluggable agent execution backend

## Reference repos (cloned alongside)

- `../paperclip/` — Dashboard patterns, data model, adapter system
- `../hermes-agent/` — CEO brain, skills, memory, tool system
- `../hermes-agent-self-evolution/` — DSPy + GEPA evolutionary optimization
- `../hono-openapi-ref/` — Hono + Zod-OpenAPI + Drizzle patterns
- `../hono-starter-ref/` — Hono + BullMQ integration pattern
- `../shadcn-admin-ref/` — Dashboard UI patterns (sidebar, theme, layout)
- `../kanban-ref/` — dnd-kit kanban board with shadcn/ui
