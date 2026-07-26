import logger from "../utils/logger.js";
import { AppointmentQueue, AppointmentJobs } from "./appointment.queue.js";

export async function registerAppointmentSchedulers() {
  // 🔄 Appointment Status Updater: every 15 minutes
  await AppointmentQueue.add(
    AppointmentJobs.MARK_NO_SHOW,
    {},
    {
      repeat: { every: 60 * 1000 },
      jobId: "appointment-status-updater-repeat",
    },
  );

  logger.info("✅ Appointment schedulers registered");
}
