import { Worker } from "bullmq";
import { redisConnection } from "../queues/bull.config.js";
import { TaskRecurrenceEngine } from "../services/task.recurrence.engine.js";
import logger from "src/utils/logger";

export const TaskRecurrenceWorker = new Worker(
  "task-recurrence",
  async () => {
    logger.info("🔄 Running Task Recurrence Engine...");
    await TaskRecurrenceEngine.run();
  },
  { connection: redisConnection },
);

TaskRecurrenceWorker.on("completed", () =>
  logger.info("✅ TaskRecurrenceEngine completed"),
);

TaskRecurrenceWorker.on("failed", (job, err) =>
  logger.error("❌ TaskRecurrenceEngine failed", err),
);
