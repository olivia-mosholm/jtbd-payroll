"use client";

import { useMemo, useState } from "react";
import { insightsMeta, jobs, surveyCsat } from "@/lib/jobs-data";
import { JobCard } from "@/components/job-card";
import { JobDetail } from "@/components/job-detail";
import { UniversalJobMap } from "@/components/universal-job-map";

const LAST_UPDATED = "20 May 2026";

type View = "map" | "cards";

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("cards");

  const activeJob = useMemo(
    () => jobs.find((j) => j.id === activeId) ?? null,
    [activeId],
  );

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;
    return jobs.filter((j) => {
      const haystack = [
        j.title,
        j.description,
        j.mainJob,
        ...j.subJobs.flatMap((s) => [s.title, s.detail]),
        ...j.relatedJobs,
        ...j.aspirations,
        ...j.jobSteps,
        ...j.outcomes.flatMap((o) => [o.metric, o.description]),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const lowestPhase = jobs.reduce((min, j) =>
    j.satisfaction.score < min.satisfaction.score ? j : min,
  );
  const highestPhase = jobs.reduce((max, j) =>
    j.satisfaction.score > max.satisfaction.score ? j : max,
  );

  return (
    <div className="relative min-h-screen">
      <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-10 sm:py-16">
        {/* Header */}
        <header className="animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              Last updated {LAST_UPDATED}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Payroll · Jobs to be Done
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Payroll in e-conomic
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-600">
            A living overview of the jobs a payroll bookkeeper performs, with
            satisfaction per phase. Click a phase to dive into sub-jobs,
            related jobs, aspirations, job steps, outcomes and user insights.
          </p>
        </header>

        {/* Satisfaction summary */}
        <div
          className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 animate-fade-in"
          style={{ animationDelay: "60ms" }}
        >
          <SummaryCard
            label="CSAT — Satisfaction with Payroll"
            value={surveyCsat.averageScore.toFixed(1) + " / 5"}
            sub={`Top-2-Box ${surveyCsat.topTwoBoxPercent}% · n = ${surveyCsat.totalResponses} · ${surveyCsat.dateRange}`}
            accent="#0ea5e9"
            distribution={surveyCsat.distribution}
          />
          <SummaryCard
            label="Highest satisfaction"
            value={highestPhase.shortTitle}
            sub={`Score ${highestPhase.satisfaction.score} · n = ${highestPhase.satisfaction.sampleSize}`}
            accent="#10b981"
          />
          <SummaryCard
            label="Lowest satisfaction"
            value={lowestPhase.shortTitle}
            sub={`Score ${lowestPhase.satisfaction.score} · n = ${lowestPhase.satisfaction.sampleSize}`}
            accent="#ef4444"
          />
        </div>

        {/* Jobs to be Done — single section with view toggle */}
        <section
          className="mt-12 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                Jobs to be Done
              </h2>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">
                {view === "map"
                  ? "Payroll bookkeeper jobs grouped under Ulwick's 8 universal stages."
                  : "Payroll bookkeeper jobs in chronological order with satisfaction per phase."}
              </p>
            </div>
            <ViewToggle value={view} onChange={setView} />
          </div>

          {/* Search */}
          <div className="mb-4 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[12px] text-zinc-400">
                /
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jobs, sub-jobs or outcomes…"
                className="w-full rounded-md border border-zinc-200 bg-white py-2.5 pl-8 pr-3 text-[13px] text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
              />
            </div>
            <span className="font-mono text-[11px] text-zinc-500">
              {filteredJobs.length} of {jobs.length}
            </span>
          </div>

          {view === "map" ? (
            <UniversalJobMap
              jobs={filteredJobs}
              activeId={activeId}
              onSelect={(id) => setActiveId(id)}
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredJobs.map((job, i) => (
                <JobCard
                  key={job.id}
                  job={job}
                  index={i}
                  isActive={activeId === job.id}
                  onClick={() => setActiveId(job.id)}
                />
              ))}
            </div>
          )}

          {filteredJobs.length === 0 && (
            <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-10 text-center">
              <p className="text-[14px] text-zinc-600">
                No jobs match &quot;{query}&quot;.
              </p>
            </div>
          )}
        </section>

        {/* Methodology */}
        <section className="mt-16 rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-base font-semibold tracking-tight text-zinc-900">
              Method &amp; sources
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Generated {insightsMeta.generatedAt.slice(0, 10)} ·{" "}
              {insightsMeta.generatedBy}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-700">
            {insightsMeta.methodology.summary}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Caveats
              </div>
              <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-zinc-700">
                {insightsMeta.methodology.caveats.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Data sources
              </div>
              <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-zinc-700">
                {insightsMeta.sources.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-zinc-200 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            <span>
              Built with Next.js · Inspired by Taco · Ulwicks JTBD framework
            </span>
            <span>{jobs.length} jobs · proxy CSAT data</span>
          </div>
        </footer>
      </div>

      <JobDetail job={activeJob} onClose={() => setActiveId(null)} />
    </div>
  );
}

function ViewToggle({
  value,
  onChange,
}: {
  value: View;
  onChange: (v: View) => void;
}) {
  const tabs: { id: View; label: string; icon: React.ReactNode }[] = [
    {
      id: "map",
      label: "Universal map",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: "cards",
      label: "Cards",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      ),
    },
  ];
  return (
    <div
      role="tablist"
      aria-label="Vis jobs som"
      className="inline-flex items-center rounded-md border border-zinc-200 bg-white p-0.5"
    >
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[12px] font-medium transition-colors ${
              active
                ? "bg-zinc-900 text-white"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  accent,
  distribution,
}: {
  label: string;
  value: string;
  sub: string;
  accent: string;
  distribution?: { score: number; label: string; count: number; color: string }[];
}) {
  const total = distribution?.reduce((s, d) => s + d.count, 0) ?? 0;
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: accent }}
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
          {label}
        </span>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
        {value}
      </div>
      {distribution && total > 0 && (
        <div className="mt-3">
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-zinc-100">
            {distribution.map((d) => (
              <div
                key={d.score}
                style={{
                  width: `${(d.count / total) * 100}%`,
                  background: d.color,
                }}
                title={`${d.label}: ${d.count} (${Math.round(
                  (d.count / total) * 100,
                )}%)`}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-zinc-500">
            {distribution.map((d) => (
              <span
                key={d.score}
                className="inline-flex items-center gap-1"
                title={`${d.label}: ${d.count}`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: d.color }}
                />
                {d.count}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="mt-3 text-[12px] leading-relaxed text-zinc-600">
        {sub}
      </div>
    </div>
  );
}
