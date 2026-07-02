# Cherry Phan Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Fable 5 orchestrates; implementation tasks are dispatched to Sonnet subagents working in parallel where marked.

**Goal:** Build Cherry Phan's standalone portfolio site (Next.js 16 / React 19 / TS / Tailwind 4 / GSAP + Motion), content-driven from `content/site-content.json`, with a password-gated dashboard that edits the JSON and publishes via GitHub commit — visually unmistakably *hers*.

**Architecture:** JSON-as-content + typed schema + `server-only` loader; all theming through CSS custom properties in `app/globals.css`; motif component kit carries the visual identity; dashboard writes local file in dev, commits to GitHub in prod, read-only fallback.

**Tech Stack:** `next@16`, `react@19`, `typescript`, `tailwindcss@4` (+ `@tailwindcss/postcss`), `gsap`, `motion`, `marked`, `isomorphic-dompurify`. Dev: `tsx` (test runner only). No database. Deployed on Vercel.

## Global Constraints

- Standalone repo. No file imported from any other project. **No database.**
- All visitor-facing theming via CSS custom properties in `app/globals.css`; components reference tokens, never hex.
- Narrative/rich-text fields render via `marked` → `isomorphic-dompurify`; never unsanitized `dangerouslySetInnerHTML`.
- `prefers-reduced-motion` honored in every animated component (GSAP `matchMedia`, CSS `@media`). Non-negotiable.
- Only real facts in content. Fabricating metrics/quotes/dates/outcomes is forbidden; genuine unknowns get `TODO(cherry): …` markers.
- Nav shows only sections listed in `content.visibleSections` (launch: `home, work, about`). Hidden routes still render when visited directly.
- Dashboard routes are `noindex, nofollow`; `robots.ts` disallows `/dashboard` and `/api`.
- Personality dial: 60% polished-editorial / 40% playful. Sophisticated whimsy, never juvenile, never generic-AI-aesthetic.
- Env vars documented in `.env.example`: `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `GITHUB_TOKEN`, `GITHUB_REPO_OWNER`, `GITHUB_REPO_NAME`, `GITHUB_CONTENT_BRANCH`, `GITHUB_CONTENT_PATH`.

---

## CHANGELOG — critique of the spec, and what I changed

Per spec §0 I read the whole spec, the references folder (11 screenshots), and the moodboard captures, then revised. Changes and reasoning:

1. **The references folder contains her *moodboard* only, not her own work.** All 11 screenshots are Behance moodboard captures (Thiên Kim koi portfolio, "Life is Texture"/MASISA, Atelier Sucré, flowbutter, Vera dinner-plate portfolio, Mi An scrapbook CV, jixel mono CV, Swirlica ceramics, Fortune Charms stamps, VN75 keychain, Qubril stamp collage). The Aurora deck / Everloop screens / Mugmood / Tessera / personal-banner images described in §4a are **absent**, so per §4a I build those visuals from the spec's written descriptions. Consequence: **no fake project imagery.** Case studies without real art get *designed covers* — per-project accent `GradientField` + halftone/ASCII motif — and `TODO(cherry)` markers for real screens. The two Behance links are covered by the two full-board screenshots; the moodboard is auth-walled to fetch live, so those captures are the source.
2. **Elevated the ripple/loop to the site's unifying geometry** (spec buried koi/ripples as motif item *h*). The Thiên Kim koi-and-ripples piece is the strongest single image in her curated taste, and the concentric ring is the one shape that ties her whole body of work together: coffee rings and waiting (Mugmood), Record→Reflect→Revisit loops (Everloop), rippling small moments (Tessera), water/koi (heritage), "slow down" (a ripple is literally slowness made visible). `RippleField` + `KoiDrift` become signature components: hero, dividers, pull-quotes, hovers, loaders. This gives the site a *concept*, not just a mood.
3. **Consolidated the motif kit from 8 component families to 6 components + 3 CSS utilities.** Spec items (e) TextureField, (f) EditorialGrid, (g) SoftBlur are surface treatments, not components — they become `globals.css` utilities (`.u-grain`, `.u-gridlines`, blur-reveal handled by `GsapReveal`), usable on *any* element with zero prop plumbing. Fewer, better-crafted primitives beat a sprawling kit. `AsciiArt` is one data-driven component (glyph maps in `lib/motifs.ts`), so adding a form = adding data, exactly as the spec wanted.
4. **Made the case-study arc *actually* reorderable.** Spec §1 requires the arc as "a reorderable default," but §6's schema hardcodes six optional fields in fixed render order — you cannot reorder or rename via content. Replaced with `sections: CaseSection[]` (`{ key, eyebrow, headline, body, media? }`), seeded in the canonical arc order. Media now attaches *to sections* (true interleaving) instead of the parallel `mediaBlocks[]` array that had no interleave positions. This is a schema-shape fix in service of a keeper, not a revision of the keeper. (Flagged since §6 is skeleton-adjacent: the *pattern* — typed schema + guard + loader — is untouched.)
5. **Work index is a fashion-editorial index, not a card grid, on desktop.** Large italic-serif title rows with mono meta columns and a cursor-following preview that lags softly behind the pointer (her "slow down" persona applied to an interaction). The hover-preview keeper is fully preserved — data-backed `WorkProject[]`, `previewImages` cycling while hovered — the *feel* is reskinned as spec invites. Touch/mobile gets stacked cards (`ProjectCard`). A card grid is the AI-default; an index is what someone who pins Atelier Sucré would do.
6. **Typography locked to real, license-safe fonts** (spec asked for the register, not names): **Fraunces** (high-contrast display serif, dramatic italic, optical sizing + wonk axis — the Canela/Ogg register), **Instrument Sans** (grotesk body/UI, wide-tracked caps labels), **IBM Plex Mono** (designer-meta eyebrows/captions), plus **Caveat** as a sparing script accent (the red script annotations all over her moodboard: "Education", "Award"). All Google Fonts via `next/font` — self-hosted, zero CLS.
7. **Motion language: "focus-pull."** Reveals de-blur and settle (soft-focus → sharp) rather than slide; long durations (600–900ms), gentle overshoot-free easing; ripple-order staggers radiating from the triggering element. Page transitions are enter-only (Next App Router `template.tsx`) — exit animations on App Router fight the framework and read as lag. The intro is in-hero choreography gated to first visit per session (no blocking overlay; repeat navigation stays calm).
8. **Home hero concept locked:** cream paper + grain + faint editorial gridlines; giant Fraunces-italic name wrapped in `FrameHandles` with a Figma-style cursor chip; `RippleField` bleeding off-canvas with 2 koi drifting; halftone floral cluster; mono parenthetical eyebrow `( design with empathy )`; scroll cue `( scroll slowly )`. Editorial base, generous play — the 60/40 dial made concrete.
9. **"Sonnet 4.6" is not available in this harness.** The Agent tool exposes `sonnet` / `opus` / `haiku` / `fable`; there is no 4.6 pin. Subagents run on `sonnet` (the closest available Sonnet). Flagged, not silently ignored.
10. **Loader reads the JSON via static import**, not `fs`-at-request: dev edits still hot-reload (Turbopack watches the JSON), prod updates arrive via the GitHub-commit → redeploy path anyway, and it removes the Vercel file-tracing config a runtime `fs` read requires. Same pattern, fewer moving parts. `isSiteContent()` guard still validates at load and fails loudly.
11. **Small dashboard scope cut, per spec's own instruction:** content-only editing with add/remove/reorder for arrays, image picker, visibility toggles, three write modes. No per-component style knobs. Reorder = up/down buttons, no drag-and-drop dependency.

Everything else in the spec stands. Fixed-skeleton items are reproduced faithfully; keepers kept.

---

## Design direction (the bible for every subagent)

**Persona in one line:** *the designer who tells you to slow down* — Vietnamese SCAD freshman, editorial storyteller, empathy-led, designs about time/memory/ritual. Every choice must feel warm, unhurried, crafted. If an interaction feels brisk or "efficient," it's wrong.

### Tokens (defined once in `app/globals.css`, referenced everywhere)

```css
/* color — muted sophisticated grounds, punchy pops */
--color-bg: #F7F2E8;          /* warm cream paper */
--color-surface: #FCF9F2;
--color-ink: #211D18;          /* charcoal-ink headlines */
--color-body: #433D35;
--color-muted: #877E71;
--color-line: rgba(33, 29, 24, 0.16);
--color-accent: #D96A8B;       /* cherry dusty-rose — hers, present not dominant */
--color-accent-2: #4059C9;     /* cornflower/cobalt */
--color-pop-red: #E0402A;      /* fire-engine pop — sparingly */
--color-pop-lime: #B9C42A;     /* chartreuse pop — sparingly */
--color-sage: #A9AC8C;  --color-terracotta: #BE5F3E;  --color-oxblood: #6F2B26;
--color-amber: #E3A23C;  --color-peach: #F2B48C;  --color-lilac: #B4A3E0;

