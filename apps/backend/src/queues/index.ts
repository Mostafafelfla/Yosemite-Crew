import logger from "../utils/logger.js";
import { registerTaskSchedulers } from "./task.schedulers.js";
import { registerTaskScheduleSchedulers } from "./task-schedule.scheduler.js";
import { registerAppointmentSchedulers } from "./appointment.scheduler.js";
import { registerIdexxReferenceScheduler } from "./idexx-reference.scheduler.js";
import { registerLabStatusScheduler } from "./lab-status.scheduler.js";
import { registerLabResultsScheduler } from "./lab-results.scheduler.js";

export async function initQueues() {
  await registerTaskSchedulers();
  await registerTaskScheduleSchedulers();
  await registerAppointmentSchedulers();
  await registerIdexxReferenceScheduler();
  await registerLabStatusScheduler();
  await registerLabResultsScheduler();
  logger.info("📬 BullMQ queues initialized");
}
