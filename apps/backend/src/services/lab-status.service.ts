import { LabOrderService } from "./lab-order.service.js";
import logger from "../utils/logger.js";
import { prisma } from "../config/prisma.js";
import type { LabOrderStatus } from "@prisma/client";

const TERMINAL_STATUSES: LabOrderStatus[] = ["COMPLETE", "CANCELLED", "ERROR"];

export const LabStatusService = {
  async pollPending() {
    const pending = await prisma.labOrder.findMany({
      where: {
        status: { notIn: TERMINAL_STATUSES },
        idexxOrderId: { not: null },
      },
      orderBy: { updatedAt: "asc" },
      take: 100,
    });

    if (!pending.length) return;

    for (const order of pending) {
      try {
        await LabOrderService.getOrder(
          order.provider,
          order.organisationId,
          order.idexxOrderId ?? "",
        );
      } catch (error) {
        logger.error("Failed to refresh lab order status", error);
      }
    }
  },
};
