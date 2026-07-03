'use client';

import Link from 'next/link';
import type { WorkProject } from '@/lib/site-content-schema';
import { accentVar, gradientStops, motifForAccent } from '@/lib/motifs';
import GradientField from '@/components/motifs/GradientField';
import AsciiArt from '@/components/motifs/AsciiArt';

export interface ProjectCardProps {
  project: WorkProject;
  index: number;
  onHoverStart?: (project: WorkProject) => void;
  onHoverEnd?: () => void;
}

/**
 * One editorial index row. Desktop rows pair with the floating
 * HoverImageCarousel; small screens show the cover (or its designed
 * gradient/motif stand-in) inline.
 */
export function ProjectCard({ project, index, onHoverStart, onHoverEnd }: ProjectCardProps) {
  return (
    <Link
      href={project.href}
      className="group block"
      style={{ borderTop: '1px solid var(--color-line)' }}
      onMouseEnter={() => onHoverStart?.(project)}
      onMouseLeave={() => onHoverEnd?.()}
      onFocus={() => onHoverStart?.(project)}
      onBlur={() => onHoverEnd?.()}
    >
      {/* inline cover — small screens only */}
      <div className="pt-6 md:hidden">
        {project.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover}
            alt=""
            className="aspect-[4/3] w-full object-cover"
            style={{ border: '1px solid var(--color-line)' }}
          />
        ) : (
          <GradientField
            stops={gradientStops(project.accent)}
            grain
            className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden"
          >
            <AsciiArt
              form={motifForAccent(project.accent)}
              tint="var(--color-surface)"
              className="text-[10px] opacity-80"
            />
          </GradientField>
        )}
      </div>

      <div className="flex items-baseline gap-5 py-7 md:gap-8 md:py-9">
        <span className="u-eyebrow shrink-0 pt-2">{String(index + 1).padStart(2, '0')}</span>

        <div className="min-w-0 flex-1">
          <h3
            className="font-serif italic transition-colors group-hover:text-[color:var(--color-accent)]"
            style={{
              fontSize: 'var(--text-h1)',
              transitionDuration: 'var(--motion-fast)',
            }}
          >
            {project.title}
          </h3>
          <p className="mt-2 max-w-xl" style={{ color: 'var(--color-muted)' }}>
            {project.oneliner}
          </p>
        </div>

        <div className="hidden shrink-0 flex-col items-end gap-2 md:flex">
          <div className="flex flex-wrap justify-end gap-x-3 gap-y-1">
            {project.tags.map((tag) => (
              <span key={tag} className="u-eyebrow" style={{ color: accentVar(project.accent) }}>
                {tag}
              </span>
            ))}
          </div>
          <span
            aria-hidden="true"
            className="font-mono transition-transform group-hover:translate-x-1"
            style={{
              color: 'var(--color-muted)',
              transitionDuration: 'var(--motion-fast)',
            }}
          >
            {project.year ? `${project.year} → ` : '→'}
          </span>
        </div>
      </div>
    </Link>
  );
}
