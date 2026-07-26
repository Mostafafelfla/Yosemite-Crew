import { Router } from "express";
import { OrganizationDocumentController } from "../controllers/web/organisation-document.controller.js";
import {
  authorizeCognito,
  authorizeCognitoMobile,
} from "../middlewares/auth.js";
import { withOrgPermissions, requirePermission } from "../middlewares/rbac.js";

const router = Router();

/* ======================================================
   PMS ROUTES (RBAC ENABLED)
   ====================================================== */

// Upload document file
router.post(
  "/pms/:orgId/documents/upload",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("document:edit:any"),
  OrganizationDocumentController.uploadFile,
);

// Create document record
router.post(
  "/pms/:orgId/documents",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("document:edit:any"),
  OrganizationDocumentController.create,
);

// Update document metadata
router.patch(
  "/pms/:orgId/documents/:documentId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("document:edit:any"),
  OrganizationDocumentController.update,
);

// Delete document
router.delete(
  "/pms/:orgId/documents/:documentId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("document:edit:any"),
  OrganizationDocumentController.remove,
);

// List documents for organisation
router.get(
  "/pms/:orgId/documents",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("document:view:any"),
  OrganizationDocumentController.list,
);

// Get document by id
router.get(
  "/pms/:orgId/documents/:documentId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("document:view:any"),
  OrganizationDocumentController.getById,
);

// Upsert policy documents
router.post(
  "/pms/:orgId/documents/policy",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("document:edit:any"),
  OrganizationDocumentController.upsertPolicy,
);

/* ======================================================
   MOBILE ROUTES (PUBLIC / READ-ONLY)
   ====================================================== */

router.get(
  "/mobile/:orgId/documents",
  authorizeCognitoMobile,
  OrganizationDocumentController.listPublic,
);

export default router;
