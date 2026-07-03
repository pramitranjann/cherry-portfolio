'use client';

import { useState } from 'react';
import type { WorkProject } from '@/lib/site-content-schema';
import { ProjectCard } from '@/components/ProjectCard';
import { HoverImageCarousel } from '@/components/HoverImageCarousel';

/** The editorial work index: rows + the cursor-following preview. */
export function WorkIndex({ projects }: { projects: WorkProject[] }) {
  const [hovered, setHovered] = useState<WorkProject | null>(null);

  return (
    <div style={{ borderBottom: '1px solid var(--color-line)' }}>
      {projects.map((project, i) => (
        <ProjectCard
          key={project.href}
          project={project}
          index={i}
          onHoverStart={setHovered}
          onHoverEnd={() => setHovered(null)}
        />
      ))}
      <HoverImageCarousel project={hovered} />
    </div>
  );
}
