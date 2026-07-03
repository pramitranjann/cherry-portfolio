export interface KoiDriftProps {
  count?: 1 | 2 | 3;
  className?: string;
}

/*
 * Minimal brush-drawn koi, ~60px, two-tone body. Drawn pointing right at
 * rest; the loop paths below carry them along slow elliptical orbits via
 * `offset-path`, so `offset-rotate: auto` keeps the nose forward.
 */
const KOI_BODY_PATH =
  'M2 10 C 6 2, 20 0, 34 4 C 44 7, 52 8, 58 10 C 52 12, 44 13, 34 16 C 20 20, 6 18, 2 10 Z';
const KOI_TAIL_PATH = 'M2 10 C -6 4, -10 2, -14 0 C -10 8, -10 12, -14 20 C -10 18, -6 16, 2 10 Z';
const KOI_FIN_PATH = 'M20 12 C 18 18, 16 22, 12 26 C 18 24, 24 22, 26 16 Z';

/* One fish per slot: its own loop path, size, duration, delay, and a
   resting offset-distance so the reduced-motion / t=0 pose is staggered. */
const FISH = [
  {
    id: 'a',
    path: "path('M 40 90 C 40 40, 140 20, 190 60 C 240 100, 220 150, 160 150 C 100 150, 40 140, 40 90 Z')",
    size: 64,
    duration: '42s',
    delay: '-4s',
    mirror: false,
  },
  {
    id: 'b',
    path: "path('M 260 130 C 300 90, 340 90, 350 130 C 360 172, 320 190, 280 180 C 244 172, 224 166, 260 130 Z')",
    size: 48,
    duration: '36s',
    delay: '-18s',
    mirror: true,
  },
  {
    id: 'c',
    path: "path('M 150 210 C 190 180, 250 190, 260 230 C 270 268, 220 280, 180 268 C 144 258, 116 236, 150 210 Z')",
    size: 56,
    duration: '48s',
    delay: '-30s',
    mirror: false,
  },
] as const;

/**
 * Small terracotta koi drifting on slow elliptical loops. Static (placed,
 * not moving) under `prefers-reduced-motion`, since the global stylesheet
 * collapses animation durations to ~0.
 */
export default function KoiDrift({ count = 2, className }: KoiDriftProps) {
  const fish = FISH.slice(0, count);

  return (
    <div aria-hidden="true" className={`pointer-events-none relative ${className ?? ''}`}>
      <style>{`
        @keyframes motif-koi-swim {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
      `}</style>
      {fish.map((f) => (
        <svg
          key={f.id}
          viewBox="-16 -6 76 28"
          width={f.size}
          height={f.size * 0.44}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            offsetPath: f.path,
            offsetRotate: 'auto',
            offsetDistance: '0%',
            animation: `motif-koi-swim ${f.duration} linear infinite`,
            animationDelay: f.delay,
            transform: f.mirror ? 'scaleY(-1)' : undefined,
          }}
        >
          <path d={KOI_TAIL_PATH} fill="var(--color-surface)" stroke="var(--color-terracotta)" strokeWidth="0.75" />
          <path d={KOI_BODY_PATH} fill="var(--color-terracotta)" stroke="var(--color-terracotta)" strokeWidth="0.5" />
          <path d={KOI_FIN_PATH} fill="var(--color-surface)" opacity="0.85" />
          <circle cx="10" cy="9" r="1.1" fill="var(--color-ink)" />
        </svg>
      ))}
    </div>
  );
}
