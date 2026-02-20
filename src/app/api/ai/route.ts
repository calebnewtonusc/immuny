import { NextResponse } from "next/server";

const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY;
const OLLAMA_HOST = process.env.OLLAMA_BASE_URL ?? "https://api.ollama.com";

async function resolveModel(): Promise<string> {
  if (process.env.OLLAMA_MODEL) return process.env.OLLAMA_MODEL;
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/tags`, {
      headers: { Authorization: `Bearer ${OLLAMA_API_KEY}` },
      signal: AbortSignal.timeout(4_000),
    });
    if (!res.ok) return "llama3.2";
    const data = await res.json() as { models?: { name: string }[] };
    const models = (data.models ?? []).map((m) => m.name);
    return (
      models.find((m) => m.includes("llama3")) ??
      models.find((m) => m.includes("deepseek")) ??
      models.find((m) => m.includes("mistral")) ??
      models[0] ??
      "llama3.2"
    );
  } catch {
    return "llama3.2";
  }
}

const SYSTEM_PROMPT = `You are Immuny AI, an allergy emergency assistant embedded in the Immuny app. You help Alex Rivera manage their allergy condition safely.

Alex's profile:
- Critical allergens: Peanuts (Severe), Tree Nuts (Severe), Shellfish (Moderate), Dairy (Moderate)
- Conditions: Anaphylaxis Risk, Mild Asthma, Seasonal Allergies
- Medications: EpiPen 0.3mg (always carry), Benadryl 25mg (mild reactions), Zyrtec 10mg (daily)
- Emergency contacts: Mom (Maria Rivera), Dad (Carlos Rivera)
- Doctor: Dr. Sarah Chen, Allergist at Cedars-Sinai
- Nearest ER: Keck Medical Center, 0.8mi away, typically 12 min wait

Your role:
- Provide clear, calm, actionable guidance for allergy situations
- Help identify safe vs. unsafe foods based on Alex's allergen profile
- Explain when to use EpiPen vs. Benadryl
- Always recommend calling 911 for severe reactions
- Be concise. In emergencies, be very direct. Keep replies under 150 words unless more detail is needed.
- Never replace professional medical advice but be maximally helpful in the moment.`;

export async function POST(request: Request) {
  if (!OLLAMA_API_KEY) {
    return NextResponse.json({ error: "AI not configured" }, { status: 500 });
  }

  try {
    const { messages } = await request.json();
    const model = await resolveModel();

    const res = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OLLAMA_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-12),
        ],
        stream: true,
        options: { temperature: 0.4, num_predict: 300 },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `AI error: ${res.status} — ${text}` },
        { status: res.status }
      );
    }

    return new Response(res.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
