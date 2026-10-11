/**
 * QDelta Contact Form Rate Limiting & Anti-Spam Utilities
 *
 * Rules:
 * 1. 30-Minute Cooldown Gap between submissions.
 * 2. Maximum 2 submissions per person (tracked across email, mobile number, and device).
 * 3. Honeypot bot interception to prevent automated scripts from disturbing inbox/Google Sheets.
 */

export interface SubmissionLog {
  timestamp: number;
  email: string;
  mobile: string;
}

export const COOLDOWN_MINUTES = 30;
export const COOLDOWN_MS = COOLDOWN_MINUTES * 60 * 1000; // 30 minutes in milliseconds
export const MAX_SUBMISSIONS_PER_USER = 2;
const STORAGE_KEY = "qdelta_form_rate_limit_v1";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizeMobile(mobile: string): string {
  // Strip all non-digit characters so formats like "+91 98765 43210" and "9876543210" match
  return mobile.replace(/\D/g, "");
}

/**
 * Retrieve saved submission history from browser localStorage
 */
export function getSubmissionHistory(): SubmissionLog[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item) =>
          typeof item?.timestamp === "number" &&
          typeof item?.email === "string" &&
          typeof item?.mobile === "string"
      );
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Save a new successful submission record to browser localStorage
 */
export function recordSubmission(email: string, mobile: string): void {
  if (typeof window === "undefined") return;
  try {
    const history = getSubmissionHistory();
    history.push({
      timestamp: Date.now(),
      email: normalizeEmail(email),
      mobile: normalizeMobile(mobile),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (err) {
    console.error("Failed to persist submission rate limit log:", err);
  }
}

export interface RateLimitCheckResult {
  allowed: boolean;
  reason?: "COOLDOWN_ACTIVE" | "EMAIL_LIMIT_REACHED" | "MOBILE_LIMIT_REACHED" | "DEVICE_LIMIT_REACHED";
  minutesRemaining?: number;
  submissionCount: number;
  message?: string;
}

/**
 * Check whether a user is allowed to submit based on their email, mobile, and device history
 */
export function evaluateRateLimit(email: string, mobile: string): RateLimitCheckResult {
  const history = getSubmissionHistory();
  const now = Date.now();
  const normEmail = normalizeEmail(email);
  const normMobile = normalizeMobile(mobile);

  // 1. Check max submission count for Email (Max 2)
  if (normEmail) {
    const emailMatches = history.filter(
      (item) => normalizeEmail(item.email) === normEmail
    );
    if (emailMatches.length >= MAX_SUBMISSIONS_PER_USER) {
      return {
        allowed: false,
        reason: "EMAIL_LIMIT_REACHED",
        submissionCount: emailMatches.length,
        message: `Maximum submission limit reached (${MAX_SUBMISSIONS_PER_USER}/${MAX_SUBMISSIONS_PER_USER}) for email "${email.trim()}". For any urgent questions, please email us directly at hello@qdelta.in.`,
      };
    }
  }

  // 2. Check max submission count for Mobile (Max 2)
  if (normMobile.length >= 7) {
    const mobileMatches = history.filter(
      (item) => normalizeMobile(item.mobile) === normMobile
    );
    if (mobileMatches.length >= MAX_SUBMISSIONS_PER_USER) {
      return {
        allowed: false,
        reason: "MOBILE_LIMIT_REACHED",
        submissionCount: mobileMatches.length,
        message: `Maximum submission limit reached (${MAX_SUBMISSIONS_PER_USER}/${MAX_SUBMISSIONS_PER_USER}) for mobile "${mobile.trim()}". For any urgent questions, please email us directly at hello@qdelta.in.`,
      };
    }
  }

  // 3. Check 30-minute cooldown gap
  // Find submissions matching this user's email, mobile, or the last submission on this device
  const matchingSubmissions = history.filter(
    (item) =>
      (normEmail && normalizeEmail(item.email) === normEmail) ||
      (normMobile.length >= 7 && normalizeMobile(item.mobile) === normMobile)
  );

  // Consider the most recent relevant submission or last device submission
  const lastSub =
    matchingSubmissions.length > 0
      ? matchingSubmissions[matchingSubmissions.length - 1]
      : history.length > 0
      ? history[history.length - 1]
      : null;

  if (lastSub) {
    const elapsed = now - lastSub.timestamp;
    if (elapsed < COOLDOWN_MS) {
      const minutesRemaining = Math.max(1, Math.ceil((COOLDOWN_MS - elapsed) / 60000));
      const currentCount = matchingSubmissions.length || history.length;
      return {
        allowed: false,
        reason: "COOLDOWN_ACTIVE",
        minutesRemaining,
        submissionCount: currentCount,
        message: `Anti-spam cooldown active: Please wait ${minutesRemaining} minute${
          minutesRemaining > 1 ? "s" : ""
        } before submitting another inquiry (Limit: ${MAX_SUBMISSIONS_PER_USER} per person).`,
      };
    }
  }

  const currentCount = Math.max(
    normEmail ? history.filter((i) => normalizeEmail(i.email) === normEmail).length : 0,
    normMobile.length >= 7 ? history.filter((i) => normalizeMobile(i.mobile) === normMobile).length : 0,
    history.length
  );

  return {
    allowed: true,
    submissionCount: currentCount,
  };
}

/**
 * Get device cooldown status for live UI banners and timer displays
 */
export function getActiveCooldownStatus(): {
  isCooldown: boolean;
  minutesRemaining: number;
  totalSubmissions: number;
} {
  const history = getSubmissionHistory();
  if (history.length === 0) {
    return { isCooldown: false, minutesRemaining: 0, totalSubmissions: 0 };
  }
  const lastSub = history[history.length - 1];
  const elapsed = Date.now() - lastSub.timestamp;
  if (elapsed < COOLDOWN_MS) {
    const minutesRemaining = Math.max(1, Math.ceil((COOLDOWN_MS - elapsed) / 60000));
    return {
      isCooldown: true,
      minutesRemaining,
      totalSubmissions: history.length,
    };
  }
  return {
    isCooldown: false,
    minutesRemaining: 0,
    totalSubmissions: history.length,
  };
}
