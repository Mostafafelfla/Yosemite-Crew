import { Job, Worker } from "bullmq";
import { redisConnection } from "../queues/bull.config.js";
import logger from "../utils/logger.js";
import { AppointmentJobs } from "../queues/appointment.queue.js";
import { AppointmentService } from "../services/appointment.service.js";

type AppointmentJobData = {
  graceMinutes?: number;
};

export const AppointmentWorker = new Worker(
  "appointments",
  async (job: Job<AppointmentJobData>) => {
    if (job.name === AppointmentJobs.MARK_NO_SHOW) {
      logger.info("🔔 Running Appointment No-Show Marker Job");

      const { graceMinutes } = job.data;

      await AppointmentService.markNoShowAppointments({
        graceMinutes: graceMinutes ?? 15,
      });

      return { success: true };
    }

    throw new Error(`Unknown job name: ${job.name}`);
  },
  { connection: redisConnection },
);

AppointmentWorker.on("completed", () =>
  logger.info("✅ Appointment worker completed"),
);

AppointmentWorker.on("failed", (job, err) =>
  logger.error("❌ TaskRecurrenceEngine failed", err),
);
