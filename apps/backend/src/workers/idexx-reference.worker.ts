import { Worker } from "bullmq";
import { redisConnection } from "../queues/bull.config.js";
import { IdexxReferenceService } from "../services/idexx-reference.service.js";
import logger from "../utils/logger.js";

export const IdexxReferenceWorker = new Worker(
  "idexx-reference",
  async () => {
    logger.info("🧬 Running IDEXX reference sync...");
    await IdexxReferenceService.syncAll();
  },
  { connection: redisConnection },
);

IdexxReferenceWorker.on("completed", () =>
  logger.info("✅ IDEXX reference sync completed"),
);

IdexxReferenceWorker.on("failed", (_, err) =>
  logger.error("❌ IDEXX reference sync failed", err),
);
