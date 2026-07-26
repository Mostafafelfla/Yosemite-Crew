import { Router } from "express";
import { AccountWithdrawalController } from "../controllers/app/account-withdrawals.controller.js";
import { authorizeCognitoMobile } from "../middlewares/auth.js";

const router = Router();

router.post(
  "/withdraw",
  authorizeCognitoMobile,
  AccountWithdrawalController.create,
);

export default router;
