import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "AI not configured" }, { status: 500 });
  }

  try {
    const { messages } = await request.json();

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-12),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