/* per-project accents + gradient stops (driven by content `accent`) */
--accent-aurora: #E87F9F;   --grad-aurora: #F2A79C, #EC7FA3, #F6C79A;
--accent-mugmood: #E3A23C;  --grad-mugmood: #F3C053, #E3973B, #C9742E;
--accent-everloop: #E76D96; --grad-everloop: #F290AF, #F6B591, #FBD9C0;
--accent-tessera: #7D95E8;  --grad-tessera: #92B1F0, #B4A3E0, #E4B8D6;
--accent-wally: #6E85F7;    --grad-wally: #6E85F7, #B9C7FA; /* TODO(cherry): confirm Wally accent */

/* type */
--font-serif / --font-sans / --font-mono / --font-script  (set by next/font in layout)
--text-display: clamp(3.5rem, 10vw, 8.5rem);
--text-hero: clamp(2.5rem, 6vw, 5rem);
--text-h1: clamp(2rem, 4vw, 3.25rem);
--text-h2: clamp(1.5rem, 3vw, 2.25rem);
--text-body: clamp(1rem, 1.1vw, 1.125rem);
--text-meta: 0.8125rem;  --text-eyebrow: 0.75rem;

/* motion — breathes, never snaps */
--motion-slow: 900ms; --motion-med: 600ms; --motion-fast: 300ms;
--ease-drift: cubic-bezier(0.22, 1, 0.36, 1);
--ease-settle: cubic-bezier(0.16, 1, 0.3, 1);
--reveal-y: 28px; --reveal-blur: 10px;
```

Utilities in globals: `.u-grain` (SVG-noise pseudo-element overlay, ~5% opacity), `.u-gridlines` (thin visible layout grid, `--color-line`), `.u-measure` (max-width 65ch), mono-caps eyebrow class `.u-eyebrow` (letter-spacing 0.14em, uppercase). `@media (prefers-reduced-motion: reduce)` kills CSS animations globally.

### Type rules
- Fraunces italic (optical size high, soft wonk) for display/hero/case-study titles and the big feeling moments. Roman Fraunces for section headlines.
- Instrument Sans for body/UI; caps + wide tracking for labels/buttons.
- IBM Plex Mono for eyebrows, numbering (`01 — The Problem`), tags, captions, parentheticals: `( scroll slowly )`.
- Caveat script *only* for tiny annotations on ephemera/stickers (like her moodboard's red script).

### Voice
Warm, thoughtful friend; lowercase-friendly in micro-moments; parenthetical mono asides; never brand-speak. E.g. empty state: `( nothing here yet — come back soon )`.

### Page concepts (locked; subagents implement, orchestrator holds the bar)
- **Home:** hero per changelog §8 → Selected Work (3 editorial index rows w/ hover preview) → About teaser (StickerCard polaroid + short bio + mono link) → Footer with huge italic *"Let's take our time."*, contact links, tiny koi.
- **Work:** italic hero title + full editorial index; desktop cursor-following preview panel (GSAP `quickTo`, ~0.35 lag), cycling `previewImages` every 900ms while hovered; mobile stacked `ProjectCard`s. Row: mono index no. · italic serif title · oneliner · mono tags · arrow.
- **Case study (`CaseStudyLayout`):** accent gradient hero wash + grain; mono eyebrow (type), display italic title, oneliner, tag chips; Everloop gets a stamp-style `StickerCard` award badge (**🏆 1st place, CreateSC 2026**). Desktop sticky mono section rail (scrollspy). Sections: numbered eyebrows, serif headlines, 65ch body, media full/inset/split. `pullQuote` = big italic over faint `RippleField`. Prev/next = split full-width cards, accent gradient + `FrameHandles` on hover.
- **About:** editorial two-column; `whoIAm` rich text; experience/education as mono-ruled CV rows (jixel-reference register); tools as small sticker chips; big italic contact moment.
- **Creative:** loose scrapbook gallery (`StickerCard` tilts, captions in script). **Play:** experiments list with motif tiles. Both sparse, both fine.
- **Dashboard:** clean cream UI, mono labels, serif headings; left tab rail (Home / Work / Case Studies / About / Creative / Play / Copy / Visibility); arrays with add/remove/↑↓; image-picker modal (from `/api/admin/file-picker`); save button shows write mode (`local` / `github` / `readonly`); unsaved-changes guard. Login: centered card wrapped in `FrameHandles`, friendly microcopy.

---

## Contracts (exact — all agents code against these)

### `lib/site-content-schema.ts` (full shape)

```ts
export type SectionKey = 'home' | 'work' | 'about' | 'creative' | 'play';

