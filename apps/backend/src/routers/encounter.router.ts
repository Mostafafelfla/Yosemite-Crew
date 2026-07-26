import { Router } from "express";
import { authorizeCognito } from "../middlewares/auth.js";
import { requirePermission, withOrgPermissions } from "../middlewares/rbac.js";
import { EncounterController } from "../controllers/web/case-encounter.controller.js";

const router = Router();

router.post(
  "/",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("appointments:edit:any"),
  EncounterController.create,
);

router.patch(
  "/:id",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("appointments:edit:any"),
  EncounterController.update,
);

router.post(
  String.raw`/:id/\$discharge`,
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("appointments:edit:any"),
  EncounterController.discharge,
);

router.post(
  String.raw`/:id/\$assign-unit`,
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("appointments:edit:any"),
  EncounterController.assignUnit,
);

router.get(
  String.raw`/:id/\$unit-assignments`,
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("appointments:view:any"),
  EncounterController.listUnitAssignments,
);

router.get(
  String.raw`/:id/\$admission-unit-assignments`,
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("appointments:view:any"),
  EncounterController.listAdmissionUnitAssignments,
);

router.post(
  String.raw`/:id/\$start`,
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("appointments:edit:any"),
  EncounterController.start,
);

router.post(
  String.raw`/:id/\$ready-for-discharge`,
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("appointments:edit:any"),
  EncounterController.readyForDischarge,
);

router.post(
  String.raw`/:id/\$undo-ready-for-discharge`,
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("appointments:edit:any"),
  EncounterController.undoReadyForDischarge,
);

router.get(
  String.raw`/\$active-inpatients`,
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("appointments:view:any"),
  EncounterController.listActiveInpatients,
);

router.get(
  "/:id",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("appointments:view:any"),
  EncounterController.getById,
);

router.get(
  "/",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("appointments:view:any"),
  EncounterController.list,
);

export default router;
