const limits = {
  name: 100,
  email: 254,
  company: 120,
  subject: 160,
  message: 5000,
  website: 200,
} as const;

type ContactPayload = Record<keyof typeof limits, unknown>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const requestLog = new Map<string, number[]>();
const rateLimitWindow = 10 * 60 * 1000;
const rateLimitCount = 5;

function normalizeSingleLine(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFKC")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength + 1);
}

function normalizeMessage(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFKC")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLength + 1);
}

function getClientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter((time) => now - time < rateLimitWindow);
  if (recent.length >= rateLimitCount) return true;
  recent.push(now);
  requestLog.set(key, recent);
  return false;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (!contentType.includes("application/json") || contentLength > 20_000) {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  let payload: ContactPayload;

  try {
    const submitted = await request.json() as unknown;
    if (!submitted || typeof submitted !== "object" || Array.isArray(submitted)) {
      return Response.json({ message: "Invalid request." }, { status: 400 });
    }
    payload = submitted as ContactPayload;
  } catch {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  const website = normalizeSingleLine(payload.website, limits.website);
  if (website) return Response.json({ ok: true });

  const name = normalizeSingleLine(payload.name, limits.name);
  const email = normalizeSingleLine(payload.email, limits.email).toLowerCase();
  const company = normalizeSingleLine(payload.company, limits.company);
  const subject = normalizeSingleLine(payload.subject, limits.subject);
  const message = normalizeMessage(payload.message, limits.message);

  const hasOversizedValue = name.length > limits.name
    || email.length > limits.email
    || company.length > limits.company
    || subject.length > limits.subject
    || message.length > limits.message;

  if (
    hasOversizedValue
    || !name
    || !emailPattern.test(email)
    || !subject
    || message.length < 10
  ) {
    return Response.json({ message: "Please check the submitted fields." }, { status: 400 });
  }

  if (isRateLimited(getClientKey(request))) {
    return Response.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Parash Portfolio <onboarding@resend.dev>";

  if (!apiKey || !contactEmail) {
    console.error("Contact form email delivery is not configured.");
    return Response.json({ message: "Message delivery is temporarily unavailable." }, { status: 503 });
  }

  const emailBody = [
    "Portfolio Contact Request",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    `Subject: ${subject}`,
    "Message:",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [contactEmail],
        reply_to: email,
        subject: `Portfolio Contact Request: ${subject}`,
        text: emailBody,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected a portfolio contact request.", response.status);
      return Response.json({ message: "Message delivery failed." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Portfolio contact delivery failed.", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ message: "Message delivery failed." }, { status: 502 });
  }
}
