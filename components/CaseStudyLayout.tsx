import Link from 'next/link';
import type { CaseStudyContent, MediaBlock } from '@/lib/site-content-schema';
import { isSafeEmbedUrl, renderRichText } from '@/lib/security';
import { accentVar, gradientStops } from '@/lib/motifs';
import { GsapReveal } from '@/components/GsapReveal';
import { AnimatedEyebrow } from '@/components/AnimatedEyebrow';
import { CaseStudyRail } from '@/components/CaseStudyRail';
import GradientField from '@/components/motifs/GradientField';
import RippleField from '@/components/motifs/RippleField';
import StickerCard from '@/components/motifs/StickerCard';

function Media({ block }: { block: MediaBlock }) {
  if (block.kind === 'embed') {
    if (!block.embedUrl || !isSafeEmbedUrl(block.embedUrl)) return null;
    return (
      <figure className="my-10">
        <iframe
          src={block.embedUrl}
          className="aspect-video w-full"
          style={{ border: '1px solid var(--color-line)' }}
          allowFullScreen
          loading="lazy"
        />
        {block.caption && <figcaption className="u-eyebrow mt-3">{block.caption}</figcaption>}
      </figure>
    );
  }

  const images = block.images ?? [];
  if (images.length === 0) return null;

  const layout = block.layout ?? 'full';
  const gridClass =
    block.kind === 'gallery' || layout === 'split'
      ? 'grid gap-4 sm:grid-cols-2'
      : 'grid gap-4';
  const widthClass = layout === 'inset' ? 'mx-auto max-w-2xl' : '';

  return (
    <figure className={`my-10 ${widthClass}`}>
      <div className={gridClass}>
        {images.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={block.caption ?? ''}
            className="w-full object-cover"
            style={{ border: '1px solid var(--color-line)' }}
            loading="lazy"
          />
        ))}
      </div>
      {block.caption && <figcaption className="u-eyebrow mt-3">{block.caption}</figcaption>}
    </figure>
  );
}

function PagerCard({
  link,
  direction,
  accent,
}: {
  link: { title: string; href: string } | null;
  direction: 'previous' | 'next';
  accent: string;
}) {
  if (!link) return <div />;
  return (
    <Link
      href={link.href}
      className="group block p-8 transition-colors md:p-12"
      style={{ border: '1px solid var(--color-line)' }}
    >
      <p className="u-eyebrow">( {direction} )</p>
      <p
        className="mt-3 font-serif italic transition-colors group-hover:text-[color:var(--pager-accent)]"
        style={
          {
            fontSize: 'var(--text-h2)',
            color: 'var(--color-ink)',
            transitionDuration: 'var(--motion-fast)',
            '--pager-accent': accent,
          } as React.CSSProperties
        }
      >
        {direction === 'previous' ? '← ' : ''}
        {link.title}
        {direction === 'next' ? ' →' : ''}
      </p>
    </Link>
  );
}

/** Renders one case study from its content object. */
export function CaseStudyLayout({ study }: { study: CaseStudyContent }) {
  const accent = accentVar(study.accent);
  const midpoint = Math.ceil(study.sections.length / 2);

  const railItems = study.sections.map((s) => ({
    id: `section-${s.key}`,
    label: s.eyebrow,
  }));

  return (
    <article>
      {/* ============ hero ============ */}
      <header>
        <GradientField stops={gradientStops(study.accent)} grain className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pb-24 md:pt-28">
            <p className="u-eyebrow" style={{ color: 'var(--color-ink)', opacity: 0.75 }}>
              ( work / {study.slug} ) — {study.type}
              {study.year ? ` · ${study.year}` : ''}
            </p>
            <h1
              className="mt-4 font-serif italic"
              style={{ fontSize: 'clamp(3.25rem, 10vw, 9rem)', lineHeight: 0.98 }}
            >
              {study.title}
            </h1>
            <p
              className="u-measure mt-5 font-serif italic"
              style={{ fontSize: 'var(--text-h2)', color: 'var(--color-ink)', opacity: 0.85 }}
            >
              {study.oneliner}
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-x-4 gap-y-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="u-eyebrow px-3 py-1.5"
                  style={{
                    color: 'var(--color-ink)',
                    border: '1px solid color-mix(in srgb, var(--color-ink) 25%, transparent)',
                    borderRadius: 999,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {study.team && (
              <p className="u-eyebrow mt-6" style={{ color: 'var(--color-ink)', opacity: 0.7 }}>
                {study.team}
              </p>
            )}

            {study.award && (
              <div className="absolute right-6 top-16 hidden max-w-[15rem] md:block">
                <StickerCard kind="stamp" tilt={3}>
                  <p className="px-4 py-3 font-mono text-[0.7rem] leading-relaxed">🏆 {study.award}</p>
                </StickerCard>
              </div>
            )}
          </div>
        </GradientField>
        {study.award && (
          <p className="u-eyebrow mx-auto mt-6 max-w-6xl px-6 md:hidden">🏆 {study.award}</p>
        )}
      </header>

      {/* ============ body ============ */}
      <div className="mx-auto grid max-w-6xl gap-16 px-6 pt-16 md:pt-24 xl:grid-cols-[14rem_1fr]">
        <CaseStudyRail items={railItems} accent={accent} />

        <div className="min-w-0 max-w-3xl">
          {study.sections.map((section, i) => (
            <GsapReveal
              key={section.key}
              as="section"
              className={i === 0 ? '' : 'mt-20 md:mt-28'}
            >
              <div id={`section-${section.key}`} className="scroll-mt-28">
                <AnimatedEyebrow>
                  {`${String(i + 1).padStart(2, '0')} — ${section.eyebrow}`}
                </AnimatedEyebrow>
                {section.headline && (
                  <h2 className="mt-4" style={{ fontSize: 'var(--text-h1)' }}>
                    {section.headline}
                  </h2>
                )}
                <div
                  className="u-rich-text u-measure mt-6"
                  dangerouslySetInnerHTML={{ __html: renderRichText(section.body) }}
                />
                {section.media?.map((block, j) => <Media key={j} block={block} />)}

                {/* the pull quote surfaces mid-story, over quiet water */}
                {study.pullQuote && i === midpoint - 1 && (
                  <aside className="relative my-24 md:my-32">
                    <RippleField
                      rings={6}
                      className="absolute left-1/2 top-1/2 w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-70"
                    />
                    <blockquote
                      className="relative mx-auto max-w-xl text-center font-serif italic"
                      style={{ fontSize: 'var(--text-h1)', lineHeight: 1.2, color: accent }}
                    >
                      “{study.pullQuote}”
                    </blockquote>
                  </aside>
                )}
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>

      {/* ============ prev / next ============ */}
      <nav aria-label="More work" className="mx-auto mt-24 grid max-w-6xl gap-4 px-6 md:mt-32 md:grid-cols-2">
        <PagerCard link={study.prev} direction="previous" accent={accent} />
        <PagerCard link={study.next} direction="next" accent={accent} />
      </nav>
    </article>
  );
}