export interface LinkItem { label: string; href: string }
export interface EntryItem { org: string; role: string; date: string; desc: string }
export interface ProjectLink { title: string; href: string }

export interface MediaBlock {
  kind: 'image' | 'gallery' | 'embed';
  images?: string[];
  embedUrl?: string;
  caption?: string;
  layout?: 'full' | 'inset' | 'split';
}

export interface CaseSection {
  key: string;                 // 'problem' | 'role' | ... | custom
  eyebrow: string;             // "The Problem"
  headline?: string;
  body: string;                // rich text (markdown)
  media?: MediaBlock[];
}

export interface WorkProject {
  title: string; oneliner: string; tags: string[]; href: string;
  cover?: string; hoverImage?: string; previewImages?: string[];
  accent?: string;             // token name e.g. "aurora" → var(--accent-aurora)
  year?: string;
}

export interface CaseStudyContent {
  slug: string; title: string; oneliner: string; type: string;
  tags: string[]; accent?: string; heroImage?: string; year?: string;
  award?: string;              // e.g. "1st place — CreateSC 2026 UI/UX Designathon"
  team?: string;               // real collaborators only
  prev: ProjectLink | null; next: ProjectLink | null;
  pullQuote?: string;
  sections: CaseSection[];     // ordered; default = problem→role→research→process→solution→outcomes
}

