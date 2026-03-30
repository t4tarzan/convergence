# Convergence — Product Specification

## Vision

A platform where you spin up an AI company, assign it a CEO agent that learns and improves autonomously, and watch it evolve through a dashboard. The CEO doesn't just run tasks — it runs experiments, learns from results, builds skills, and gets better over time.

---

## Phase 1: Foundation (Dashboard + Data Model)

### From Paperclip — The Company OS Layer

- [ ] **Company CRUD** — create/edit/delete companies with name, budget, issue prefix
- [ ] **Agent Management** — hire agents with adapter type, role, title, budget cap
- [ ] **Org Chart** — visual hierarchy (CEO at top, workers below, reports_to chain)
- [ ] **Issue Board** — kanban (backlog → todo → in_progress → review → done)
- [ ] **Goals & Projects** — strategic hierarchy (goal → project → issues)
- [ ] **Cost Tracking** — per-agent token/cost tracking, monthly budgets, alerts
- [ ] **Activity Log** — immutable audit trail of all events
- [ ] **Governance** — approval gates for hiring agents, budget changes
- [ ] **Heartbeat Scheduler** — periodic agent invocation with configurable interval
- [ ] **Adapter Registry** — pluggable backends (ollama, claude, hermes, process, http)

### Database Schema (Drizzle)

Core tables:
- companies, agents, issues, goals, projects
- heartbeat_runs, heartbeat_run_events
- cost_events, activity_log, approvals
- company_secrets (AES-256-GCM encrypted)

New tables for Convergence:
- experiments (Karpathy loop records)
- skills (CEO learned procedures)
- ceo_memory (persistent declarative memory per company)
- ceo_sessions (conversation history for CEO agents)

### Dashboard Pages

1. **Home** — company selector, global metrics
2. **Dashboard** — agent status, issue counts, costs, activity feed
3. **Agents** — table with status, heartbeat, tasks, budget
4. **Agent Detail** — config, runtime state, recent runs, cost breakdown
5. **Issues** — kanban board with drag-drop
6. **Issue Detail** — description, comments, execution history
7. **Goals** — strategic tree with completion tracking
8. **Costs** — breakdown by agent, model, time period

---

## Phase 2: CEO Engine (Hermes Brain)

### From Hermes — The Recursive Learning Layer

- [ ] **CEO Agent Type** — special agent role that manages a company
- [ ] **Persistent Memory** — MEMORY.md + USER.md equivalent per company
- [ ] **Skill System** — CEO creates/updates skills from experience
- [ ] **Session Search** — CEO can recall past decisions and outcomes
- [ ] **Tool System** — CEO can use company tools (create issues, assign agents, check metrics)
- [ ] **Delegation** — CEO spawns sub-tasks for worker agents
- [ ] **Context Compression** — smart summarization for long-running sessions
- [ ] **Memory Nudges** — periodic prompts to persist learning

### CEO Tools (callable by the CEO agent)

- `create_issue` — create work items for the company
- `assign_agent` — assign an issue to a worker agent
- `check_metrics` — read company KPIs (costs, throughput, success rate)
- `review_results` — inspect completed work
- `update_strategy` — modify company goals based on learnings
- `create_skill` — persist a learned procedure
- `run_experiment` — trigger a Karpathy loop cycle

---

## Phase 3: Karpathy Loop (Self-Evolution)

### The Improvement Engine

- [ ] **Experiment Model** — hypothesis, variables, action, measurement, outcome
- [ ] **Keep-or-Revert** — only improvements survive, failures roll back
- [ ] **Fixed Budget Per Experiment** — time-boxed execution
- [ ] **Structured Experiment Log** — every cycle recorded with full context
- [ ] **CEO Insights Page** — dashboard view of experiment history, win rate, learnings
- [ ] **Fitness Functions** — pluggable KPI measurement (success rate, cost efficiency, throughput)
- [ ] **Auto-Loop** — CEO can schedule recurring experiments

### CEO Insights Dashboard (new page)

- Experiment timeline (runs, outcomes, trends)
- Skill evolution (created, updated, usage count)
- Memory growth (what the CEO has learned)
- Win rate (% of experiments that improved KPIs)
- Learning velocity (improvements per time period)

---

## Phase 4: Multi-Company + Evolution

- [ ] **Multiple Companies** — each with its own CEO agent
- [ ] **Cross-Company Learning** — skills shareable between CEOs
- [ ] **CEO Marketplace** — export/import trained CEO configurations
- [ ] **DSPy Integration** — optimize CEO prompts via hermes-agent-self-evolution
- [ ] **Tournament Mode** — CEOs compete on identical tasks, best strategy wins

---

## Tech Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| DB | PGlite (dev) / PostgreSQL (prod) | Zero-config local, scale to prod |
| ORM | Drizzle | Type-safe, fast, great DX |
| UI | React 19 + Vite + Tailwind 4 | Modern, fast, familiar from SeaClip |
| API | Express 5 + TypeScript | Proven, async handlers |
| CEO Brain | Python (Hermes core) via HTTP bridge | Leverage existing Hermes tool system |
| Local Models | Ollama (qwen3.5, glm-4.7-flash) | Already running on hub |
| Cloud Models | Claude API (Haiku for fast, Opus for deep) | Best reasoning |

---

## Non-Goals (for now)

- Edge mesh / spoke devices (SeaClip-Lite handles this)
- Voice control (Stella handles this)
- Telegram bot integration (can add later)
- Multi-user auth (single-operator for now)
