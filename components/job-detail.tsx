"use client";

import { useEffect } from "react";
import type { Insight, JobPhase } from "@/lib/jobs-data";
import { universalStageById } from "@/lib/universal-stages";
import { Illustration } from "./illustrations";
import { SatisfactionDetails } from "./satisfaction";

type Props = {
  job: JobPhase | null;
  onClose: () => void;
};

export function JobDetail({ job, onClose }: Props) {
  useEffect(() => {
    if (!job) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [job, onClose]);

  if (!job) return null;

  const stage = universalStageById[job.universalStage];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Luk"
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-fade-in"
        style={{ animationDuration: "0.2s" }}
      />

      <aside
        key={job.id}
        className="relative h-full w-full max-w-2xl overflow-y-auto border-l border-zinc-200 bg-white shadow-2xl animate-slide-in"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white/95 px-8 py-6 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-5 w-5 items-center justify-center rounded-md"
                  style={{ background: `${job.color}20` }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: job.color,
                      boxShadow: `0 0 0 3px ${job.color}33`,
                    }}
                  />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Phase {String(job.number).padStart(2, "0")} ·{" "}
                  {job.shortTitle}
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
                {job.title}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-zinc-600">
                {job.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-wider"
                  style={{
                    borderColor: `${stage.color}88`,
                    background: `${stage.color}25`,
                    color: "#3f3f46",
                  }}
                >
                  Universal Stage · {stage.label}
                </span>
                <span className="text-[11px] italic text-zinc-500">
                  {stage.verbs}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={onClose}
                className="shrink-0 rounded-md border border-zinc-200 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900"
              >
                Esc
              </button>
              <div
                className="rounded-xl border p-2"
                style={{
                  borderColor: `${job.color}55`,
                  background: `${job.color}15`,
                  color: job.color,
                }}
              >
                <Illustration name={job.illustration} size={48} />
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 space-y-10">
          {/* Customer Satisfaction */}
          <Section
            title="Customer Satisfaction"
            colorAccent={job.color}
            index={0}
          >
            <p className="mb-3 text-[12px] text-zinc-600">
              Proxy CSAT from sentiment-analysed support and sales feedback.
            </p>
            <SatisfactionDetails
              satisfaction={job.satisfaction}
              accent={job.color}
            />
          </Section>

          {/* User Insights */}
          <Section
            title="User Insights"
            colorAccent={job.color}
            index={1}
            count={job.insights.length}
          >
            <p className="mb-3 text-[12px] text-zinc-600">
              Quotes, observations and evidence from interviews and user
              research — placed on the job they speak to.
            </p>
            {job.insights.length === 0 ? (
              <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-5 text-center">
                <p className="text-[13px] text-zinc-700">
                  No insights added yet.
                </p>
                <p className="mt-1 text-[11px] text-zinc-500">
                  Share an insight in chat — a quote, observation or pain — and
                  it will land here.
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {[...job.insights]
                  .sort((a, b) => weightRank(b.weight) - weightRank(a.weight))
                  .map((insight) => (
                    <InsightCard
                      key={insight.id}
                      insight={insight}
                      accent={job.color}
                    />
                  ))}
              </ul>
            )}
          </Section>

          {/* Main Job */}
          <Section title="Main Job" colorAccent={job.color} index={2}>
            <p
              className="rounded-lg border border-zinc-200 p-5 text-[14px] leading-relaxed text-zinc-800"
              style={{
                background: `linear-gradient(135deg, ${job.color}12, transparent 70%)`,
              }}
            >
              {job.mainJob}
            </p>
          </Section>

          {/* Job Steps */}
          <Section title="Job Steps" colorAccent={job.color} index={3}>
            <p className="mb-3 text-[12px] text-zinc-600">
              High-level steps the payroll bookkeeper needs to take. Each step
              starts with a verb and is broad enough to apply to all job
              performers.
            </p>
            <ol className="space-y-2">
              {job.jobSteps.map((step, i) => (
                <li
                  key={step}
                  className="group flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-3 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
                >
                  <span
                    className="mt-0.5 font-mono text-[10px] font-semibold"
                    style={{ color: job.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] leading-relaxed text-zinc-800">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </Section>

          {/* Sub Jobs */}
          <Section title="Sub Jobs" colorAccent={job.color} index={4}>
            <p className="mb-3 text-[12px] text-zinc-600">
              The underlying tasks that together make up the main job.
            </p>
            <div className="grid gap-2">
              {job.subJobs.map((sub) => (
                <details
                  key={sub.title}
                  className="group rounded-lg border border-zinc-200 bg-white transition-colors hover:border-zinc-300"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 p-3 list-none">
                    <span className="text-[14px] font-medium text-zinc-900">
                      {sub.title}
                    </span>
                    <span className="font-mono text-[14px] text-zinc-500 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="px-3 pb-3 text-[13px] leading-relaxed text-zinc-600">
                    {sub.detail}
                  </p>
                </details>
              ))}
            </div>
          </Section>

          {/* Related Jobs */}
          <Section title="Related Jobs" colorAccent={job.color} index={5}>
            <p className="mb-3 text-[12px] text-zinc-600">
              Other tasks the payroll bookkeeper is trying to complete —
              distinct from the main job, but can reveal further opportunities
              for innovation.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {job.relatedJobs.map((r) => (
                <li
                  key={r}
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-[13px] text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
                >
                  {r}
                </li>
              ))}
            </ul>
          </Section>

          {/* Aspirations */}
          <Section title="Aspirations" colorAccent={job.color} index={6}>
            <p className="mb-3 text-[12px] text-zinc-600">
              What the job performer hopes to achieve personally —
              &quot;be&quot; goals.
            </p>
            <ul className="space-y-2">
              {job.aspirations.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-3"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: job.color }}
                  />
                  <span className="text-[14px] italic leading-relaxed text-zinc-800">
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Outcomes */}
          <Section title="Outcomes" colorAccent={job.color} index={7}>
            <p className="mb-3 text-[12px] text-zinc-600">
              How success on the main job is measured — time savings, effort
              reduction, quality improvement.
            </p>
            <div className="grid gap-2">
              {job.outcomes.map((o) => (
                <div
                  key={o.metric}
                  className="rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300"
                >
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider"
                    style={{ color: job.color }}
                  >
                    Metric
                  </span>
                  <div className="mt-1 text-[14px] font-medium text-zinc-900">
                    {o.metric}
                  </div>
                  <div className="mt-1 text-[13px] leading-relaxed text-zinc-600">
                    {o.description}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </aside>
    </div>
  );
}

function Section({
  title,
  colorAccent,
  index,
  count,
  children,
}: {
  title: string;
  colorAccent: string;
  index: number;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section
      className="animate-fade-in"
      style={{ animationDelay: `${100 + index * 50}ms` }}
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className="h-px flex-1 max-w-[14px]"
          style={{ background: colorAccent }}
        />
        <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-700">
          {title}
        </h3>
        {typeof count === "number" && (
          <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-600">
            {count}
          </span>
        )}
        <span className="h-px flex-1 bg-zinc-200" />
      </div>
      {children}
    </section>
  );
}

const categoryLabel: Record<NonNullable<Insight["category"]>, string> = {
  aspiration: "Aspiration",
  outcome: "Outcome",
  "job-step": "Job step",
  "sub-job": "Sub job",
  "related-job": "Related job",
  general: "General",
};

function weightRank(weight: Insight["weight"]): number {
  if (weight === "high") return 3;
  if (weight === "medium") return 2;
  if (weight === "low") return 1;
  return 0;
}

const weightStyle: Record<
  NonNullable<Insight["weight"]>,
  { dot: string; label: string; color: string }
> = {
  high: { dot: "#ef4444", label: "High signal", color: "#b91c1c" },
  medium: { dot: "#f59e0b", label: "Medium signal", color: "#b45309" },
  low: { dot: "#a1a1aa", label: "Low signal", color: "#52525b" },
};

function InsightCard({
  insight,
  accent,
}: {
  insight: Insight;
  accent: string;
}) {
  const w = insight.weight ? weightStyle[insight.weight] : null;
  return (
    <li
      className="rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300"
      style={{
        borderLeft: `3px solid ${accent}`,
      }}
    >
      <p className="text-[14px] leading-relaxed text-zinc-800">
        <span className="mr-1 select-none text-zinc-400">“</span>
        {insight.text}
        <span className="ml-1 select-none text-zinc-400">”</span>
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-600">
        {w && (
          <span
            className="inline-flex items-center gap-1 font-mono uppercase tracking-wider"
            style={{ color: w.color }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: w.dot }}
            />
            {w.label}
          </span>
        )}
        {insight.category && (
          <span
            className="rounded border border-zinc-200 px-1.5 py-0.5 font-mono uppercase tracking-wider"
            style={{ color: accent }}
          >
            {categoryLabel[insight.category]}
          </span>
        )}
        {insight.source && (
          <span className="font-mono text-zinc-500">— {insight.source}</span>
        )}
        {insight.addedAt && (
          <span className="font-mono text-zinc-400">{insight.addedAt}</span>
        )}
      </div>
    </li>
  );
}
