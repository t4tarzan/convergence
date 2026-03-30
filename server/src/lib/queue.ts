import { Queue, Worker, type Job } from "bullmq";
import IORedis from "ioredis";

// Redis connection — reused by queues and workers
const REDIS_HOST = process.env.REDIS_HOST ?? "127.0.0.1";
const REDIS_PORT = Number(process.env.REDIS_PORT ?? 6379);

export const connection = new IORedis(REDIS_PORT, REDIS_HOST, {
  maxRetriesPerRequest: null,
});

// Queue names
export const QUEUES = {
  HEARTBEAT: "convergence:heartbeat",
  EXPERIMENT: "convergence:experiment",
  CEO_TASK: "convergence:ceo-task",
} as const;

// Heartbeat queue — periodic agent invocations
export const heartbeatQueue = new Queue(QUEUES.HEARTBEAT, {
  connection,
  defaultJobOptions: {
    removeOnComplete: { count: 1000 },
    removeOnFail: { age: 86400 }, // 24 hours
  },
});

// Experiment queue — Karpathy loop cycles
export const experimentQueue = new Queue(QUEUES.EXPERIMENT, {
  connection,
  defaultJobOptions: {
    removeOnComplete: { count: 500 },
    removeOnFail: { age: 86400 },
  },
});

// CEO task queue — delegated work from CEO agents
export const ceoTaskQueue = new Queue(QUEUES.CEO_TASK, {
  connection,
  defaultJobOptions: {
    removeOnComplete: { count: 1000 },
    removeOnFail: { age: 86400 },
  },
});
