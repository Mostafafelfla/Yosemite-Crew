import { Router } from "express";
import { AuthUserMobileController } from "../controllers/app/authUserMobile.controller.js";
import { authorizeCognitoMobile } from "../middlewares/auth.js";

const router = Router();

router.post("/signup", authorizeCognitoMobile, (req, res) =>
  AuthUserMobileController.signup(req, res),
);

export default router;
