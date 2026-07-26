import { Worker } from "bullmq";
import { redisConnection } from "../queues/bull.config.js";
import { TaskReminderEngine } from "../services/task.reminder.engine.js";
import logger from "../utils/logger.js";

export const TaskReminderWorker = new Worker(
  "task-reminder",
  async () => {
    logger.info("🔔 Running Task Reminder Engine...");
    await TaskReminderEngine.run();
  },
  { connection: redisConnection },
);

TaskReminderWorker.on("completed", () =>
  logger.info("✅ TaskReminderEngine completed"),
);

TaskReminderWorker.on("failed", (job, err) =>
  logger.error("❌ TaskReminderEngine failed", err),
);
