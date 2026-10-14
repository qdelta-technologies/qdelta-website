import { NextRequest, NextResponse } from "next/server";

// Server-side proxy for the QDelta AI chatbot.
// The worker secret and the system prompt live here, never in the browser.

const WORKER_URL =
  process.env.QDELTA_AI_URL || "https://qdelta-ai.qdelta-work.workers.dev/chat";

const SYSTEM_PROMPT = `You are QDelta AI, the official digital consultant for QDelta (https://www.qdelta.in).
Core Knowledge:
- Official Email: hello@qdelta.in (This is the ONLY official email address for all inquiries, briefs, and client communication).
- Mission: High-performance web engineering and modern luxury digital agency.
- Founders: Qais (Brand Strategy & Creative), Sai Prabath (Engineering & Performance), Fazeel (Systems & Delivery).
- Services: High-Converting Landing Pages, Luxury Brand Websites, Interactive 3D WebGL Experiences, Premium E-commerce Stores.
- Booking & Inquiries: Book a 1-on-1 discovery call at https://www.qdelta.in/#contact or email directly at hello@qdelta.in.

CRITICAL MANDATORY RULES:
- The ONLY official email address is hello@qdelta.in. Never output any other email.
- BE EXTREMELY MINIMAL: Answer in strictly 1 to 2 short sentences (maximum 30 words).
- NEVER output long lists, bullet points, or essays.
- Conclude with a brief invitation to book a call or email hello@qdelta.in.`;

const MAX_MESSAGES = 12;
const MAX_CHARS = 1000;

type Role = "user" | "assistant";

function cleanMessages(input: unknown): { role: Role; content: string }[] | null {
  if (!Array.isArray(input)) return null;
  const out: { role: Role; content: string }[] = [];
  for (const m of input) {
    // Only user/assistant turns are accepted: a visitor can never send their own "system" message.
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") continue;
    const content = m.content.trim().slice(0, MAX_CHARS);
    if (content) out.push({ role: m.role, content });
  }
  const recent = out.slice(-MAX_MESSAGES);
  return recent.length && recent[recent.length - 1].role === "user" ? recent : null;
}

export async function POST(req: NextRequest) {
  const secret = process.env.QDELTA_AI_SECRET;
  if (!secret) {
    return NextResponse.json(
      { success: false, error: "Chat is not configured. Please email hello@qdelta.in." },
      { status: 503 }
    );
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const messages = cleanMessages(body.messages);
  if (!messages) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
        // Lets the worker apply its 10-per-hour limit to each visitor, not to this server
        ...(clientIp ? { "X-Client-IP": clientIp } : {}),
      },
      body: JSON.stringify({ messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages] }),
      signal: AbortSignal.timeout(25000),
    });

    // Pass the worker's answer through unchanged, including the friendly rate-limit message (HTTP 429)
    const data = await res.json().catch(() => null);
    if (!data) {
      return NextResponse.json({ success: false, error: "Upstream error" }, { status: 502 });
    }
    // Never expose upstream internals
    if (res.status >= 500) {
      return NextResponse.json({ success: false, error: "Chat is busy, please try again." }, { status: 502 });
    }
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, error: "Chat is busy, please try again." }, { status: 502 });
  }
}
