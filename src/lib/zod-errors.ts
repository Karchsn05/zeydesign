import { z } from "zod";

export type FieldErrors = Record<string, string>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const next: FieldErrors = {};

  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".");

    if (!key || next[key]) {
      continue;
    }

    next[key] = issue.message;
  }

  return next;
}
