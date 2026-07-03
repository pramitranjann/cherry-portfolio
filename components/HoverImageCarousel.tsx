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

/**
 * The floating work preview. Follows the cursor with a soft lag (she'd want
 * even the pointer to slow down) and cycles a project's preview images while
 * a row is hovered. Projects without imagery get their designed motif cover.
 * Never rendered on touch or under reduced motion.
 */
export function HoverImageCarousel({ project }: { project: WorkProject | null }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnabled(fine.matches && !noMotion.matches);
  }, []);

  // cursor following with lag
  useEffect(() => {
    if (!enabled) return;
    const el = panelRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });
    const onMove = (e: MouseEvent) => {
      xTo(e.clientX + 24);
      yTo(e.clientY - 90);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled]);

  // cycle preview frames while hovered
  useEffect(() => {
    setFrame(0);
    if (!project) return;
    const images = previewsOf(project);
    if (images.length < 2) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % images.length), 900);
    return () => clearInterval(id);
  }, [project]);

  if (!enabled) return null;

  const images = project ? previewsOf(project) : [];

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      style={{
        width: 'clamp(220px, 24vw, 320px)',
        aspectRatio: '4 / 3',
        opacity: project ? 1 : 0,
        scale: project ? '1' : '0.96',
        transition: `opacity var(--motion-fast) var(--ease-settle), scale var(--motion-fast) var(--ease-settle)`,
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
              className="text-[9px] opacity-80"
            />
          </GradientField>
        ))}
    </div>
  );
}
