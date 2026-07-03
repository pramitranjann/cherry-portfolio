import { getSiteContent } from '@/lib/site-content';
import KoiDrift from '@/components/motifs/KoiDrift';

/** Ink color-block footer — the site's quiet, confident sign-off. */
export function Footer() {
  const { copy, aboutPage } = getSiteContent();

  return (
    <footer
      className="relative mt-32 overflow-hidden"
      style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }}
    >
      <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-24 md:pt-32">
        <p className="u-eyebrow" style={{ color: 'var(--color-muted)' }}>
          ( before you go )
        </p>
        <p
          className="mt-4 font-serif italic"
          style={{ fontSize: 'var(--text-hero)', lineHeight: 1.05, color: 'var(--color-bg)' }}
        >
          {copy.footerLine}
        </p>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-6 border-t pt-8" style={{ borderColor: 'rgba(243, 236, 221, 0.18)' }}>
          <ul className="flex flex-wrap gap-6">
            {aboutPage.contactLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="font-mono lowercase transition-colors hover:text-[color:var(--color-peach)]"
                  style={{
                    fontSize: 'var(--text-meta)',
                    letterSpacing: '0.08em',
                    color: 'var(--color-bg)',
                    transitionDuration: 'var(--motion-fast)',
                  }}
                >
                  ( {link.label.toLowerCase()} )
                </a>
              </li>
            ))}
          </ul>
          <p
            className="font-mono uppercase"
            style={{ fontSize: 'var(--text-eyebrow)', letterSpacing: '0.14em', color: 'var(--color-muted)' }}
          >
            {copy.footerMeta}
          </p>
        </div>
      </div>

      {/* a koi crossing the dark — cream-bodied so it reads on ink */}
      <KoiDrift count={1} scheme="ink" className="absolute -right-6 top-6 h-44 w-80 opacity-80" />
    </footer>
  );
}
