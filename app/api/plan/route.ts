import { NextResponse } from "next/server";
import type { Plan, PlanRequest } from "@/types/plan";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GEMINI_API_KEY" },
      { status: 500 }
    );
  }

  let body: PlanRequest;

  try {
    body = (await request.json()) as PlanRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const description = body.description?.trim();
  const types = Array.isArray(body.types) ? body.types : [];
  const language = body.language?.trim() || "English";
  const mode = body.mode === "tools" ? "tools" : "content";

  if (!description) {
    return NextResponse.json(
      { error: "Description is required" },
      { status: 400 }
    );
  }

  const prompt = createPrompt({
    description,
    types: types.length ? types : ["UGC"],
    language,
    mode
  });

  try {
    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.85
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Gemini request failed", detail: errorText },
        { status: 502 }
      );
    }

    const payload = (await response.json()) as GeminiResponse;
    const text =
      payload.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("") || "";
    let plan: Plan;

    try {
      plan = parsePlan(text);
    } catch {
      return NextResponse.json(
        { error: "Gemini returned invalid JSON" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      mode === "content" ? { ...plan, tools: ["CapCut", "InShot", "DaVinci Resolve"] } : plan
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function createPrompt({
  description,
  types,
  language,
  mode
}: {
  description: string;
  types: string[];
  language: string;
  mode: "content" | "tools";
}) {
  const dayShape =
    mode === "tools"
      ? "{ day: string, emotion: string, hook: string, idea: string, badges: string[], tools: string[] }"
      : "{ day: string, emotion: string, hook: string, idea: string, badges: string[] }";

  return `You are an expert social media content strategist.
Product description: ${description}
Content types: ${types.join(", ")}
Language: ${language}

Return ONLY valid JSON, no markdown, no explanation:
{
  audience: { age: string, platform: string, pain: string, reach: string },
  days: [
    ${dayShape}
  ],
  tools: string[]
}

Rules:
- Hooks must be aggressive, emotional, FOMO-driven
- Favor UGC over cinematic
- Use real case framing
- All output text in ${language}
- Exactly 7 days
- badges must be hashtags only, not tools${mode === "tools" ? `

For each day, the 'tools' field is required. Add specific AI tools from this list that fit the content type and that should be used for that exact video:
- Video generation: Kling 3.0, Higgsfield, Runway ML
- Voice: ElevenLabs
- Editing: DaVinci Resolve, CapCut
- Avatar/UGC: Higgsfield, HeyGen
- Music: Suno AI
- Thumbnail: Midjourney, ideogram
Pick 2-3 most relevant tools per day based on the content idea. Do not put tools inside badges.` : ""}`;
}

function parsePlan(text: string): Plan {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  const plan = JSON.parse(cleaned) as Plan;

  if (
    !plan.audience ||
    !Array.isArray(plan.days) ||
    plan.days.length !== 7 ||
    !Array.isArray(plan.tools)
  ) {
    throw new Error("Gemini returned an invalid plan shape");
  }

  return plan;
}
