"use client";

import type { JobPhase } from "@/lib/jobs-data";
import {
  universalStages,
  type UniversalStage,
} from "@/lib/universal-stages";

type Props = {
  jobs: JobPhase[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export function UniversalJobMap({ jobs, activeId, onSelect }: Props) {
  return (
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {universalStages.map((stage, idx) => (
        <Stage
          key={stage.id}
          stage={stage}
          phases={jobs.filter((j) => j.universalStage === stage.id)}
          activeId={activeId}
          onSelect={onSelect}
          index={idx}
        />
      ))}
    </ol>
  );
}

function Stage({
  stage,
  phases,
  activeId,
  onSelect,
  index,
}: {
  stage: UniversalStage;
  phases: JobPhase[];
  activeId: string | null;
  onSelect: (id: string) => void;
  index: number;
}) {
  const isEmpty = phases.length === 0;

  return (
    <li
      className="relative flex flex-col rounded-xl border p-4 animate-fade-in"
      style={{
        borderColor: isEmpty ? "#e4e4e7" : `${stage.color}99`,
        background: isEmpty
          ? "#fafafa"
          : `linear-gradient(155deg, ${stage.color}25, ${stage.color}08 70%)`,
        animationDelay: `${index * 40}ms`,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em] font-medium"
          style={{ color: isEmpty ? "#71717a" : "#3f3f46" }}
        >
          {String(stage.number).padStart(2, "0")} · {stage.label}
        </span>
        <StageIcon id={stage.id} color={isEmpty ? "#a1a1aa" : "#3f3f46"} />
      </div>

      <p className="mt-2 text-[12px] italic leading-snug text-zinc-700">
        {stage.verbs}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {phases.length === 0 && (
          <span className="text-[11px] text-zinc-400">
            No jobs placed here yet
          </span>
        )}
        {phases.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className="group inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors hover:shadow-sm"
              style={{
                borderColor: isActive ? "#18181b" : "#e4e4e7",
                background: "#ffffff",
                color: "#18181b",
              }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: p.color }}
              />
              <span className="font-mono text-zinc-500">
                {String(p.number).padStart(2, "0")}
              </span>
              <span>{p.shortTitle}</span>
            </button>
          );
        })}
      </div>
    </li>
  );
}

function StageIcon({ id, color }: { id: UniversalStage["id"]; color: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (id) {
    case "define":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "locate":
      return (
        <svg {...common}>
          <path d="M12 3c4 0 7 3 7 7 0 5-7 11-7 11S5 15 5 10c0-4 3-7 7-7z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "prepare":
      return (
        <svg {...common}>
          <path d="M14 4l6 6-8 8H6v-6l8-8z" />
          <path d="M13 5l6 6" />
        </svg>
      );
    case "confirm":
      return (
        <svg {...common}>
          <path d="M5 12l5 5L20 7" />
        </svg>
      );
    case "execute":
      return (
        <svg {...common}>
          <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" />
        </svg>
      );
    case "monitor":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
        </svg>
      );
    case "modify":
      return (
        <svg {...common}>
          <path d="M16 3l5 5-12 12H4v-5L16 3z" />
        </svg>
      );
    case "conclude":
      return (
        <svg {...common}>
          <path d="M5 4v16" />
          <path d="M5 4h12l-3 5 3 5H5" />
        </svg>
      );
  }
}
