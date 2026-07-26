import { Router } from "express";
import {
  authorizeCognito,
  authorizeCognitoMobile,
} from "../middlewares/auth.js";
import { CodeController } from "../controllers/web/code.controller.js";

const router = Router();

router.get("/entries", authorizeCognito, (req, res) =>
  CodeController.listEntries(req, res),
);

router.get("/mappings", authorizeCognito, (req, res) =>
  CodeController.listMappings(req, res),
);

router.get("/terms/suggest", authorizeCognito, (req, res) =>
  CodeController.suggestTerms(req, res),
);

router.get("/mobile/entries", authorizeCognitoMobile, (req, res) =>
  CodeController.listEntries(req, res),
);

router.get("/mobile/mappings", authorizeCognitoMobile, (req, res) =>
  CodeController.listMappings(req, res),
);

router.get("/mobile/terms/suggest", authorizeCognitoMobile, (req, res) =>
  CodeController.suggestTerms(req, res),
);

export default router;
