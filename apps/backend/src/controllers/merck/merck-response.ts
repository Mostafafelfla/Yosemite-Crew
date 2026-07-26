import { Response } from "express";
import { MerckServiceError } from "../../services/merck.service.js";
import { mapAxiosError } from "../../utils/external-error.js";
import logger from "../../utils/logger.js";

type MerckResult = {
  meta?: Record<string, unknown>;
} & Record<string, unknown>;

export const sendMerckSuccess = (
  res: Response,
  result: MerckResult,
  requestId: string,
) =>
  res.status(200).json({
    ...result,
    meta: {
      ...result.meta,
      requestId,
    },
  });

export const handleMerckError = (
  res: Response,
  error: unknown,
  requestId: string,
  logMessage: string,
) => {
  const axiosError = mapAxiosError(error, "Merck request failed");
  if (axiosError) {
    return res.status(axiosError.status).json({
      message: axiosError.message,
      code: "MERCK_SEARCH_FAILED",
      requestId,
    });
  }
  if (error instanceof MerckServiceError) {
    return res.status(error.statusCode).json({
      message: error.message,
      code: "MERCK_SEARCH_FAILED",
      requestId,
    });
  }
  logger.error(logMessage, error);
  return res.status(500).json({
    message: "Merck search failed.",
    code: "MERCK_SEARCH_FAILED",
    requestId,
  });
};
