import logger from "../utils/logger.js";
import { TaskScheduleQueue } from "./task-schedule.queue.js";

export async function registerTaskScheduleSchedulers() {
  await TaskScheduleQueue.add(
    "run",
    {},
    {
      repeat: { every: 60 * 1000 },
      jobId: "task-schedule-repeat",
    },
  );

  logger.info("✅ Task schedule schedulers registered");
}
