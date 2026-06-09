"use client";

import type { Insight, JobPhase } from "@/lib/jobs-data";

type Props = {
  subJobs: JobPhase["subJobs"];
  topPain: string;
  insights: Insight[];
  accent: string;
};

function weightRank(weight: Insight["weight"]): number {
  if (weight === "high") return 3;
  if (weight === "medium") return 2;
  if (weight === "low") return 1;
  return 0;
}

export function SubJobFlow({ subJobs, topPain, insights, accent }: Props) {
  const flowPains = insights
    .filter((i) => i.category === "sub-job" || i.category === "job-step")
    .sort((a, b) => weightRank(b.weight) - weightRank(a.weight))
    .slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Top pain banner */}
      <div
        className="flex items-start gap-3 rounded-lg border p-4"
        style={{
          borderColor: "#fecaca",
          background:
            "linear-gradient(135deg, rgba(254,242,242,0.9), rgba(255,247,237,0.7))",
        }}
      >
        <span
          className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[12px] font-bold text-red-600 ring-1 ring-red-200"
          aria-hidden
        >
          !
        </span>
        <div className="flex-1">
          <div className="font-mono text-[10px] uppercase tracking-wider text-red-700">
            Top pain across this flow
          </div>
          <p className="mt-1 text-[14px] leading-relaxed text-zinc-800">
            {topPain}
          </p>
        </div>
      </div>

      {/* Flow */}
      <div className="-mx-2 overflow-x-auto px-2 pb-2">
        <ol className="flex min-w-max items-stretch gap-2">
          {subJobs.map((sj, i) => (
            <FlowStep
              key={sj.title}
              index={i}
              total={subJobs.length}
              subJob={sj}
              accent={accent}
            />
          ))}
        </ol>
      </div>

      {/* Friction observed */}
      {flowPains.length > 0 && (
        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#ef4444" }}
            />
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
              Friction observed along this flow
            </span>
          </div>
          <ul className="space-y-2">
            {flowPains.map((p) => (
              <li
                key={p.id}
                className="flex items-start gap-2 text-[13px] leading-relaxed text-zinc-700"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "#fb7185" }}
                />
                <span>
                  <span className="select-none text-zinc-400">“</span>
                  {p.text}
                  <span className="select-none text-zinc-400">”</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function FlowStep({
  index,
  total,
  subJob,
  accent,
}: {
  index: number;
  total: number;
  subJob: { title: string; detail: string };
  accent: string;
}) {
  return (
    <li className="flex items-stretch gap-2">
      <details className="group relative w-48 cursor-pointer rounded-lg border border-zinc-200 bg-white px-3 py-2.5 transition-all hover:border-zinc-400 hover:shadow-sm open:w-72 open:border-zinc-400">
        <summary className="flex list-none items-start gap-2">
          <span
            className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold"
            style={{ background: `${accent}25`, color: "#3f3f46" }}
          >
            {index + 1}
          </span>
          <span className="flex-1 text-[13px] font-medium leading-snug text-zinc-900">
            {subJob.title}
          </span>
          <span className="font-mono text-[12px] text-zinc-400 transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <p className="mt-2 text-[12px] leading-relaxed text-zinc-600">
          {subJob.detail}
        </p>
      </details>
      {index < total - 1 && (
        <div
          className="flex shrink-0 items-center text-zinc-400"
          aria-hidden
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </li>
  );
}
