'use client';

import type { ReactNode } from 'react';
import { accentVar } from '@/lib/motifs';

export interface FrameHandlesProps {
  children: ReactNode;
  label?: string;
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

/**
 * Figma-style selection frame: hairline outline, four corner handles, and
 * an optional multiplayer-style cursor chip carrying `label`.
 */
export default function FrameHandles({
  children,
  label,
  tint,
  animateIn = false,
  className,
}: FrameHandlesProps) {
  const color = tint ? accentVar(tint) : 'var(--color-accent-2)';

  return (
    <div className={`relative inline-block ${className ?? ''}`}>
      {animateIn && (
        <style>{`
          @keyframes motif-frame-outline {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes motif-frame-pop {
            0% { opacity: 0; transform: translate(var(--handle-t)) scale(0.6); }
            80% { opacity: 1; transform: translate(var(--handle-t)) scale(1.06); }
            100% { opacity: 1; transform: translate(var(--handle-t)) scale(1); }
          }
          @keyframes motif-frame-chip {
            0% { opacity: 0; transform: translate(20%, -130%) translateY(4px) scale(0.92); }
            100% { opacity: 1; transform: translate(20%, -130%); }
          }
          @media (prefers-reduced-motion: no-preference) {
            .motif-frame-outline-in {
              animation: motif-frame-outline var(--motion-med) var(--ease-settle) both;
            }
            .motif-frame-handle-in {
              animation: motif-frame-pop var(--motion-med) var(--ease-settle) both;
              animation-delay: calc(var(--motion-fast) * var(--handle-i, 0) / 3);
            }
            .motif-frame-chip-in {
              animation: motif-frame-chip var(--motion-med) var(--ease-settle) both;
              animation-delay: var(--motion-fast);
            }
          }
        `}</style>
      )}

      {children}

      {/* outline */}
      <span
        aria-hidden="true"
        className={animateIn ? 'motif-frame-outline-in' : ''}
        style={{
          position: 'absolute',
          inset: 0,
          border: `1px solid ${color}`,
          pointerEvents: 'none',
        }}
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

      {/* cursor chip */}
      {label && (
        <span
          aria-hidden="true"
          className={animateIn ? 'motif-frame-chip-in' : ''}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            transform: 'translate(20%, -130%)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M1 1L9 6.5L5 7.5L3.5 11L1 1Z" fill={color} />
          </svg>
          <span
            style={{
              background: color,
              color: 'var(--color-surface)',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11,
              lineHeight: 1,
              padding: '4px 7px',
              borderRadius: 4,
            }}
          >
            {label}
          </span>
        </span>
      )}
    </div>
  );
}
