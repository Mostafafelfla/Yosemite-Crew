import { NextFunction, Request, Response, Router } from "express";
import { authorizeCognito } from "../middlewares/auth.js";
import { requirePermission, withOrgPermissions } from "../middlewares/rbac.js";
import { CatalogController } from "../controllers/web/catalog.controller.js";

const router = Router();

const attachOrganisationIdFromQuery = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const organization =
    typeof req.query.organization === "string"
      ? req.query.organization
      : typeof req.query["provided-by"] === "string"
        ? req.query["provided-by"]
        : undefined;

  if (organization && !req.params.organisationId) {
    req.params.organisationId = organization.replace(/^Organization\//, "");
  }

  next();
};

router.post(
  "/",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("specialities:edit:any"),
  CatalogController.createProduct,
);

router.patch(
  "/:id",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("specialities:edit:any"),
  CatalogController.updateProduct,
);

router.get(
  "/:id",
  authorizeCognito,
  attachOrganisationIdFromQuery,
  withOrgPermissions(),
  requirePermission("specialities:view:any"),
  CatalogController.getProductById,
);

router.get(
  "/",
  authorizeCognito,
  attachOrganisationIdFromQuery,
  withOrgPermissions(),
  requirePermission("specialities:view:any"),
  CatalogController.listProducts,
);

router.post(
  String.raw`/\$resolve-selection`,
  authorizeCognito,
  attachOrganisationIdFromQuery,
  withOrgPermissions(),
  requirePermission("specialities:view:any"),
  CatalogController.resolveProductOperation,
);

router.post(
  String.raw`/\$search-components`,
  authorizeCognito,
  attachOrganisationIdFromQuery,
  withOrgPermissions(),
  requirePermission("specialities:view:any"),
  CatalogController.searchCatalogOperation,
);

export default router;
