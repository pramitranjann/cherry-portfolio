'use client';

import Link from 'next/link';
import type { WorkProject } from '@/lib/site-content-schema';
import { accentVar, gradientStops, motifForAccent } from '@/lib/motifs';
import GradientField from '@/components/motifs/GradientField';
import AsciiArt from '@/components/motifs/AsciiArt';

export interface ProjectCardProps {
  project: WorkProject;
  index: number;
}

function previewSrc(project: WorkProject): string | undefined {
  return project.cover ?? project.hoverImage ?? project.previewImages?.[0];
}

/** The preview tile — image if she has one, else the project's designed motif. */
function PreviewTile({ project, className }: { project: WorkProject; className?: string }) {
  const src = previewSrc(project);
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        className={`h-full w-full object-cover ${className ?? ''}`}
        style={{ border: '1px solid var(--color-line)' }}
      />
    );
  }
  return (
    <GradientField
      stops={gradientStops(project.accent)}
      grain
      className={`flex h-full w-full items-center justify-center overflow-hidden ${className ?? ''}`}
    >
      <AsciiArt form={motifForAccent(project.accent)} tint="var(--color-surface)" className="text-[9px] opacity-90" />
    </GradientField>
  );
}

/**
 * One editorial index row. The preview lives *inside* the row's right column —
 * it reveals in place on hover, so it can never drift away from its project.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={project.href}
      className="group -mx-4 block px-4 transition-colors hover:bg-[color-mix(in_srgb,var(--row-accent)_7%,transparent)] md:-mx-6 md:px-6"
      style={
        {
          borderTop: '1px solid var(--color-line)',
          transitionDuration: 'var(--motion-med)',
          '--row-accent': accentVar(project.accent),
        } as React.CSSProperties
      }
    >
      {/* inline cover — small screens only */}
      <div className="pt-6 md:hidden">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <PreviewTile project={project} />
        </div>
      </div>

      <div className="flex items-center gap-5 py-6 md:gap-8 md:py-7">
        <span
          className="u-eyebrow shrink-0 transition-colors group-hover:text-[color:var(--row-accent)]"
          style={{ transitionDuration: 'var(--motion-fast)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="min-w-0 flex-1">
          <h3
            className="font-serif italic transition-transform duration-500 group-hover:translate-x-2"
            style={{ fontSize: 'var(--text-h1)', transitionTimingFunction: 'var(--ease-settle)' }}
          >
            {project.title}
          </h3>
          <p className="mt-1.5 max-w-md" style={{ color: 'var(--color-muted)' }}>
            {project.oneliner}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="u-pill" style={{ color: accentVar(project.accent) }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* right column: reserved space; arrow at rest, preview tile on hover */}
        <div className="relative hidden h-[132px] w-[210px] shrink-0 md:block">
          {/* arrow, fades out on hover */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-end font-mono opacity-100 transition-opacity duration-300 group-hover:opacity-0"
            style={{ color: 'var(--color-muted)' }}
          >
            {project.year ? `${project.year} →` : '→'}
          </span>
          {/* preview tile, reveals in place */}
          <div
            className="absolute inset-0 origin-right opacity-0 [transform:scale(0.96)_translateX(10px)] transition-all duration-500 group-hover:opacity-100 group-hover:[transform:scale(1)_translateX(0)]"
            style={{
              transitionTimingFunction: 'var(--ease-settle)',
              boxShadow: '0 10px 30px rgba(23,19,16,0.14)',
            }}
          >
            <PreviewTile project={project} />
          </div>
        </div>
      </div>
    </Link>
  );
}
