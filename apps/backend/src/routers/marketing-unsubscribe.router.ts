import { Router } from "express";
import { MarketingUnsubscribeController } from "../controllers/app/marketing-unsubscribe.controller.js";

const router = Router();

router.get("/unsubscribe", MarketingUnsubscribeController.unsubscribe);
router.post("/unsubscribe", MarketingUnsubscribeController.unsubscribe);

export default router;
