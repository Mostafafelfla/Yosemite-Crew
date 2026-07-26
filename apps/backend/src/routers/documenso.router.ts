import { Request, Response, Router } from "express";
import {
  DocumensoAuthController,
  DocumensoKeyController,
} from "../controllers/web/documenso.controller.js";
import { authorizeCognito } from "../middlewares/auth.js";
import { requirePermission, withOrgPermissions } from "../middlewares/rbac.js";

const router = Router();

router.post(
  "/pms/redirect/:orgId",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("document:view:any"),
  (req: Request<{ orgId: string }>, res: Response) =>
    DocumensoAuthController.createRedirectUrl(req, res),
);

router.post(
  "/pms/store-api-key/:orgId",
  (req: Request<{ orgId: string }>, res: Response) =>
    DocumensoKeyController.storeApiKey(req, res),
);

export default router;
