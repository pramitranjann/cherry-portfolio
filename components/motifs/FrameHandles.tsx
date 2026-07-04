'use client';

import type { ReactNode } from 'react';
import type { CSSProperties } from 'react';
import { accentVar } from '@/lib/motifs';

export type FrameCorner = 'tl' | 'tr' | 'bl' | 'br';

export interface FrameCursor {
  label: string;
  color: string; // raw CSS color / token
  corner?: FrameCorner;
}

export interface FrameHandlesProps {
  children: ReactNode;
  /** single cursor chip (back-compat) */
  label?: string;
  /** multiple Figma-multiplayer cursors, e.g. her skills in different colors */
  cursors?: FrameCursor[];
  tint?: string;
  animateIn?: boolean;
  className?: string;
}

const HANDLE_POSITIONS = [
  { top: 0, left: 0, translate: '-50%, -50%' },
  { top: 0, right: 0, translate: '50%, -50%' },
  { bottom: 0, left: 0, translate: '-50%, 50%' },
  { bottom: 0, right: 0, translate: '50%, 50%' },
] as const;

const CORNER_STYLE: Record<FrameCorner, React.CSSProperties> = {
  tl: { top: 0, left: 0, transform: 'translate(-10%, -128%)', flexDirection: 'row' },
  tr: { top: 0, right: 0, transform: 'translate(10%, -128%)', flexDirection: 'row-reverse' },
  bl: { bottom: 0, left: 0, transform: 'translate(-10%, 128%)', flexDirection: 'row' },
  br: { bottom: 0, right: 0, transform: 'translate(10%, 128%)', flexDirection: 'row-reverse' },
};

/** A single multiplayer-style cursor: pointer arrow + name pill. */
function Cursor({ label, color, corner = 'tr', index = 0 }: FrameCursor & { index?: number }) {
  const flip = corner === 'tr' || corner === 'br';
  return (
    <span
      aria-hidden="true"
      className="motif-frame-cursor"
      style={{
        position: 'absolute',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        ...CORNER_STYLE[corner],
      }}
    >
      <span
        className="motif-frame-cursor-inner"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          '--cursor-i': index,
          '--cursor-drift-x': flip ? '-4px' : '4px',
        } as CSSProperties}
      >
        <span className="motif-frame-cursor-arrow">
          <svg width="15" height="18" viewBox="0 0 12 14" fill="none" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
            <path d="M1 1L10.5 7L6 8L4 12.5L1 1Z" fill={color} stroke="var(--color-surface)" strokeWidth="0.75" strokeLinejoin="round" />
          </svg>
        </span>
        <span
          style={{
            background: color,
            color: 'white',
            fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 0,
            lineHeight: '16px',
            padding: '5px 9px 6px',
            borderRadius: 4,
            boxShadow: '0 2px 5px rgba(23, 19, 16, 0.24)',
            textTransform: 'none',
          }}
        >
          {label}
        </span>
      </span>
    </span>
  );
}

/**
 * Figma-style selection frame: hairline outline, four corner handles, and
 * multiplayer cursor chips — used on the hero to label her name with her
 * skills, each in its own collaborator color.
 */
export default function FrameHandles({
  children,
  label,
  cursors,
  tint,
  animateIn = false,
  className,
}: FrameHandlesProps) {
  const color = tint ? accentVar(tint) : 'var(--color-accent-2)';
  const chips: FrameCursor[] = cursors ?? (label ? [{ label, color, corner: 'tr' }] : []);

  return (
    <div className={`relative inline-block ${className ?? ''}`}>
      <style>{`
        @keyframes motif-frame-cursor-drift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          44% { transform: translate3d(var(--cursor-drift-x), -5px, 0); }
          72% { transform: translate3d(calc(var(--cursor-drift-x) * -0.35), -2px, 0); }
        }
        @keyframes motif-frame-cursor-tap {
          0%, 78%, 100% { transform: scale(1); }
          84% { transform: scale(0.92); }
          90% { transform: scale(1.04); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .motif-frame-cursor-inner {
            animation: motif-frame-cursor-drift 3.8s var(--ease-drift) infinite;
            animation-delay: calc(var(--cursor-i, 0) * -680ms);
          }
          .motif-frame-cursor-arrow {
            display: inline-flex;
            transform-origin: 30% 20%;
            animation: motif-frame-cursor-tap 3.8s var(--ease-settle) infinite;
            animation-delay: calc(var(--cursor-i, 0) * -680ms);
          }
        }
      `}</style>

      {animateIn && (
        <style>{`
          @keyframes motif-frame-outline { from { opacity: 0; } to { opacity: 1; } }
          @keyframes motif-frame-pop {
            0% { opacity: 0; transform: translate(var(--handle-t)) scale(0.6); }
            80% { opacity: 1; transform: translate(var(--handle-t)) scale(1.06); }
            100% { opacity: 1; transform: translate(var(--handle-t)) scale(1); }
          }
          @media (prefers-reduced-motion: no-preference) {
            .motif-frame-outline-in { animation: motif-frame-outline var(--motion-med) var(--ease-settle) both; }
            .motif-frame-handle-in {
              animation: motif-frame-pop var(--motion-med) var(--ease-settle) both;
              animation-delay: calc(var(--motion-fast) * var(--handle-i, 0) / 3);
            }
          }
        `}</style>
      )}

      {children}

      {/* outline */}
      <span
        aria-hidden="true"
        className={animateIn ? 'motif-frame-outline-in' : ''}
        style={{ position: 'absolute', inset: 0, border: `1px solid ${color}`, pointerEvents: 'none' }}
      />

      {/* corner handles */}
      {HANDLE_POSITIONS.map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={animateIn ? 'motif-frame-handle-in' : ''}
          style={
            {
              position: 'absolute',
              width: 8,
              height: 8,
              background: 'var(--color-surface)',
              border: `1px solid ${color}`,
              pointerEvents: 'none',
              top: 'top' in pos ? pos.top : undefined,
              bottom: 'bottom' in pos ? pos.bottom : undefined,
              left: 'left' in pos ? pos.left : undefined,
              right: 'right' in pos ? pos.right : undefined,
              transform: `translate(${pos.translate})`,
              '--handle-t': pos.translate,
              '--handle-i': i,
            } as React.CSSProperties
          }
        />
      ))}

      {/* multiplayer cursors */}
      {chips.map((c, i) => (
        <Cursor key={i} {...c} index={i} />
      ))}
    </div>
  );
}
