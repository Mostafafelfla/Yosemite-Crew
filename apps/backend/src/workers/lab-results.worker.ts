import { Worker } from "bullmq";
import { redisConnection } from "../queues/bull.config.js";
import { IdexxResultsService } from "../services/idexx-results.service.js";
import logger from "../utils/logger.js";

export const LabResultsWorker = new Worker(
  "lab-results",
  async () => {
    logger.info("🧪 Polling lab results...");
    await IdexxResultsService.pollLatest();
  },
  { connection: redisConnection },
);

LabResultsWorker.on("completed", () =>
  logger.info("✅ Lab results polling completed"),
);

LabResultsWorker.on("failed", (_, err) =>
  logger.error("❌ Lab results polling failed", err),
);
