import { getSiteContent } from '@/lib/site-content';
import KoiDrift from '@/components/motifs/KoiDrift';

export function Footer() {
  const { copy, aboutPage } = getSiteContent();

  return (
    <footer
      className="relative mt-32 overflow-hidden"
      style={{ borderTop: '1px solid var(--color-line)' }}
    >
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <p
          className="font-serif italic"
          style={{ fontSize: 'var(--text-h1)', color: 'var(--color-ink)' }}
        >
          {copy.footerLine}
        </p>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-6">
          <ul className="flex flex-wrap gap-6">
            {aboutPage.contactLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="font-mono lowercase transition-colors hover:text-[color:var(--color-accent)]"
                  style={{
                    fontSize: 'var(--text-meta)',
                    letterSpacing: '0.08em',
                    transitionDuration: 'var(--motion-fast)',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="u-eyebrow">{copy.footerMeta}</p>
        </div>
      </div>

      <KoiDrift count={1} className="absolute -right-10 bottom-2 h-40 w-72 opacity-60" />
    </footer>
  );
}
