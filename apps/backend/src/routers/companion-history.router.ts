import { Router } from "express";
import { authorizeCognito } from "../middlewares/auth.js";
import { withOrgPermissions, requirePermission } from "../middlewares/rbac.js";
import { CompanionHistoryController } from "../controllers/web/companion-history.controller.js";

const router = Router();

router.get(
  "/pms/organisation/:organisationId/companion/:patientId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("companions:view:any"),
  CompanionHistoryController.listForCompanion,
);

export default router;
