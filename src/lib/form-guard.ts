const FORM_GUARD_PREFIX = "zeydesign-form-guard";
const DEFAULT_COOLDOWN_MS = 15_000;

function getStorageKey(formKey: string) {
  return `${FORM_GUARD_PREFIX}:${formKey}`;
}

export function isHoneypotTriggered(formData: FormData, fieldName = "website") {
  return String(formData.get(fieldName) ?? "").trim().length > 0;
}

export function getRemainingCooldown(formKey: string, cooldownMs = DEFAULT_COOLDOWN_MS) {
  if (typeof window === "undefined") {
    return 0;
  }

  const raw = window.sessionStorage.getItem(getStorageKey(formKey));
  if (!raw) {
    return 0;
  }

  const startedAt = Number(raw);
  if (!Number.isFinite(startedAt)) {
    return 0;
  }

  const elapsed = Date.now() - startedAt;
  return Math.max(0, cooldownMs - elapsed);
}

export function markSubmitted(formKey: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(getStorageKey(formKey), String(Date.now()));
}

export function formatCooldownSeconds(remainingMs: number) {
  return Math.max(1, Math.ceil(remainingMs / 1000));
}
