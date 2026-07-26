import { IdexxOrderAdapter } from "./idexx/idexx-order.adapter.js";
import type { LabOrderAdapter, LabProvider } from "./types.js";

const adapters: Record<LabProvider, LabOrderAdapter> = {
  IDEXX: new IdexxOrderAdapter(),
};

export const getLabOrderAdapter = (provider: LabProvider): LabOrderAdapter =>
  adapters[provider];

export * from "./types.js";
