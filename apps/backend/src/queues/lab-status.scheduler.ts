import logger from "../utils/logger.js";
import { LabStatusQueue } from "./lab-status.queue.js";

const FIVE_MIN_MS = 5 * 60 * 1000;

export async function registerLabStatusScheduler() {
  await LabStatusQueue.add(
    "poll",
    {},
    {
      repeat: { every: FIVE_MIN_MS },
      jobId: "lab-status-poll-repeat",
    },
  );

  logger.info("✅ Lab status scheduler registered");
}
