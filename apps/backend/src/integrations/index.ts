import { IdexxAdapter } from "./idexx/idexx.adapter.js";
import { MerckAdapter } from "./merck/merck.adapter.js";
import type { IntegrationAdapter, IntegrationProvider } from "./types.js";
export * from "./types.js";

const adapters: Record<IntegrationProvider, IntegrationAdapter> = {
  IDEXX: new IdexxAdapter(),
  MERCK_MANUALS: new MerckAdapter(),
};

export const getIntegrationAdapter = (
  provider: IntegrationProvider,
): IntegrationAdapter => adapters[provider];
