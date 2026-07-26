import { Queue } from "bullmq";
import { defaultQueueOptions } from "./bull.config.js";

export const IdexxReferenceQueue = new Queue("idexx-reference", {
  ...defaultQueueOptions,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: 10,
  },
});
