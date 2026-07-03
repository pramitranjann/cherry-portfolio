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

export default function Home() {
  const { home, copy } = getSiteContent();

  return (
    <main className="overflow-x-clip">
      {/* ============ hero ============ */}
      <section className="relative" style={{ minHeight: 'calc(100svh - 4rem)' }}>
        {/* faint editorial grid, fading out from the content area */}
        <div
          aria-hidden="true"
          className="u-gridlines absolute inset-0 opacity-50"
          style={{
            maskImage: 'radial-gradient(ellipse 90% 80% at 35% 40%, black, transparent 78%)',
          }}
        />

        {/* water: ripple rings bleeding off-canvas, koi drifting through */}
        <div aria-hidden="true" className="absolute -right-[12%] top-[6%] w-[58vw] min-w-[420px]">
          <RippleField rings={7} drift className="w-full" />
          <KoiDrift count={2} className="absolute inset-0" />
        </div>

        {/* halftone bloom, bottom-left */}
        <AsciiArt
          form="bloom"
          tint="var(--color-sage)"
          className="absolute -bottom-4 -left-2 hidden text-[11px] opacity-60 md:block"
        />

        <IntroAnimation className="relative mx-auto flex max-w-6xl flex-col justify-center px-6 pb-24 pt-[14vh]">
          <p data-intro="focus" className="u-eyebrow">
            {home.hero.eyebrow}
          </p>

          <div data-intro="focus" className="mt-8 self-start">
            <FrameHandles label="cherry">
              <h1
                className="font-serif italic"
                style={{
                  fontSize: 'var(--text-display)',
                  lineHeight: 1.04,
                  padding: '0.05em 0.12em',
                }}
              >
                {home.hero.name}
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

          <p data-intro="focus" className="u-measure mt-5" style={{ color: 'var(--color-muted)' }}>
            {home.hero.intro}
          </p>

          <p data-intro="pop" className="u-eyebrow mt-20">
            {copy.scrollCue}
          </p>
        </IntroAnimation>
      </section>

      {/* ============ selected work ============ */}
      <section className="mx-auto mt-16 max-w-6xl px-6 md:mt-24">
        <AnimatedEyebrow>{`( ${home.selectedWork.heading.toLowerCase()} )`}</AnimatedEyebrow>
        <GsapReveal>
          <p
            className="u-measure mt-4 font-serif italic"
            style={{ fontSize: 'var(--text-h2)', color: 'var(--color-ink)' }}
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
                style={{ fontSize: 'var(--text-h2)', color: 'var(--color-ink)' }}
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
