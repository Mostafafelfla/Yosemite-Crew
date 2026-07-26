import { Router } from "express";
import { UserController } from "../controllers/web/user.controller.js";
import { authorizeCognito } from "../middlewares/auth.js";

const router = Router();

router.post("/", authorizeCognito, UserController.create);
router.get("/:id", authorizeCognito, UserController.getById);
router.delete("/:id", authorizeCognito, UserController.deleteById);
router.patch("/update-name", authorizeCognito, UserController.updateName);

export default router;
