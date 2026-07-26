import { IntegrationAdapter, IntegrationValidationResult } from "../types.js";

export class MerckAdapter implements IntegrationAdapter {
  validateCredentials(): Promise<IntegrationValidationResult> {
    return Promise.resolve({ ok: true });
  }
}