export interface SiteContent {
  home: {
    hero: { name: string; tagline: string; intro: string; eyebrow: string };
    selectedWork: { heading: string; body: string; items: WorkProject[] };
    about: { heading: string; body: string; linkLabel: string };
  };
  workPage: { heroTitle: string; heroBody: string; projects: WorkProject[] };
  aboutPage: {
    heroBody: string; whoIAm: string;
    experience: EntryItem[]; education: EntryItem[]; tools: string[];
    contactTitle: string; contactBody: string; contactLinks: LinkItem[];
  };
  creative: { heroTitle: string; heroBody: string; items: { title: string; caption?: string; image?: string; tint?: string }[] };
  play: { heroTitle: string; heroBody: string; experiments: { title: string; body?: string; href?: string; motif?: string }[] };
  copy: {
    navLabels: Partial<Record<SectionKey, string>>;
    footerLine: string; footerMeta: string;
    workCta: string; scrollCue: string; emptyState: string;
    [k: string]: unknown;
  };
  visibleSections: SectionKey[];
  caseStudies: CaseStudyContent[];
}

export function isSiteContent(x: unknown): x is SiteContent;  // structural guard, throws nothing, returns boolean
export function assertSiteContent(x: unknown): asserts x is SiteContent; // throws with the failing path
```

### `lib/site-content.ts`
```ts
import 'server-only';
export function getSiteContent(): SiteContent;      // static import of content/site-content.json, assertSiteContent, memoized
export function getCaseStudy(slug: string): CaseStudyContent | undefined;
export function getVisibleSections(): SectionKey[];
```

### `lib/security.ts` (no `server-only`; unit-tested)
```ts
export function constantTimeEqual(a: string, b: string): boolean;          // crypto.timingSafeEqual over sha256 digests
export function isSafeLinkHref(href: string): boolean;                     // http(s):, mailto:, site-relative /
export function isSafeEmbedUrl(url: string): boolean;                      // https + host allowlist: youtube.com/embed, youtube-nocookie, player.vimeo.com, figma.com/embed
export function renderRichText(md: string): string;                        // marked → DOMPurify.sanitize; strips event handlers/scripts
```

### `lib/admin-auth.ts` (no `server-only` import; uses next/headers only inside functions that need it — split pure helpers for tests)
```ts
export function signSession(expiresAtMs: number, secret: string): string;  // `${exp}.${hmacSha256Hex(exp, secret)}`
export function verifySessionToken(token: string, secret: string, now?: number): boolean;
export async function createAdminSession(): Promise<void>;                 // sets cookie 'cherry_admin', httpOnly, sameSite=lax, secure in prod, 14d
export async function isAdminSession(): Promise<boolean>;
export async function destroyAdminSession(): Promise<void>;
```

### `lib/dashboard-storage.ts`
```ts
export type StorageMode = 'local' | 'github' | 'readonly';
export function resolveStorageMode(env = process.env): StorageMode;
// GITHUB_TOKEN && GITHUB_REPO_OWNER && GITHUB_REPO_NAME → 'github'
// else !process.env.VERCEL → 'local'
// else 'readonly'
export async function persistContent(content: SiteContent): Promise<{ mode: StorageMode }>; // local: fs write w/ 2-space JSON; github: commitContentToGitHub; readonly: throw
```

### `lib/github-content.ts` (`server-only`)
```ts
export async function commitContentToGitHub(json: string): Promise<void>;
// GET /repos/{owner}/{repo}/contents/{path}?ref={branch} → sha (404 ok)
// PUT same path { message: 'content: update via dashboard', content: base64, sha?, branch }
```

### API routes (all under `app/api/admin/`)
- `login/route.ts` — POST `{ password }` → 200 + cookie | 401. Constant-time compare vs `ADMIN_PASSWORD`. 500 if env unset.
- `logout/route.ts` — POST → clears cookie.
- `content/route.ts` — POST `SiteContent` → requires `isAdminSession()`, `assertSiteContent`, `persistContent` → `{ ok: true, mode }` | 401/400/409(readonly).
- `file-picker/route.ts` — GET → requires session → `{ images: string[] }` (recursive `/public`, extensions png|jpg|jpeg|webp|avif|svg|gif, as `/`-rooted paths).

### Motif kit (`components/motifs/`, helpers in `lib/motifs.ts`)
```ts
// lib/motifs.ts
export const ASCII_FORMS: Record<string, string>;  // multiline char maps: flower, bloom, moka, star, sparkle, heart, loop, wave, tile
export function accentVar(name?: string): string;   // 'aurora' → 'var(--accent-aurora)', fallback var(--color-accent)
export function gradientStops(name?: string): string; // 'aurora' → 'var(--grad-aurora)' stop list
```
- `AsciiArt.tsx` `{ form: keyof typeof ASCII_FORMS; tint?: string; className?: string }` — `<pre aria-hidden>`, token-tinted, `select-none`.
- `RippleField.tsx` `{ rings?: number; tint?: string; className?: string; drift?: boolean }` — SVG concentric ellipses, hairline strokes, optional slow scale/opacity drift (CSS animation, disabled under reduced motion).
- `KoiDrift.tsx` `{ count?: 1 | 2 | 3; className?: string }` — small koi SVGs on slow elliptical CSS offset-path loops (~40s); static under reduced motion.
- `GradientField.tsx` `{ preset?: 'aurora'|'mugmood'|'everloop'|'tessera'|'wally'; stops?: string; variant?: 'wash'|'mesh'; grain?: boolean; className?: string }`.
- `FrameHandles.tsx` `{ children; label?: string; tint?: string; animateIn?: boolean }` — corner brackets + optional cursor chip; snap-on stagger when `animateIn`.
- `StickerCard.tsx` `{ children; kind?: 'tape'|'stamp'|'polaroid'|'note'; tilt?: number; className?: string }` — stamp kind gets perforated edge (radial-gradient mask).

### Chrome & motion (`components/`)
- `SiteCopyProvider.tsx` — client context `{ copy: SiteContent['copy'] }` + `useSiteCopy()`.
- `Nav.tsx` — server wrapper (gets visibleSections + labels) → client inner (usePathname active state, mobile overlay). Wordmark: `cherry phan` italic serif.
- `Footer.tsx` — server; big italic `copy.footerLine`, contact links, mono meta, koi accent.
- `GsapReveal.tsx` — client `{ children; delay?; stagger?; y?; blur?; once? }`; ScrollTrigger; focus-pull (opacity 0→1, y `--reveal-y`→0, filter blur→0); `gsap.matchMedia` reduced-motion no-op (content visible immediately).
- `PageTransition.tsx` — used by `app/template.tsx`; enter-only fade/blur-in, `--motion-med`.
- `AnimatedEyebrow.tsx` — mono eyebrow, letter-spacing tracks in on reveal.
- `IntroAnimation.tsx` — client hero timeline (name focus-pull → FrameHandles snap → cursor chip pop → ripples fade in); full run once per session (`sessionStorage.cherry_intro`), else settled state.
- `ProjectCard.tsx` — card presentation (mobile/home fallback): cover or `GradientField` fallback + `AsciiArt`, title, oneliner, tags.
- `HoverImageCarousel.tsx` — the desktop floating preview: fixed-position panel following cursor via `gsap.quickTo` (0.35s lag), cycles `previewImages` @900ms while a row is hovered; hidden on touch/reduced-motion (rows then show inline cover).
- `CaseStudyLayout.tsx` — server; renders `CaseStudyContent` per the page concept; rich text via `renderRichText`; embeds gated by `isSafeEmbedUrl`; links by `isSafeLinkHref`.

### Content facts (seed `content/site-content.json` — real data only, from spec §10)
- Bio/about: SCAD BFA Design & Visual Communications, Jul 2025–May 2029, freshman; Christchurch School 2022–2025 (Yearbook Design Lead, theatre, Unity Council President, Varsity Sailing, NHS, Headmaster's List); SCAD PCA, Home Mentor, StartUp social media; communities: SCAD ClubHouse, CreateSC, Cornell CUxD. Tagline: *Design with empathy*. Contact: LinkedIn `https://www.linkedin.com/in/cherry-phan-b03857395/`; email `TODO(cherry)`.
- Experience array = competitions/activities/awards (never invented jobs); include **1st place, CreateSC 2026 UI/UX Designathon (Innovative Design @ USC)** for Everloop.
- Projects in grid order: **Aurora** (Branding/Product, pink, accent `aurora`), **Everloop** (Product, award, team w/ Aarya Mahapatra, accent `everloop`), **Mugmood** (Product concept, Vietnamese coffee culture/grandpa story, accent `mugmood`), **Tessera** (CUxD hackathon w/ Steven Yanzhi Chen, Anna Vorontsova, Jiwan Park, accent `tessera`), **Wally** (UX 101 team, Wally character by Cherry, accent `wally` + TODO).
- Case-study sections: canonical arc order; bodies from §10 facts + connective prose only; real quotes only (e.g. Mugmood's *"Whenever everything feels fast, choose slow."*, Tessera's QuickStart line). Years: Everloop 2026; others `TODO(cherry)` unless in spec.
- `creative.items`: Wally character design, Aurora 3D renders, yearbook/editorial work — entries exist with `TODO(cherry): add image`. `play.experiments`: 1–2 honest stubs.
- `copy`: navLabels, `footerLine: "Let's take our time."`, `scrollCue: "( scroll slowly )"`, `emptyState: "( nothing here yet — come back soon )"`, etc.
- `visibleSections`: `["home","work","about"]`.

