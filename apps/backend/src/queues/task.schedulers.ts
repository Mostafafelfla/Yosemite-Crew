import logger from "src/utils/logger";
import { TaskRecurrenceQueue, TaskReminderQueue } from "./task.queues.js";

export async function registerTaskSchedulers() {
  // 🔄 Recurrence: every 6 hours
  await TaskRecurrenceQueue.add(
    "run",
    {},
    {
      repeat: { every: 6 * 60 * 60 * 1000 },
      jobId: "task-recurrence-repeat",
    },
  );

  // 🔔 Reminder: every 1 minute
  await TaskReminderQueue.add(
    "run",
    {},
    {
      repeat: { every: 60 * 1000 },
      jobId: "task-reminder-repeat",
    },
  );

  logger.info("✅ Task schedulers registered");
}
