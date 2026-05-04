"use client";

import { useEffect, useState } from "react";
import PlanOutput from "@/components/PlanOutput";
import type { Plan } from "@/types/plan";

const contentTypes = ["UGC", "Meme", "Cinema", "Screen Rec", "Talking Head"];
const languages = ["English", "Українська"];
const modes = [
  { label: "Content Plan", value: "content" },
  { label: "Content Plan With AI", value: "tools" }
] as const;

type PlanMode = (typeof modes)[number]["value"];

export default function Home() {
  const [description, setDescription] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["UGC"]);
  const [mode, setMode] = useState<PlanMode>("content");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyzing your product...");
  const [result, setResult] = useState<Plan | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading) {
      return;
    }

    setLoadingText("Analyzing your product...");
    const timer = window.setTimeout(() => {
      setLoadingText("Building your plan...");
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [loading]);

  function toggleType(type: string) {
    setSelectedTypes([type]);
  }

  async function buildPlan() {
    const trimmedDescription = description.trim();

    if (!trimmedDescription || loading) {
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description: trimmedDescription,
          types: selectedTypes.length ? selectedTypes : ["UGC"],
          language,
          mode
        })
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { code?: string; error?: string }
          | null;

        if (payload?.code === "quota_exhausted") {
          throw new Error(
            "Daily free limit reached. Try again tomorrow or connect billing."
          );
        }

        throw new Error(payload?.error || "Request failed");
      }

      const data = (await response.json()) as Plan;
      setResult(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Check your API key."
      );
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setDescription("");
    setSelectedTypes(["UGC"]);
    setMode("content");
    setLanguage("English");
    setResult(null);
    setError("");
    setLoading(false);
    setLoadingText("Analyzing your product...");
  }

  return (
    <main className="flex min-h-screen flex-col bg-noir-bg px-6 text-white">
      <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-[520px]">
        {!loading && !result && !error && (
          <section>
            <p className="mb-12 text-center text-[13px] font-normal tracking-[0.3em] text-white">
              <span>NOIR</span>
              <span className="animate-visionColor">VISION</span>
            </p>

            <div className="mb-6 flex justify-center gap-2">
              {modes.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setMode(item.value)}
                  className={`rounded-[20px] px-4 py-1.5 text-[12px] uppercase tracking-[0.08em] transition-colors duration-200 ${
                    mode === item.value
                      ? "border-0 bg-noir-accent text-white"
                      : "border border-[#2a2a2e] bg-transparent text-noir-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe your product..."
              className="h-14 w-full rounded-xl border border-[#2a2a2e] bg-[#161618] px-5 py-4 text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-noir-faint focus:border-noir-accent"
            />

            <div className="mt-5 flex flex-wrap gap-2">
              {contentTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={`rounded-[20px] border px-3 py-1 text-[11px] uppercase leading-none tracking-[0.1em] transition-colors duration-200 ${
                    selectedTypes.includes(type)
                      ? "border-noir-accent text-noir-accent"
                      : "border-noir-pill text-noir-faint hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {languages.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={`rounded-[20px] border px-3 py-1 text-[11px] uppercase leading-none tracking-[0.1em] transition-colors duration-200 ${
                    language === item
                      ? "border-noir-accent text-noir-accent"
                      : "border-noir-pill text-noir-faint hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={buildPlan}
              className="mt-6 w-full rounded-md bg-noir-accent p-3.5 text-[13px] tracking-[0.06em] text-white transition-colors duration-200 hover:bg-noir-hover"
            >
              Build my plan →
            </button>
          </section>
        )}

        {loading && (
          <section className="flex min-h-[260px] items-center justify-center text-center">
            <div>
              <div className="mb-3.5 flex h-7 justify-center gap-2.5">
                <span className="animate-bounceDot text-2xl leading-none text-noir-accent">
                  ·
                </span>
                <span className="animate-bounceDot text-2xl leading-none text-noir-accent [animation-delay:0.12s]">
                  ·
                </span>
                <span className="animate-bounceDot text-2xl leading-none text-noir-accent [animation-delay:0.24s]">
                  ·
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-noir-muted">
                {loadingText}
              </p>
            </div>
          </section>
        )}

        {result && <PlanOutput plan={result} onReset={reset} />}

        {error && (
          <section>
            <p className="text-[13px] leading-relaxed text-noir-muted">
              {error}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 border-0 bg-transparent p-0 text-[13px] text-noir-muted transition-colors duration-200 hover:text-white"
            >
              ← Start over
            </button>
          </section>
        )}
      </div>
      </div>
      <footer className="border-t border-noir-line py-6 text-center text-xs text-noir-muted">
        <p>Need an AI content producer? Contact us</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a
            href="https://t.me/selfhitaro"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-noir-accent no-underline transition-colors duration-200 hover:text-[#A855F7]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
            >
              <path d="M21.9 4.1 18.7 19c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L6.1 12.5l-5-1.6c-1.1-.3-1.1-1.1.2-1.6L20.6 2c.9-.3 1.7.2 1.3 2.1Z" />
            </svg>
            <span>selfhitaro</span>
          </a>
          <span className="inline-flex items-center gap-2 text-noir-accent">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
            >
              <path d="M19.5 5.1A18.2 18.2 0 0 0 15 3.7l-.2.4c1.6.5 2.4 1.2 2.4 1.2a14.8 14.8 0 0 0-10.4 0s.9-.8 2.5-1.2L9 3.7a18.2 18.2 0 0 0-4.5 1.4C1.7 9.3 1 13.4 1.4 17.5a18.5 18.5 0 0 0 5.5 2.8l1.1-1.8c-.6-.2-1.2-.5-1.7-.8l.4-.3c3.3 1.6 7 1.6 10.6 0l.4.3c-.6.4-1.1.6-1.7.8l1.1 1.8a18.5 18.5 0 0 0 5.5-2.8c.5-4.8-.8-8.9-3.1-12.4ZM8.4 15c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm7.2 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
            </svg>
            <span>noirvisn_hitaro</span>
          </span>
        </div>
      </footer>
    </main>
  );
}
