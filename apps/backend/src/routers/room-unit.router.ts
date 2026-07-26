import { Router } from "express";
import { authorizeCognito } from "../middlewares/auth.js";
import { requirePermission, withOrgPermissions } from "../middlewares/rbac.js";
import { RoomUnitController } from "../controllers/web/room-unit.controller.js";

const router = Router();

router.post(
  "/",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("room:edit:any"),
  RoomUnitController.create,
);

router.put(
  "/:id",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("room:edit:any"),
  RoomUnitController.update,
);

router.get(
  "/",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("room:view:any"),
  RoomUnitController.list,
);

router.delete(
  "/:id",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("room:edit:any"),
  RoomUnitController.delete,
);

export default router;
