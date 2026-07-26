import "dotenv/config";
import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";
import { initQueues } from "./queues/index.js";
import { configureStreamUploadPolicy } from "./config/stream-upload-policy.js";
import logger from "./utils/logger.js";
import "./workers/index.js";

const PORT = process.env.PORT || 3000;

// NOSONAR – top-level await not supported in this runtime
async function startServer() {
  try {
    await connectDB();
    await initQueues();
    await configureStreamUploadPolicy();
    const app = createApp();

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    logger.error("Failed to start server", err);
    process.exit(1);
  }
}

void startServer();
