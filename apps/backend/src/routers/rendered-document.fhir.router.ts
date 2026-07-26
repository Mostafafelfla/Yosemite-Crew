import { Router } from "express";
import { RenderedDocumentFhirController } from "../controllers/web/rendered-document.fhir.controller.js";
import { authorizeCognito } from "../middlewares/auth.js";
import { requirePermission, withOrgPermissions } from "../middlewares/rbac.js";

const router = Router();

router.get(
  "/organisation/:organisationId/:renderedDocumentId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission(["forms:view:any", "prescription:view:any"]),
  (req, res) => RenderedDocumentFhirController.getRenderedDocument(req, res),
);

router.get(
  "/organisation/:organisationId/:renderedDocumentId/pdf",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission(["forms:view:any", "prescription:view:any"]),
  (req, res) => RenderedDocumentFhirController.getRenderedDocumentPdf(req, res),
);

router.post(
  "/organisation/:organisationId/:renderedDocumentId/rerender-pdf",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission(["forms:edit:any", "prescription:edit:any"]),
  (req, res) =>
    RenderedDocumentFhirController.rerenderRenderedDocumentPdf(req, res),
);

router.post(
  "/organisation/:organisationId/:renderedDocumentId/sign",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission(["forms:edit:any", "prescription:edit:any"]),
  (req, res) => RenderedDocumentFhirController.signRenderedDocument(req, res),
);

export default router;
