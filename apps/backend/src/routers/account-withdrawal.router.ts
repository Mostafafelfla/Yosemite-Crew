import { Router } from "express";
import { AccountWithdrawalController } from "../controllers/app/account-withdrawals.controller.js";
import { authorizeCognitoMobile } from "src/middlewares/auth";

const router = Router();

router.post(
  "/withdraw",
  authorizeCognitoMobile,
  AccountWithdrawalController.create,
);

export default router;
