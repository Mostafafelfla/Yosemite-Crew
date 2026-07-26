import { prisma } from "../config/prisma.js";
import { isReadFromPostgres } from "../config/read-switch.js";
import { ParentModel } from "../models/parent.js";
import { AuthUserMobileService } from "../services/authUserMobile.service.js";

type ParentAddress = {
  city?: string | null;
  postalCode?: string | null;
};

export const getParentAddressForAuthUser = async (
  authUserId: string | null | undefined,
): Promise<ParentAddress | null | undefined> => {
  if (!authUserId) {
    return null;
  }

  const authUser = await AuthUserMobileService.getByProviderUserId(authUserId);

  if (isReadFromPostgres()) {
    const parentId = authUser?.parentId ?? null;
    const parent = parentId
      ? await prisma.parent.findFirst({
          where: { id: parentId },
          include: { address: true },
        })
      : null;
    return parent?.address ?? null;
  }

  const parent = await ParentModel.findById(authUser?.parentId);
  return parent?.address;
};
