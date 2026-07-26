import { Router } from "express";
import { AuditTrailController } from "../controllers/web/audit-trail.controller.js";
import { authorizeCognito } from "../middlewares/auth.js";
import { requirePermission, withOrgPermissions } from "../middlewares/rbac.js";

const router = Router();

router.get(
  "/companion/:patientId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("audit:view:any"),
  AuditTrailController.listForCompanion,
);
router.post(
  "/companion",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("audit:view:any"),
  AuditTrailController.listForCompanion,
);

router.get(
  "/appointment/:appointmentId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("audit:view:any"),
  AuditTrailController.listForAppointment,
);
router.post(
  "/appointment",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("audit:view:any"),
  AuditTrailController.listForAppointment,
);

export default router;