---

## Phases

### Phase 1 — Spine (orchestrator, inline; sequential)

**Files (create):** `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.env.example`, `.gitignore` (extend), `app/layout.tsx`, `app/globals.css`, `app/page.tsx` (temporary smoke stub), `lib/site-content-schema.ts`, `lib/site-content.ts`, `lib/security.ts`, `lib/motifs.ts`, `content/site-content.json`, `tests/security.test.ts`, `tests/schema.test.ts`, `README.md`.

- [ ] Scaffold configs (App Router, strict TS, `@/*` path alias, Tailwind 4 postcss plugin).
- [ ] `globals.css`: full token set above + utilities + reduced-motion guard + base styles (selection color, focus-visible ring in accent).
- [ ] `layout.tsx`: next/font (Fraunces w/ ital+opsz axes, Instrument Sans, IBM Plex Mono, Caveat) → CSS vars; metadata via `lib/seo.ts` *(seo.ts lands Phase 3F; layout uses inline metadata until then)*; body classes `u-grain` base.
- [ ] Schema + guard; loader; security helpers; `lib/motifs.ts` ASCII forms + accent helpers.
- [ ] Seed `content/site-content.json` with the real content above (orchestrator writes this personally — highest fabrication risk).
- [ ] Tests: `npx tsx --test tests/*.test.ts` — security href/embed matrices, schema guard accepts seed & rejects mutants.
- [ ] **Verify:** `npm run build` clean; tests pass. Commit.

