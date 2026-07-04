import Link from 'next/link';
import { getSiteContent } from '@/lib/site-content';
import IntroAnimation from '@/components/IntroAnimation';
import { GsapReveal } from '@/components/GsapReveal';
import { AnimatedEyebrow } from '@/components/AnimatedEyebrow';
import { WorkIndex } from '@/components/WorkIndex';
import FrameHandles from '@/components/motifs/FrameHandles';
import RippleField from '@/components/motifs/RippleField';
import KoiDrift from '@/components/motifs/KoiDrift';
import AsciiArt from '@/components/motifs/AsciiArt';
import StickerCard from '@/components/motifs/StickerCard';
import GradientField from '@/components/motifs/GradientField';

const CURSOR_CORNERS = ['tl', 'tr', 'bl', 'br'] as const;
const CURSOR_COLORS = [
  'var(--color-accent-2)', // cobalt
  'var(--color-accent)', // cherry red
  'var(--color-amber)', // amber
  'var(--color-lilac)', // lilac
];

export default function Home() {
  const { home, copy, aboutPage } = getSiteContent();
  const [eyebrowLeft, eyebrowRight] = home.hero.eyebrow.split('—').map((s) => s.trim());
  const place = copy.footerMeta.split('—')[0]?.trim().toLowerCase();
  const contact = aboutPage.contactLinks[0];
  const skills = Array.isArray(copy.heroSkills) ? (copy.heroSkills as string[]) : [];
  const cursors = skills.slice(0, 4).map((label, i) => ({
    label,
    color: CURSOR_COLORS[i % CURSOR_COLORS.length],
    corner: CURSOR_CORNERS[i % CURSOR_CORNERS.length],
  }));

  return (
    <main className="overflow-x-clip">
      {/* ============ hero — a centered, quiet artifact cover ============ */}
      <section className="relative" style={{ minHeight: 'calc(100svh - 4rem)' }}>
        {/* water rings, dead-centre behind the name */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 w-[125vmin] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-80"
        >
          <RippleField rings={8} drift className="w-full" />
        </div>

        {/* one koi, drifting slowly through the upper right of the rings */}
        <KoiDrift
          count={1}
          className="absolute left-[56%] top-[24%] hidden h-56 w-72 md:block"
        />

        <IntroAnimation className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-6 text-center">
          {/* corner-pinned metadata — composed like the portfolio covers she pins */}
          <p data-intro="pop" className="u-eyebrow absolute left-6 top-7 md:left-10">
            {eyebrowLeft}
          </p>
          <p data-intro="pop" className="u-eyebrow absolute right-6 top-7 text-right md:right-10">
            {eyebrowRight}
          </p>
          {contact && (
            <a
              data-intro="pop"
              href={contact.href}
              target="_blank"
              rel="noreferrer"
              className="u-eyebrow absolute bottom-7 left-6 transition-colors hover:text-[color:var(--color-accent)] md:left-10"
              style={{ transitionDuration: 'var(--motion-fast)' }}
            >
              {contact.label.toLowerCase()} ↗
            </a>
          )}
          {place && (
            <p data-intro="pop" className="u-eyebrow absolute bottom-7 right-6 text-right md:right-10">
              ( {place} )
            </p>
          )}

          {typeof copy.heroRole === 'string' && (
            <p data-intro="focus" className="u-eyebrow">
              {copy.heroRole}
            </p>
          )}

          <div data-intro="focus" className="mt-10">
            <FrameHandles cursors={cursors}>
              <h1
                className="font-serif italic"
                style={{
                  fontSize: 'var(--text-display)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.01em',
                  padding: '0.06em 0.18em 0.1em',
                }}
              >
                {home.hero.name.split(' ').map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </h1>
            </FrameHandles>
          </div>

          <p
            data-intro="focus"
            className="mt-10 font-serif italic"
            style={{ fontSize: 'var(--text-h2)', color: 'var(--color-ink)' }}
          >
            {home.hero.tagline}
          </p>

          <p
            data-intro="focus"
            className="mt-5 max-w-[46ch]"
            style={{ color: 'var(--color-muted)' }}
          >
            {home.hero.intro}
          </p>

          <p
            data-intro="pop"
            className="u-eyebrow absolute bottom-7 left-1/2 -translate-x-1/2"
            style={{ color: 'var(--color-muted)' }}
          >
            {copy.scrollCue}
          </p>
        </IntroAnimation>
      </section>

      {/* ============ marquee ribbon ============ */}
      {typeof copy.marquee === 'string' && copy.marquee && (
        <div
          aria-hidden="true"
          className="mt-4 overflow-hidden py-5"
          style={{ borderTop: '1px solid var(--color-line)', borderBottom: '1px solid var(--color-line)' }}
        >
          <div className="u-marquee items-baseline gap-12 pr-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex shrink-0 items-baseline gap-12">
                <span
                  className="font-serif italic"
                  style={{
                    fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)',
                    color: 'var(--color-body)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {copy.marquee as string}
                </span>
                <span aria-hidden="true" style={{ color: 'var(--color-accent)', fontSize: '0.95rem' }}>
                  ✿
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ============ selected work ============ */}
      <section className="mx-auto mt-16 max-w-6xl px-6 md:mt-24">
        <AnimatedEyebrow>{`( ${home.selectedWork.heading.toLowerCase()} )`}</AnimatedEyebrow>
        <GsapReveal>
          <p
            className="u-measure mt-4 font-serif italic"
            style={{ fontSize: 'var(--text-h2)', color: 'var(--color-ink)', lineHeight: 1.25 }}
          >
            {home.selectedWork.body}
          </p>
        </GsapReveal>

        <GsapReveal className="mt-12" stagger={0.12}>
          <WorkIndex projects={home.selectedWork.items} />
        </GsapReveal>

        <GsapReveal className="mt-8">
          <Link
            href="/work"
            className="u-eyebrow inline-block transition-colors hover:text-[color:var(--color-accent)]"
            style={{ transitionDuration: 'var(--motion-fast)' }}
          >
            ( {copy.workCta} )
          </Link>
        </GsapReveal>
      </section>

      {/* ============ about teaser ============ */}
      <section className="mx-auto mt-28 max-w-6xl px-6 md:mt-40">
        <div className="grid items-center gap-12 md:grid-cols-[auto_1fr] md:gap-20">
          <GsapReveal className="justify-self-center md:justify-self-start">
            <StickerCard kind="polaroid" tilt={-3} className="w-60">
              <GradientField
                preset="everloop"
                grain
                className="flex aspect-square w-full items-center justify-center overflow-hidden"
              >
                <AsciiArt form="flower" tint="var(--color-surface)" className="text-[9px] opacity-90" />
              </GradientField>
              <p
                className="u-script absolute inset-x-0 bottom-2 text-center"
                style={{ fontSize: '1.05rem', color: 'var(--color-body)' }}
              >
                ( photo coming soon )
              </p>
            </StickerCard>
          </GsapReveal>

          <div>
            <AnimatedEyebrow>{`( ${home.about.heading.toLowerCase()} )`}</AnimatedEyebrow>
            <GsapReveal delay={0.1}>
              <p
                className="u-measure mt-4 font-serif italic"
                style={{ fontSize: 'var(--text-h2)', color: 'var(--color-ink)', lineHeight: 1.3 }}
              >
                {home.about.body}
              </p>
              <Link
                href="/about"
                className="u-eyebrow mt-8 inline-block transition-colors hover:text-[color:var(--color-accent)]"
                style={{ transitionDuration: 'var(--motion-fast)' }}
              >
                ( {home.about.linkLabel} )
              </Link>
            </GsapReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
