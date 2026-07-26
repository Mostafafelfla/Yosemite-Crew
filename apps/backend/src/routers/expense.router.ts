import { Router } from "express";
import { ExpenseController } from "../controllers/app/expense.controller.js";
import { authorizeCognitoMobile } from "../middlewares/auth.js";

const router = Router();

router.post("/", authorizeCognitoMobile, ExpenseController.createExpense);

router.patch(
  "/:expenseId",
  authorizeCognitoMobile,
  ExpenseController.updateExpense,
);

router.delete(
  "/:expenseId",
  authorizeCognitoMobile,
  ExpenseController.deleteExpense,
);

router.get(
  "/:expenseId",
  authorizeCognitoMobile,
  ExpenseController.getExpenseById,
);

router.get(
  "/companion/:patientId/list",
  authorizeCognitoMobile,
  ExpenseController.getExpensesByCompanion,
);

router.get(
  "/companion/:patientId/summary",
  authorizeCognitoMobile,
  ExpenseController.getExpenseSummary,
);

export default router;