### Phase 2 — Parallel subagents (A, B, C on `sonnet`; independent)

**Task A — Motif kit.** Create the six motif components per contracts. Visual bar: hairline strokes, token tints, nothing clip-arty. Ripples = engraved thin ellipses w/ slight irregular spacing; koi simplified two-tone (terracotta/white) with tail flick. Verify: `npm run build`; a scratch route is NOT added — components render on pages in Phase 3; agent self-checks via `next build` types + a temporary story in `app/dev/motifs/page.tsx` that is **deleted before finishing**.

**Task B — Chrome & motion.** `SiteCopyProvider`, `Nav`, `Footer`, `GsapReveal`, `PageTransition` + `app/template.tsx`, `AnimatedEyebrow`, `IntroAnimation`. GSAP registered client-side only; every animation wrapped in `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`. Verify: build clean.

**Task C — Dashboard.** `lib/admin-auth.ts`, `lib/dashboard-storage.ts`, `lib/github-content.ts`, four API routes, `app/dashboard/login/page.tsx` + `components/admin/DashboardLoginForm.tsx`, `app/dashboard/page.tsx` + `components/admin/DashboardEditor.tsx`, `tests/admin-auth.test.ts`, `tests/storage.test.ts`. Dashboard pages `export const metadata = { robots: { index: false, follow: false } }`. Verify: build + tests; manual: login with dev password, edit a field, save (local mode), JSON on disk updated.

