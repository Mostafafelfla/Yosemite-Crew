import { Router } from "express";
import { CoParentInviteController } from "../controllers/app/coparentInvite.controller.js";
import { authorizeCognitoMobile } from "../middlewares/auth.js";

const router = Router();

router.post(
  "/sent",
  authorizeCognitoMobile,
  CoParentInviteController.sendInvite,
);
router.post(
  "/accept",
  authorizeCognitoMobile,
  CoParentInviteController.acceptInvite,
);
router.post("/validate", CoParentInviteController.validateInvite);
router.post("/decline", CoParentInviteController.declineInvite);
router.get(
  "/pending",
  authorizeCognitoMobile,
  CoParentInviteController.getPendingInvites,
);

export default router;
