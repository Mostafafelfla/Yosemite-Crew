import { Router } from "express";
import { SpecialityController } from "../controllers/web/speciality.controller.js";
import { authorizeCognito } from "../middlewares/auth.js";
import { withOrgPermissions, requirePermission } from "../middlewares/rbac.js";

const router = Router();

/* ======================================================
   PMS ROUTES (RBAC ENABLED)
   ====================================================== */

// Create speciality
router.post(
  "/",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("specialities:edit:any"),
  SpecialityController.create,
);

// Bulk create specialities
router.post(
  "/bulk",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("specialities:edit:any"),
  SpecialityController.createMany,
);

// List specialities by organisation
router.get(
  "/",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("specialities:view:any"),
  SpecialityController.getAllByOrganizationId,
);

router.get(
  "/:id",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("specialities:view:any"),
  SpecialityController.getSpecialityById,
);

// Update speciality
router.put(
  "/:id",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("specialities:edit:any"),
  SpecialityController.update,
);

// Delete speciality
router.delete(
  "/:organisationId/:specialityId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("specialities:edit:any"),
  SpecialityController.deleteSpeciality,
);

// Legacy compatibility route
router.get(
  "/organization/:organisationId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("specialities:view:any"),
  SpecialityController.getAllByOrganizationId,
);

export default router;
