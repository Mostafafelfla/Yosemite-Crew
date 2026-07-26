import { Router } from "express";
import { TaskFhirController } from "../controllers/web/task.fhir.controller.js";
import { authorizeCognito } from "../middlewares/auth.js";
import { requirePermission, withOrgPermissions } from "../middlewares/rbac.js";

const router = Router();

router.get(
  "/organisation/:organisationId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission(["tasks:view:any", "tasks:view:own"]),
  (req, res) => TaskFhirController.listEmployeeTasks(req, res),
);

router.get(
  "/companion/:patientId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission(["tasks:view:any", "tasks:view:own"]),
  (req, res) => TaskFhirController.listCompanionTasks(req, res),
);

router.post(
  "/organisation/:organisationId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission(["tasks:edit:any", "tasks:edit:own"]),
  (req, res) => TaskFhirController.create(req, res),
);

router.get(
  "/organisation/:organisationId/:taskId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission(["tasks:view:any", "tasks:view:own"]),
  (req, res) => TaskFhirController.getById(req, res),
);

router.patch(
  "/organisation/:organisationId/:taskId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission(["tasks:edit:any", "tasks:edit:own"]),
  (req, res) => TaskFhirController.update(req, res),
);

router.post(
  String.raw`/organisation/:organisationId/:taskId/\$status`,
  authorizeCognito,
  withOrgPermissions(),
  requirePermission(["tasks:edit:any", "tasks:edit:own"]),
  (req, res) => TaskFhirController.changeStatus(req, res),
);

export default router;
