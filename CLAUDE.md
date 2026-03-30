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
│   │   ├── routes/      — Express route handlers
│   │   ├── services/    — Business logic (companies, agents, issues, heartbeat)
│   │   ├── adapters/    — Agent execution backends (ollama, claude, hermes, process)
│   │   └── middleware/  — Auth, logging, error handling
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
- Express 5 with async route handlers
- WebSocket for real-time dashboard updates

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
