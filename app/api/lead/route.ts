import { NextRequest, NextResponse } from "next/server";
import { LeadSchema } from "@/lib/validators";
import { createYouGileTask } from "@/lib/yougile";
import { sendLeadEmail } from "@/lib/mailer";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limit
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Validate with Zod
    const validatedData = LeadSchema.parse(body);

    // 3. Parallel execution with fallback logic
    let youGileSuccess = false;
    let emailSuccess = false;

    const results = await Promise.allSettled([
      createYouGileTask(validatedData),
      sendLeadEmail(validatedData),
    ]);

    if (results[0].status === "fulfilled") youGileSuccess = true;
    if (results[1].status === "fulfilled") emailSuccess = true;

    // 4. Response based on failures
    if (youGileSuccess || emailSuccess) {
      // At least one succeeded
      if (!youGileSuccess) console.error("YouGile failed, but Email succeeded.");
      if (!emailSuccess) console.error("Email failed, but YouGile succeeded.");
      
      return NextResponse.json({ ok: true });
    } else {
      // Both failed
      console.error("Critical: Both YouGile and Email failed.");
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("API Lead Error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
