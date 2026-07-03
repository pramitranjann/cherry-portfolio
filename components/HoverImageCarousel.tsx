'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { WorkProject } from '@/lib/site-content-schema';
import { gradientStops, motifForAccent } from '@/lib/motifs';
import GradientField from '@/components/motifs/GradientField';
import AsciiArt from '@/components/motifs/AsciiArt';

function previewsOf(project: WorkProject): string[] {
  if (project.previewImages?.length) return project.previewImages;
  if (project.hoverImage) return [project.hoverImage];
  if (project.cover) return [project.cover];
  return [];
}

const PANEL_W = 260;
const PANEL_H = 195; // 4:3

/**
 * The floating work preview. Sits just off the cursor's right shoulder,
 * follows with a soft lag, and cycles a project's preview images while a
 * row is hovered. Projects without imagery get their designed motif cover.
 */
export function HoverImageCarousel({ project }: { project: WorkProject | null }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: -9999, y: -9999 });
  const quickRef = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);
  const [frame, setFrame] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  // panel sits right of the cursor, vertically centered on it, clamped to viewport
  const target = (x: number, y: number) => ({
    x: Math.min(x + 20, window.innerWidth - PANEL_W - 12),
    y: Math.max(12, Math.min(y - PANEL_H / 2, window.innerHeight - PANEL_H - 12)),
  });

  useEffect(() => {
    if (!enabled) return;
    const el = panelRef.current;
    if (!el) return;

    quickRef.current = {
      x: gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3.out' }),
    };

    const onMove = (e: MouseEvent) => {
      lastPos.current = { x: e.clientX, y: e.clientY };
      const t = target(e.clientX, e.clientY);
      quickRef.current?.x(t.x);
      quickRef.current?.y(t.y);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled]);

  // when a row is entered, place the panel AT the cursor before it fades in —
  // it should feel attached, never flown in from elsewhere
  useEffect(() => {
    setFrame(0);
    if (!project || !enabled) return;
    const el = panelRef.current;
    if (el && lastPos.current.x > -999) {
      const t = target(lastPos.current.x, lastPos.current.y);
      gsap.set(el, { x: t.x, y: t.y });
      quickRef.current = {
        x: gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3.out' }),
      };
    }
    const images = previewsOf(project);
    if (images.length < 2) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % images.length), 900);
    return () => clearInterval(id);
  }, [project, enabled]);

  if (!enabled) return null;

  const images = project ? previewsOf(project) : [];

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      style={{
        width: PANEL_W,
        height: PANEL_H,
        opacity: project ? 1 : 0,
        scale: project ? '1' : '0.97',
        transition: `opacity 200ms var(--ease-settle), scale 200ms var(--ease-settle)`,
        boxShadow: project ? '0 12px 40px rgba(23, 19, 16, 0.18)' : 'none',
      }}
    >
      {project &&
        (images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images[frame]}
            alt=""
            className="h-full w-full object-cover"
            style={{ border: '1px solid var(--color-line)' }}
          />
        ) : (
          <GradientField
            stops={gradientStops(project.accent)}
            grain
            className="flex h-full w-full items-center justify-center overflow-hidden"
          >
            <AsciiArt
              form={motifForAccent(project.accent)}
              tint="var(--color-surface)"
              className="text-[8px] opacity-90"
            />
          </GradientField>
        ))}
    </div>
  );
}
