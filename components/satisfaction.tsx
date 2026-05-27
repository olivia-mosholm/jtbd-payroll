import type { Satisfaction } from "@/lib/jobs-data";

function scoreColor(score: number) {
  if (score >= 75) return "#10b981";
  if (score >= 60) return "#f59e0b";
  if (score >= 45) return "#fb923c";
  return "#ef4444";
}

function scoreLabel(score: number) {
  if (score >= 75) return "Satisfied";
  if (score >= 60) return "Neutral";
  if (score >= 45) return "Frustrated";
  return "Unsatisfied";
}

function scoreEmoji(score: number) {
  if (score >= 75) return "🙂";
  if (score >= 60) return "😐";
  if (score >= 45) return "😕";
  return "🙁";
}

export function SatisfactionMeter({
  satisfaction,
  size = "sm",
}: {
  satisfaction: Satisfaction;
  size?: "sm" | "md";
}) {
  const color = scoreColor(satisfaction.score);
  const isMd = size === "md";
  const hasTrend = satisfaction.trend !== null && satisfaction.trend !== 0;
  const trendIcon =
    satisfaction.trend === null
      ? null
      : satisfaction.trend > 0
      ? "▲"
      : satisfaction.trend < 0
      ? "▼"
      : "·";
  const trendColor =
    satisfaction.trend === null
      ? "#a1a1aa"
      : satisfaction.trend > 0
      ? "#10b981"
      : satisfaction.trend < 0
      ? "#ef4444"
      : "#71717a";

  return (
    <div className="flex items-center gap-3">
      <Ring score={satisfaction.score} color={color} size={isMd ? 56 : 38} />
      <div>
        <div
          className={`flex items-baseline gap-1.5 ${
            isMd ? "text-2xl" : "text-base"
          } font-medium leading-none text-zinc-900`}
        >
          {satisfaction.score}
          <span className="text-[11px] font-normal text-zinc-500">/100</span>
        </div>
        <div
          className={`mt-1 flex items-center gap-1.5 ${
            isMd ? "text-[12px]" : "text-[11px]"
          }`}
        >
          <span
            className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-medium"
            style={{ background: `${color}1a`, color: color }}
          >
            <span>{scoreEmoji(satisfaction.score)}</span>
            {scoreLabel(satisfaction.score)}
          </span>
          {hasTrend && trendIcon && (
            <span className="font-mono" style={{ color: trendColor }}>
              {trendIcon} {Math.abs(satisfaction.trend!)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Ring({
  score,
  color,
  size,
}: {
  score: number;
  color: string;
  size: number;
}) {
  const stroke = size / 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#e4e4e7"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

export function SatisfactionDetails({
  satisfaction,
  accent,
}: {
  satisfaction: Satisfaction;
  accent: string;
}) {
  const hasNps = satisfaction.npsBreakdown !== null;
  const hasHistory = satisfaction.history.length > 0;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SatisfactionMeter satisfaction={satisfaction} size="md" />
        <div className="text-right">
          <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            Sample size
          </div>
          <div className="mt-1 text-sm font-medium text-zinc-900">
            n = {satisfaction.sampleSize.toLocaleString("en-US")}
          </div>
        </div>
      </div>

      {hasNps && satisfaction.npsBreakdown && (
        <NpsBar nps={satisfaction.npsBreakdown} />
      )}

      {hasHistory ? (
        <HistoryChart history={satisfaction.history} accent={accent} />
      ) : (
        <div className="mt-5 rounded-md border border-dashed border-zinc-200 bg-zinc-50 p-3 text-center">
          <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            6-month trend
          </div>
          <p className="mt-1 text-[12px] text-zinc-600">
            Trend data unavailable (no time series in source).
          </p>
        </div>
      )}

      <div className="mt-5 rounded-md border border-zinc-200 bg-zinc-50 p-3">
        <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          Top pain
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-zinc-800">
          {satisfaction.topPain}
        </p>
      </div>

      <p className="mt-3 text-[11px] text-zinc-500">{satisfaction.source}</p>
    </div>
  );
}

function NpsBar({
  nps,
}: {
  nps: { promoters: number; passives: number; detractors: number };
}) {
  const total = nps.promoters + nps.passives + nps.detractors || 1;
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-zinc-500">
        <span>NPS distribution</span>
        <span>{total}%</span>
      </div>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-zinc-100">
        <div
          style={{
            width: `${(nps.promoters / total) * 100}%`,
            background: "#10b981",
          }}
          title={`Promoters ${nps.promoters}%`}
        />
        <div
          style={{
            width: `${(nps.passives / total) * 100}%`,
            background: "#f59e0b",
          }}
          title={`Passives ${nps.passives}%`}
        />
        <div
          style={{
            width: `${(nps.detractors / total) * 100}%`,
            background: "#ef4444",
          }}
          title={`Detractors ${nps.detractors}%`}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-zinc-600">
        <span>
          <span
            className="mr-1 inline-block h-2 w-2 rounded-full"
            style={{ background: "#10b981" }}
          />
          Promoters {nps.promoters}%
        </span>
        <span>
          <span
            className="mr-1 inline-block h-2 w-2 rounded-full"
            style={{ background: "#f59e0b" }}
          />
          Passives {nps.passives}%
        </span>
        <span>
          <span
            className="mr-1 inline-block h-2 w-2 rounded-full"
            style={{ background: "#ef4444" }}
          />
          Detractors {nps.detractors}%
        </span>
      </div>
    </div>
  );
}

function HistoryChart({
  history,
  accent,
}: {
  history: number[];
  accent: string;
}) {
  const maxHistory = Math.max(...history);
  const minHistory = Math.min(...history);
  const range = Math.max(1, maxHistory - minHistory);
  return (
    <div className="mt-5">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
        6-måneders trend
      </div>
      <div className="flex items-end gap-1.5">
        {history.map((v, i) => {
          const height = ((v - minHistory) / range) * 48 + 12;
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-sm"
                style={{
                  height: `${height}px`,
                  background:
                    i === history.length - 1 ? accent : `${accent}66`,
                }}
                title={`${v}`}
              />
              <span className="font-mono text-[9px] text-zinc-500">{v}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
