import { getSiteContent } from '@/lib/site-content';

// ponytail: temporary smoke stub — replaced by the real home page in Phase 3D
export default function Home() {
  const { home } = getSiteContent();
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="u-eyebrow">{home.hero.eyebrow}</p>
      <h1 className="italic" style={{ fontSize: 'var(--text-hero)' }}>
        {home.hero.name}
      </h1>
      <p className="mt-4">{home.hero.tagline}</p>
    </main>
  );
}