- [ ] Dispatch A, B, C in parallel; review each diff (design bar + contracts); integrate; `npm run build`; commit per task.

### Phase 3 — Pages (parallel subagents D, E, F after A+B merge)

**Task D — Home.** `app/page.tsx` (server, from `getSiteContent()`) + client hero composition using IntroAnimation/motifs per page concept. Verify: renders all home content from JSON; reduced-motion shows settled hero.

**Task E — Work + case studies.** `app/work/page.tsx`, `components/ProjectCard.tsx`, `components/HoverImageCarousel.tsx`, `components/CaseStudyLayout.tsx`, `app/work/[slug]/page.tsx` (`generateStaticParams` from caseStudies; `generateMetadata`; 404 via `notFound()` for unknown slug). Verify: all five studies render; prev/next chain correct; no unsafe embed/link passes the gates.

**Task F — About, Creative, Play, meta.** `app/about/page.tsx`, `app/creative/page.tsx`, `app/play/page.tsx`, `app/not-found.tsx` (on-brand, `( lost? )` + koi), `lib/seo.ts`, `app/robots.ts`, `app/sitemap.ts` (visible sections + case studies), `app/icon.tsx` (four-petal flower on cream), static `app/opengraph-image.png` alt: simple generated PNG committed. Verify: build; sitemap excludes hidden sections; robots disallows /dashboard, /api.

- [ ] Dispatch D, E, F in parallel; review; integrate; `npm run build`; commit per task.

### Phase 4 — Design-director pass (orchestrator, inline)

- [ ] Run dev server; screenshot every route desktop + mobile; fix spacing/type/color seams; verify 60/40 feel; check AA contrast on body copy; verify reduced-motion via emulation; verify hidden sections absent from nav but reachable; final README (setup, env, dashboard usage, content editing); remove any dev scratch files; `npm run build`; final commit.

**Success = spec §12 checklist, verified, plus:** tests green; content JSON is the single source; no fabricated facts; TODOs present for email + Wally accent + missing imagery.
