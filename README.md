# Convergence

**Where companies run themselves.**

Convergence is an autonomous company orchestration platform that combines:
- **Paperclip-style dashboard** — companies, agents, org charts, goals, budgets, governance
- **Hermes-style CEO brain** — persistent memory, self-improving skills, recursive learning
- **Karpathy Loop engine** — mutate, execute, measure, keep-or-revert, repeat

Each company has a CEO agent that doesn't just delegate tasks — it learns from outcomes, creates skills for what works, and runs continuous improvement loops against measurable KPIs.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  React Dashboard (Convergence UI)                   │
│  Companies · Agents · Goals · Costs · CEO Insights  │
├─────────────────────────────────────────────────────┤
│  Hono API + Zod-OpenAPI + WebSocket (Real-time)     │
│  Routes · Services · Adapters · BullMQ Queues       │
├─────────────────────────────────────────────────────┤
│  CEO Engine (per company)                           │
│  ┌───────────────────────────────────────────────┐  │
│  │  Hermes Brain (skills + memory + delegation)  │  │
│  │  Karpathy Loop (experiment → measure → learn) │  │
│  │  Self-Evolution (DSPy + GEPA optimization)    │  │
│  └───────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│  Drizzle ORM + PGlite/PostgreSQL                    │
│  Companies · Agents · Issues · Experiments · Skills │
└─────────────────────────────────────────────────────┘
         │              │              │
    ┌────┴──┐    ┌─────┴──┐    ┌────┴──┐
    │Ollama │    │Claude  │    │Custom │
    │Local  │    │API     │    │Adapter│
    └───────┘    └────────┘    └───────┘
```

## Stack

- **UI**: React 19 + Vite + TailwindCSS 4 + shadcn/ui + TanStack (Router/Query/Table)
- **API**: Hono + @hono/zod-openapi + TypeScript (auto-generated OpenAPI docs at /reference)
- **ORM**: Drizzle ORM + drizzle-zod (schema as single source of truth)
- **DB**: PGlite (embedded, zero-config) → PostgreSQL (production)
- **Queues**: BullMQ + Redis (heartbeat scheduler, experiment runner, CEO tasks)
- **State**: Zustand (client) + TanStack Query (server)
- **Charts**: Tremor + Recharts
- **Logging**: Pino (structured JSON)
- **CEO Engine**: Python (Hermes core) + Node bridge
- **Models**: Ollama local (qwen3.5, glm-4.7-flash) + Claude API + any OpenAI-compatible

## References

- [paperclipai/paperclip](https://github.com/paperclipai/paperclip) — Dashboard & company model
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) — Recursive learning agent
- [NousResearch/hermes-agent-self-evolution](https://github.com/NousResearch/hermes-agent-self-evolution) — DSPy + GEPA optimization
- [karpathy/autoresearch](https://github.com/karpathy/autoresearch) — The improvement loop

## License

MIT
