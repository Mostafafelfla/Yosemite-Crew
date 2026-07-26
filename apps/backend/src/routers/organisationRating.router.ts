import { Router } from "express";
import { OrganisationRatingController } from "../controllers/app/organisationRating.controller.js";
import { authorizeCognitoMobile } from "../middlewares/auth.js";
const router = Router();

router.post(
  "/:organisationId",
  authorizeCognitoMobile,
  OrganisationRatingController.rateOrganisation,
);

router.get(
  "/:organisationId/is-rated",
  authorizeCognitoMobile,
  OrganisationRatingController.isUserRatedOrganisation,
);

export default router;
