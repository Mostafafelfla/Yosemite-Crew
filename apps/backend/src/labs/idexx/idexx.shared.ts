import { prisma } from "../../config/prisma.js";
import { LabOrderServiceError } from "../../services/lab-order.service.js";
import { IntegrationService } from "../../services/integration.service.js";
import { IdexxClient } from "../../integrations/idexx/idexx.client.js";

export type IdexxLookupField = "species" | "breed" | "providerCode";

export const lookupIdexxMapping = async (
  yosemiteCode: string,
  field: IdexxLookupField = "providerCode",
) => {
  const mapping = await prisma.codeMapping.findFirst({
    where: {
      sourceSystem: "YOSEMITECODE",
      sourceCode: yosemiteCode,
      targetSystem: "IDEXX",
      active: true,
    },
  });

  if (!mapping) {
    throw new LabOrderServiceError(
      `Missing IDEXX mapping for code ${yosemiteCode}.`,
      400,
      field === "species"
        ? "DIAGNOSTIC_SPECIES_MAPPING_UNSUPPORTED"
        : field === "breed"
          ? "DIAGNOSTIC_BREED_MAPPING_UNSUPPORTED"
          : "DIAGNOSTIC_PROVIDER_CODE_MAPPING_UNSUPPORTED",
      {
        provider: "IDEXX",
        field,
        code: yosemiteCode,
        sourceSystem: "YOSEMITECODE",
        targetSystem: "IDEXX",
      },
    );
  }

  return mapping.targetCode;
};

export const buildIdexxClient = async (organisationId: string) => {
  const account = await IntegrationService.requireAccount(
    organisationId,
    "IDEXX",
  );

  const credentials = account.credentials as {
    username?: string;
    password?: string;
    labAccountId?: string;
  };

  if (!credentials?.username || !credentials.password) {
    throw new LabOrderServiceError("IDEXX credentials missing.", 400);
  }

  const pimsId = process.env.IDEXX_PIMS_ID;
  const pimsVersion = process.env.IDEXX_PIMS_VERSION;

  if (!pimsId || !pimsVersion) {
    throw new LabOrderServiceError("IDEXX PIMS config missing.", 500);
  }

  return new IdexxClient({
    username: credentials.username,
    password: credentials.password,
    labAccountId: credentials.labAccountId,
    pimsId,
    pimsVersion,
  });
};
