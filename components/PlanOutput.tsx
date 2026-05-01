import type { Plan } from "@/types/plan";

type PlanOutputProps = {
  plan: Plan;
  onReset: () => void;
};

const metricLabels = [
  ["Age", "age"],
  ["Platform", "platform"],
  ["Pain", "pain"],
  ["Est. reach", "reach"]
] as const;

function formatHashtag(value: string) {
  const tag = value.trim().replace(/^#+/, "").replace(/\s+/g, "");
  return tag ? `#${tag}` : "";
}

export default function PlanOutput({ plan, onReset }: PlanOutputProps) {
  return (
    <section className="w-full">
      <button
        type="button"
        onClick={onReset}
        className="mb-6 rounded-[20px] border border-[#2a2a2e] px-4 py-1.5 text-[12px] text-noir-muted transition-colors duration-200 hover:border-noir-accent hover:text-white"
      >
        ← Start over
      </button>

      <article className="animate-fadeIn border-t border-noir-line py-6 opacity-0">
        <p className="mb-[22px] text-[11px] uppercase tracking-[0.08em] text-noir-muted">
          TARGET AUDIENCE
        </p>
        <div className="grid grid-cols-1 gap-x-6 gap-y-[22px] sm:grid-cols-2">
          {metricLabels.map(([label, key]) => (
            <div key={key}>
              <span className="mb-[7px] block text-[11px] uppercase tracking-[0.08em] text-noir-muted">
                {label}
              </span>
              <span className="block text-base leading-[1.45] text-white">
                {plan.audience[key]}
              </span>
            </div>
          ))}
        </div>
      </article>

      {plan.days.slice(0, 7).map((day, index) => (
        <article
          key={`${day.day}-${index}`}
          className="animate-fadeIn border-t border-noir-line py-6 opacity-0"
          style={{ animationDelay: `${(index + 1) * 100}ms` }}
        >
          <p className="mb-3.5 text-[11px] uppercase leading-relaxed tracking-[0.08em] text-noir-muted">
            {day.day} · {day.emotion}
          </p>
          <h2 className="text-xl font-light leading-[1.35] text-white">
            {day.hook}
          </h2>
          <p className="mt-2 text-[13px] leading-[1.65] text-noir-muted">
            {day.idea}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {day.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-[20px] border border-noir-pill px-3 py-1 text-[11px] uppercase leading-none tracking-[0.1em] text-noir-faint"
              >
                {formatHashtag(badge)}
              </span>
            ))}
          </div>
          {day.tools?.length ? (
            <div className="mt-4">
              <p className="mb-2 text-[11px] uppercase tracking-[0.08em] text-noir-muted">
                AI TOOLS
              </p>
              <div className="flex flex-wrap gap-2">
                {day.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-[20px] border border-[#2a1f00] bg-[#1a1500] px-3 py-1 text-[11px] uppercase leading-none tracking-[0.1em] text-[#a07800]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </article>
      ))}

      <article
        className="animate-fadeIn border-t border-noir-line py-6 opacity-0"
        style={{ animationDelay: "800ms" }}
      >
        <p className="mb-[22px] text-[11px] uppercase tracking-[0.08em] text-noir-muted">
          RECOMMENDED TOOLS
        </p>
        <p className="text-sm leading-[1.7] text-noir-muted">
          {plan.tools.join(", ")}
        </p>
      </article>

    </section>
  );
}
