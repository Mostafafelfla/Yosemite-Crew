import { Request, Response } from "express";
import { AuthUserMobileService } from "../../services/authUserMobile.service.js";
import { OrganizationRatingService } from "../../services/organisationReting.service.js";
import logger from "../../utils/logger.js";
import { resolveUserIdFromRequest } from "../../utils/request.js";

type RatingRequestBody = {
  rating: number;
  review?: string;
};

export const OrganisationRatingController = {
  rateOrganisation: async (req: Request, res: Response) => {
    try {
      const authUserId = resolveUserIdFromRequest(req);
      const authUser = await AuthUserMobileService.getByProviderUserId(
        authUserId!,
      );

      const { organisationId } = req.params;

      const ratingBody = req.body as RatingRequestBody;

      if (!ratingBody.rating)
        return res.status(400).json({ message: "Rating is required." });

      const parentId = authUser?.parentId?.toString();
      if (!parentId) {
        return res.status(400).json({ message: "Parent not found for user." });
      }

      await OrganizationRatingService.rateOrganisation(
        organisationId,
        parentId,
        ratingBody.rating,
        ratingBody.review,
      );

      return res
        .status(200)
        .json({ message: "Rating submitted successfully." });
    } catch (error) {
      logger.error("Error while rating an organisation: ", error);
      res.status(500).json({ message: "Unable to rate." });
    }
  },

  isUserRatedOrganisation: async (req: Request, res: Response) => {
    try {
      const authUserId = resolveUserIdFromRequest(req);
      const authUser = await AuthUserMobileService.getByProviderUserId(
        authUserId!,
      );

      const { organisationId } = req.params;

      const parentId = authUser?.parentId?.toString();
      if (!parentId) {
        return res.status(400).json({ message: "Parent not found for user." });
      }

      const hasRated = await OrganizationRatingService.isUserRatedOrganisation(
        organisationId,
        parentId,
      );

      return res.status(200).json({ hasRated });
    } catch (error) {
      logger.error(
        "Error while checking if user has rated an organisation: ",
        error,
      );
      res.status(500).json({ message: "Unable to check rating status." });
    }
  },
};
