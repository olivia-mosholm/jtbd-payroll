import type { IllustrationKey } from "@/lib/jobs-data";

type Props = {
  name: IllustrationKey;
  className?: string;
  color?: string;
  size?: number;
};

export function Illustration({
  name,
  className,
  color = "currentColor",
  size = 48,
}: Props) {
  const map: Record<IllustrationKey, React.ReactNode> = {
    inbox: <InboxArt color={color} />,
    shield: <ShieldArt color={color} />,
    play: <PlayArt color={color} />,
    send: <SendArt color={color} />,
    sliders: <SlidersArt color={color} />,
    ledger: <LedgerArt color={color} />,
    archive: <ArchiveArt color={color} />,
    chat: <ChatArt color={color} />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
    >
      {map[name]}
    </svg>
  );
}

function tint(color: string, alpha: number) {
  return `${color}${Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;
}

function InboxArt({ color }: { color: string }) {
  return (
    <g>
      <rect
        x="10"
        y="20"
        width="44"
        height="34"
        rx="4"
        fill={tint(color, 0.12)}
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M10 38h14l4 5h8l4-5h14" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <rect x="22" y="10" width="20" height="14" rx="2" fill="#fff" stroke={color} strokeWidth="1.5" />
      <path d="M26 16h12M26 20h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

function ShieldArt({ color }: { color: string }) {
  return (
    <g>
      <path
        d="M32 8l18 6v14c0 12-8 20-18 24-10-4-18-12-18-24V14l18-6z"
        fill={tint(color, 0.12)}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M23 31l7 7 12-14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );
}

function PlayArt({ color }: { color: string }) {
  return (
    <g>
      <circle cx="32" cy="32" r="22" fill={tint(color, 0.12)} stroke={color} strokeWidth="1.5" />
      <path
        d="M27 22l16 10-16 10V22z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </g>
  );
}

function SendArt({ color }: { color: string }) {
  return (
    <g>
      <path
        d="M8 32l46-18-8 44-14-14-24-12z"
        fill={tint(color, 0.12)}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 44l-8 8v-12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M32 44l14-30" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

function SlidersArt({ color }: { color: string }) {
  return (
    <g>
      <rect
        x="10"
        y="14"
        width="44"
        height="36"
        rx="4"
        fill={tint(color, 0.1)}
        stroke={color}
        strokeWidth="1.5"
      />
      <line x1="16" y1="24" x2="48" y2="24" stroke={color} strokeWidth="1.5" />
      <line x1="16" y1="32" x2="48" y2="32" stroke={color} strokeWidth="1.5" />
      <line x1="16" y1="40" x2="48" y2="40" stroke={color} strokeWidth="1.5" />
      <circle cx="38" cy="24" r="3.5" fill="#fff" stroke={color} strokeWidth="1.5" />
      <circle cx="22" cy="32" r="3.5" fill="#fff" stroke={color} strokeWidth="1.5" />
      <circle cx="44" cy="40" r="3.5" fill="#fff" stroke={color} strokeWidth="1.5" />
    </g>
  );
}

function LedgerArt({ color }: { color: string }) {
  return (
    <g>
      <rect
        x="12"
        y="10"
        width="40"
        height="44"
        rx="3"
        fill={tint(color, 0.12)}
        stroke={color}
        strokeWidth="1.5"
      />
      <line x1="20" y1="10" x2="20" y2="54" stroke={color} strokeWidth="1.5" />
      <path d="M26 20h20M26 28h20M26 36h16M26 44h12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

function ArchiveArt({ color }: { color: string }) {
  return (
    <g>
      <rect x="8" y="14" width="48" height="10" rx="2" fill={tint(color, 0.18)} stroke={color} strokeWidth="1.5" />
      <rect x="12" y="24" width="40" height="30" rx="2" fill={tint(color, 0.1)} stroke={color} strokeWidth="1.5" />
      <rect x="24" y="32" width="16" height="4" rx="2" fill="#fff" stroke={color} strokeWidth="1.5" />
    </g>
  );
}

function ChatArt({ color }: { color: string }) {
  return (
    <g>
      <path
        d="M10 14h36a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H26l-10 8v-8h-6a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z"
        fill={tint(color, 0.12)}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="27" r="2" fill={color} />
      <circle cx="30" cy="27" r="2" fill={color} />
      <circle cx="38" cy="27" r="2" fill={color} />
    </g>
  );
}

export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* Dark card background */}
      <rect x="0" y="0" width="180" height="180" rx="14" fill="#1f2937" />

      {/* Clock face */}
      <g transform="translate(58 78)" stroke="#ffffff" strokeLinecap="round">
        <circle r="32" strokeWidth="2" fill="none" />
        {/* Tick marks at 12, 3, 6, 9 */}
        <line x1="0" y1="-32" x2="0" y2="-26" strokeWidth="2" />
        <line x1="32" y1="0" x2="26" y2="0" strokeWidth="2" />
        <line x1="0" y1="32" x2="0" y2="26" strokeWidth="2" />
        <line x1="-32" y1="0" x2="-26" y2="0" strokeWidth="2" />
        {/* Hour hand (up) */}
        <line x1="0" y1="0" x2="0" y2="-17" strokeWidth="2" />
        {/* Minute hand (~4 o'clock) */}
        <line x1="0" y1="0" x2="14" y2="9" strokeWidth="2" />
        {/* Center dot */}
        <circle r="2" fill="#ffffff" stroke="none" />
      </g>

      {/* Arrow from clock to coins */}
      <path
        d="M 92 48 Q 112 42 128 56"
        stroke="#ffffff"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 124 51 L 130 56 L 124 60"
        stroke="#ffffff"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Stacked coins */}
      <g stroke="#ffffff" strokeWidth="1.8" fill="#1f2937" strokeLinecap="round">
        {/* Top coin */}
        <ellipse cx="138" cy="82" rx="18" ry="5" />
        <path d="M 120 82 L 120 88 A 18 5 0 0 0 156 88 L 156 82" />
        {/* Middle coin */}
        <ellipse cx="138" cy="92" rx="18" ry="5" />
        <path d="M 120 92 L 120 98 A 18 5 0 0 0 156 98 L 156 92" />
        {/* Bottom coin */}
        <ellipse cx="138" cy="102" rx="18" ry="5" />
        <path d="M 120 102 L 120 108 A 18 5 0 0 0 156 108 L 156 102" />
      </g>

      {/* e-conomic wordmark */}
      <g transform="translate(16 158)">
        {/* Brand mark dots */}
        <circle cx="2" cy="2" r="2" fill="#f97316" />
        <circle cx="7" cy="5" r="1.6" fill="#fbbf24" />
        <circle cx="5" cy="-2" r="1.6" fill="#a855f7" />
        <circle cx="10" cy="0" r="1.2" fill="#22c55e" />
        {/* Wordmark */}
        <text
          x="18"
          y="5"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
          fontSize="11"
          fontWeight="600"
          fill="#ffffff"
          letterSpacing="-0.01em"
        >
          e-conomic
        </text>
      </g>
    </svg>
  );
}
