import { NextRequest, NextResponse } from "next/server";

interface RateRecord {
  timestamps: number[];
}

// In-memory rate limiting caches for server-side abuse prevention
const ipSubmissions = new Map<string, RateRecord>();
const emailSubmissions = new Map<string, RateRecord>();
const phoneSubmissions = new Map<string, RateRecord>();

const COOLDOWN_MINUTES = 30;
const COOLDOWN_MS = COOLDOWN_MINUTES * 60 * 1000;
const MAX_SUBMISSIONS = 2;

function cleanString(str: unknown): string {
  return typeof str === "string" ? str.trim() : "";
}

function cleanDigits(str: unknown): string {
  return typeof str === "string" ? str.replace(/\D/g, "") : "";
}

function checkAndRecordRate(
  map: Map<string, RateRecord>,
  key: string
): { allowed: boolean; reason?: string; minutesLeft?: number } {
  if (!key) return { allowed: true };

  const record = map.get(key) || { timestamps: [] };
  const now = Date.now();

  // Clean out entries older than 24 hours to prevent memory leaks
  record.timestamps = record.timestamps.filter((t) => now - t < 24 * 60 * 60 * 1000);

  // Check 1: Max 2 submissions
  if (record.timestamps.length >= MAX_SUBMISSIONS) {
    return {
      allowed: false,
      reason: `Maximum submission limit reached (${MAX_SUBMISSIONS}/${MAX_SUBMISSIONS}). For any further questions, please reach out directly to hello@qdelta.in.`,
    };
  }

  // Check 2: 30-minute cooldown
  if (record.timestamps.length > 0) {
    const lastTimestamp = record.timestamps[record.timestamps.length - 1];
    const elapsed = now - lastTimestamp;
    if (elapsed < COOLDOWN_MS) {
      const minutesLeft = Math.max(1, Math.ceil((COOLDOWN_MS - elapsed) / 60000));
      return {
        allowed: false,
        reason: `Anti-spam cooldown active: Please wait ${minutesLeft} minute${
          minutesLeft > 1 ? "s" : ""
        } before submitting another inquiry.`,
        minutesLeft,
      };
    }
  }

  return { allowed: true };
}

function recordSuccess(map: Map<string, RateRecord>, key: string) {
  if (!key) return;
  const record = map.get(key) || { timestamps: [] };
  record.timestamps.push(Date.now());
  map.set(key, record);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // 1. Honeypot check: If the hidden honeypot field is filled, silently neutralize bot
    const honeypot = cleanString(body._honey);
    if (honeypot) {
      return NextResponse.json({
        success: true,
        message: "Inquiry received successfully.",
      });
    }

    const name = cleanString(body.name);
    const email = cleanString(body.email).toLowerCase();
    const mobile = cleanString(body.mobile);
    const mobileDigits = cleanDigits(mobile);
    const services = cleanString(body.services);
    const brief = cleanString(body.brief);

    // 2. Validate mandatory fields
    if (!name || !email || !mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and mobile number are mandatory fields.",
        },
        { status: 400 }
      );
    }

    // 3. Extract IP address
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";

    // 4. Rate limit check by Email
    const emailCheck = checkAndRecordRate(emailSubmissions, email);
    if (!emailCheck.allowed) {
      return NextResponse.json(
        { success: false, message: emailCheck.reason },
        { status: 429 }
      );
    }

    // 5. Rate limit check by Mobile (if valid length)
    if (mobileDigits.length >= 7) {
      const phoneCheck = checkAndRecordRate(phoneSubmissions, mobileDigits);
      if (!phoneCheck.allowed) {
        return NextResponse.json(
          { success: false, message: phoneCheck.reason },
          { status: 429 }
        );
      }
    }

    // 6. Rate limit check by IP
    if (ip !== "unknown-ip") {
      const ipCheck = checkAndRecordRate(ipSubmissions, ip);
      if (!ipCheck.allowed) {
        return NextResponse.json(
          { success: false, message: ipCheck.reason },
          { status: 429 }
        );
      }
    }

    // 7. Forward verified lead payload to FormSubmit.co
    const formSubmitPayload = {
      name,
      email,
      mobile,
      services: services || "Not specified",
      brief: brief || "Not provided",
      _subject: `New Project Inquiry from ${name} - QDelta`,
      _template: "table",
      _captcha: "false",
    };

    const formSubmitRes = await fetch("https://formsubmit.co/ajax/hello@qdelta.in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formSubmitPayload),
    });

    const responseData = await formSubmitRes.json().catch(() => ({}));

    if (
      formSubmitRes.ok &&
      (responseData.success === "true" || responseData.success === true)
    ) {
      // Record successful submission in server memory
      recordSuccess(emailSubmissions, email);
      if (mobileDigits.length >= 7) recordSuccess(phoneSubmissions, mobileDigits);
      if (ip !== "unknown-ip") recordSuccess(ipSubmissions, ip);

      return NextResponse.json({
        success: true,
        message: "Inquiry received successfully.",
      });
    }

    // Check for FormSubmit one-time activation notice
    if (
      responseData.message &&
      typeof responseData.message === "string" &&
      responseData.message.toLowerCase().includes("activate")
    ) {
      return NextResponse.json({
        success: false,
        message:
          "FormSubmit has sent a one-time activation email to hello@qdelta.in. Please click the confirmation link in your inbox to enable forwarding.",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message:
          responseData.message ||
          "Unable to submit inquiry at this moment. Please email hello@qdelta.in directly.",
      },
      { status: 500 }
    );
  } catch (err) {
    console.error("Server contact submission error:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          "Server connection error. Please try again or reach out directly to hello@qdelta.in.",
      },
      { status: 500 }
    );
  }
}
