import { Router } from "express";
import { DeviceTokenController } from "../controllers/app/deviceToken.controller.js";
import { authorizeCognitoMobile } from "../middlewares/auth.js";

const router = Router();

// Route to register a device token
router.post(
  "/register",
  authorizeCognitoMobile,
  DeviceTokenController.registerDeviceToken,
);

// Route to unregister a device token
router.post(
  "/unregister",
  authorizeCognitoMobile,
  DeviceTokenController.unregisterDeviceToken,
);

export default router;
