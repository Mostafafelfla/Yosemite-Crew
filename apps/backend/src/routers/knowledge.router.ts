import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  authorizeCognito,
  authorizeCognitoMobile,
} from "../middlewares/auth.js";
import { requirePermission, withOrgPermissions } from "../middlewares/rbac.js";
import { MerckController } from "../controllers/web/merck.controller.js";
import { MerckMobileController } from "../controllers/app/merck.controller.js";

const router = Router();

const merckSearchLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    const orgId =
      (req.params.organisationId as string | undefined) ??
      (req.headers["x-org-id"] as string | undefined) ??
      "unknown-org";
    const userId = (req as { userId?: string }).userId ?? "unknown-user";
    return `${orgId}:${userId}`;
  },
});

router.get(
  "/pms/organisation/:organisationId/merck/manuals/search",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("integrations:view:any"),
  merckSearchLimiter,
  (req, res) => MerckController.searchManuals(req, res),
);

router.get(
  "/mobile/merck/manuals/search",
  authorizeCognitoMobile,
  merckSearchLimiter,
  (req, res) => MerckMobileController.searchManuals(req, res),
);

export default router;
