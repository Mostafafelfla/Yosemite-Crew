import { Worker } from "bullmq";
import { redisConnection } from "../queues/bull.config.js";
import { LabStatusService } from "../services/lab-status.service.js";
import logger from "../utils/logger.js";

export const LabStatusWorker = new Worker(
  "lab-status",
  async () => {
    logger.info("🧪 Polling lab order statuses...");
    await LabStatusService.pollPending();
  },
  { connection: redisConnection },
);

LabStatusWorker.on("completed", () =>
  logger.info("✅ Lab status polling completed"),
);

LabStatusWorker.on("failed", (_, err) =>
  logger.error("❌ Lab status polling failed", err),
);
