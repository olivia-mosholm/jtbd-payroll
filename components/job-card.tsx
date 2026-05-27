"use client";

import type { JobPhase } from "@/lib/jobs-data";
import { universalStageById } from "@/lib/universal-stages";
import { SatisfactionMeter } from "./satisfaction";

type Props = {
  job: JobPhase;
  isActive: boolean;
  onClick: () => void;
  index: number;
};

const CARD_ACCENT = "#ee4f4d";

export function JobCard({ job, isActive, onClick, index }: Props) {
  const stage = universalStageById[job.universalStage];
  return (
    <button
      onClick={onClick}
      className={`group relative flex h-full flex-col items-start text-left w-full overflow-hidden rounded-2xl border bg-white p-5 transition-all duration-200 animate-fade-in
        ${
          isActive
            ? "border-zinc-900 shadow-[0_6px_24px_-6px_rgba(0,0,0,0.18)]"
            : "border-zinc-200 hover:border-zinc-300 hover:shadow-sm"
        }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Unified top color band */}
      <span
        className="absolute left-0 right-0 top-0 h-1"
        style={{ background: CARD_ACCENT, opacity: isActive ? 1 : 0.85 }}
      />

      <div className="relative flex items-center gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          Phase {String(job.number).padStart(2, "0")}
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider"
          style={{
            borderColor: `${stage.color}99`,
            background: `${stage.color}25`,
            color: "#3f3f46",
          }}
        >
          {stage.label}
        </span>
      </div>

      <h3 className="relative mt-2 text-base font-semibold tracking-tight text-zinc-900">
        {job.title}
      </h3>

      <p className="relative mt-3 line-clamp-2 text-[13px] leading-relaxed text-zinc-600">
        {job.description}
      </p>

      {/* Bottom-aligned satisfaction + summary */}
      <div className="relative mt-auto w-full pt-4">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5">
          <div className="mb-1.5 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
            Customer satisfaction
          </div>
          <SatisfactionMeter satisfaction={job.satisfaction} />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-zinc-500">
          <span className="font-mono">{job.subJobs.length} sub-jobs</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300" />
          <span className="font-mono">{job.outcomes.length} outcomes</span>
          {job.insights.length > 0 && (
            <>
              <span className="h-1 w-1 rounded-full bg-zinc-300" />
              <span className="font-mono text-emerald-600">
                {job.insights.length} insight
                {job.insights.length === 1 ? "" : "s"}
              </span>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
