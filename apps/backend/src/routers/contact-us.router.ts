import { Router } from "express";
import { ContactController } from "../controllers/app/contact-us.controller.js";
import {
  authorizeCognito,
  authorizeCognitoMobile,
} from "../middlewares/auth.js";

const router = Router();

// Mobile/web public endpoint (user may or may not be logged in)
router.post("/contact", authorizeCognitoMobile, ContactController.create);
router.post("/contact-web", ContactController.createWeb);
router.post(
  "/attachments/presigned-url",
  ContactController.getAttachmentUploadUrl,
);

// Internal admin / support tools
// router.use(requireAdminAuth);
router.get("/requests", authorizeCognito, ContactController.list);
router.get("/requests/:id", authorizeCognito, ContactController.getById);
router.patch(
  "/requests/:id/status",
  authorizeCognito,
  ContactController.updateStatus,
);

export default router;
