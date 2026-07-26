import { Router } from "express";
import { authorizeCognito } from "../middlewares/auth.js";
import { requirePermission, withOrgPermissions } from "../middlewares/rbac.js";
import { RoomUnitGroupController } from "../controllers/web/room-unit-group.controller.js";

const router = Router();

router.post(
  "/",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("room:edit:any"),
  RoomUnitGroupController.create,
);

router.put(
  "/:id",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("room:edit:any"),
  RoomUnitGroupController.update,
);

router.get(
  "/",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("room:view:any"),
  RoomUnitGroupController.list,
);

router.delete(
  "/:id",
  authorizeCognito,
  withOrgPermissions(),
  requirePermission("room:edit:any"),
  RoomUnitGroupController.delete,
);

export default router;
