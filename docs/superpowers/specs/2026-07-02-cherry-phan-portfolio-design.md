# Cherry Phan — Portfolio Site Design Spec

**Date:** 2026-07-02
**For execution by:** Fable 5
**Author of spec:** Claude (with Pramit)

---

## 0. Read this first — the creative mandate

This spec has two layers, and they are governed by opposite rules.

- **The skeleton is fixed.** File types, folder nesting, the JSON-as-content pattern, the typed schema, the server-side loader, the dashboard mechanics, and the *category* of tools (Next.js / React / Tailwind / GSAP / Motion). Do not redesign these. They are proven scaffolding lifted from an existing portfolio and they work. Reproduce the structure faithfully.

- **Everything a visitor sees or touches is yours to invent.** Visual language, layout, composition, typography, color application, motion personality, micro-interactions, the feel of navigating between pages — **go be innovative and experimental here.** You (Fable 5) are the most capable and well-studied design model available; this spec deliberately does *not* pin pixels, because prescribing them would waste you. Take the identity system defined in §4 as a *starting palette*, not a cage. Push it. Surprise us. Avoid generic, templated, "AI-default" aesthetics at all costs — this is the portfolio of a designer with genuinely strong visual skills, and it must look like it.

**The test for every decision:** *Is this plumbing or is this experience?* Plumbing → follow the spec exactly. Experience → this spec is a floor, not a ceiling. When in doubt about whether you're allowed to be bold, you are.

One hard constraint on the boldness: it must read as **"sophisticated designer,"** not "juvenile." See §3 for the personality dial.

---

## 1. What this is

A personal portfolio site for **Cherry Phan**, UX design student at SCAD. It reuses the *technical scaffolding* of an existing portfolio (Pramit's) — the data structure, folder layout, code patterns, animation approach, and a content-editing dashboard — while presenting a **completely different** visual language, page flow, and interaction feel.

Nothing a visitor experiences should resemble the source portfolio. Only the invisible plumbing is shared.

### The shared/different line

**Shared (invisible plumbing):** file types, folder nesting, JSON-as-content + typed schema + server loader, the dashboard mechanism (auth → edit JSON → GitHub commit → redeploy), the GSAP/Motion token-driven animation approach.

**Different (everything experienced):** visual language, per-page layout & composition, motion personality, copy & narrative tone.

**Two pieces that are deliberately *both* structure and good UX — keep them, reskinned:**
1. **Case-study narrative arc** — `problem → role → research → process → solution → outcomes`. Keep this as the default structure (it's good UX). It is a *schema*, not a prescription — Cherry may reorder, rename, or omit sections per project via content. Reskin how it reads visually and narratively.
2. **Work-grid hover-preview interaction** — surfacing work via cards with hover image previews. Keep the *pattern* (data-backed `WorkProject[]`), reskin the *feel*.

---

## 2. Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind 4** (via `@tailwindcss/postcss`)
- **GSAP** + **Motion** (the animation kit)
- **`isomorphic-dompurify`** + **`marked`** for safe rich-text/markdown rendering of content fields
- Deployed on **Vercel**
- **No database.** No Supabase. Content is a JSON file; Git is the store; the dashboard commits to GitHub which triggers a redeploy.

Dependencies to include: `next`, `react`, `react-dom`, `gsap`, `motion`, `marked`, `isomorphic-dompurify`, `tailwindcss`, `@tailwindcss/postcss`, `typescript`, `@types/*`. Optionally `@vercel/analytics` (see §11).

---

## 3. Personality dial

**75% polished-editorial / 25% loud-playful.**

- The **75%**: refined editorial base — considered typography, generous whitespace, strong grid, restraint. This is the canvas and the default.
- The **25%**: whimsical, childlike, playful surprises — expressed through motion, motifs, texture, and micro-interactions, *not* through chunky/juvenile type or clutter.

Cherry's own work reads as *sophisticated whimsy*: elegant italic serif signatures, soft pink→peach gradients, ASCII-halftone floral textures, and Figma selection-handle/frame motifs used as decoration. Channel that. The playfulness is a designer being clever and warm, never a site that looks unserious. If a choice risks reading "juvenile," pull it back toward the 75%.

---

## 4. Design language — the identity system (starting palette, not a cage)

All theming routes through **CSS custom properties in `app/globals.css`**, so the skin is swappable without touching components. This is the seam that makes "same skeleton, different skin" work. Define real tokens; reference them everywhere.

### Color
- **Base:** warm cream / paper background, ink-charcoal text. Editorial and airy — *not* a pink-drenched site.
- **Signature accent:** pink → peach, used as the recurring accent and for gradient moments. **Present, not dominant** — Cherry explicitly does not want pink to be her whole identity.
- Provide a coherent token set: `--color-bg`, `--color-surface`, `--color-ink`, `--color-body`, `--color-muted`, `--color-accent`, `--color-accent-2` (peach), plus gradient stops. Ensure text contrast meets **WCAG AA** for body copy.

### Typography
- A refined **display serif** (the italic-signature feel) for headlines/hero.
- A clean **grotesk sans** for body and UI.
- A **mono** for "designer meta" labels/eyebrows (section numbers, tags, captions).
- Expose as `--font-serif`, `--font-sans`, `--font-mono` + a fluid type scale (`clamp()`-based `--text-display`, `--text-hero`, `--text-h1…`, `--text-body`, `--text-meta`, `--text-eyebrow`).

### Motif system — build all four as reusable components (`components/motifs/`)
These are the recurring visual signatures pulled from Cherry's real work. Build them as composable, prop-driven components so they can be dropped anywhere and tuned via tokens. **Experiment freely with how they're deployed** — the components are the vocabulary; the composition is yours.

1. **`AsciiFlower`** — halftone/ASCII dotted floral texture. Uses: section backgrounds, dividers, hover-reveals, hero texture. Should be scalable and tint-able via tokens.
2. **`FrameHandles`** — Figma-style corner-bracket selection handles + frame outlines wrapping elements (hero, cards, the name). Meta, designerly, playful. Consider animating them "snapping on."
3. **`GradientField`** — soft pink/peach/lilac gradient washes for section and card fills.
4. **`StickerCard`** — tilted, layered, tape/cutout photo cards for a scrapbook feel (seen in her tracker-app screens).

**Rule:** the polished editorial layout is the canvas; motifs are the **25% surprise** — deployed with intent and restraint, never as wallpaper.

### Color-per-section (optional experiment)
Cherry's reference frames each carry their own palette (pink, mint, lilac). You may give sections or individual case studies their own accent while keeping the cream base constant. This is encouraged if it strengthens the work — expose it via content (`accent` field) so it stays data-driven.

---

## 5. File tree (reproduce faithfully)

```
cherry-portfolio/
├─ content/
│  └─ site-content.json              # the entire site as data
├─ lib/
│  ├─ site-content-schema.ts         # typed interfaces + isSiteContent() type guard
│  ├─ site-content.ts                # 'server-only' loader; reads + validates the JSON
│  ├─ admin-auth.ts                  # password check + HMAC-signed session cookie
│  ├─ dashboard-storage.ts           # write-mode resolver: 'local' | 'github' | 'readonly'
│  ├─ github-content.ts              # 'server-only'; commit content JSON to GitHub via API
│  ├─ security.ts                    # constantTimeEqual, isSafeLinkHref, isSafeRichTextHtml, isSafeEmbedUrl
│  ├─ seo.ts                         # metadata helpers
│  └─ motifs.ts                      # shared helpers/constants for the motif components
├─ app/
│  ├─ layout.tsx                     # root layout, fonts, Nav, Footer, providers
│  ├─ globals.css                    # ALL design tokens live here
│  ├─ page.tsx                       # home
│  ├─ work/
│  │  ├─ page.tsx                    # work index (grid)
│  │  └─ [slug]/page.tsx             # dynamic case study → CaseStudyLayout
│  ├─ about/page.tsx
│  ├─ creative/page.tsx              # BUILT, hidden from nav until ready (see §8)
│  ├─ play/page.tsx                  # BUILT, hidden from nav until ready (see §8)
│  ├─ dashboard/
│  │  ├─ page.tsx                    # auth-gated editor host
│  │  └─ login/page.tsx
│  ├─ api/
│  │  └─ admin/
│  │     ├─ content/route.ts         # POST: persist edited content (local file or GitHub)
│  │     ├─ login/route.ts           # POST: verify password → set cookie
│  │     ├─ logout/route.ts          # POST: clear cookie
│  │     └─ file-picker/route.ts     # GET: list images in /public for the editor
│  ├─ icon.tsx  opengraph-image.tsx  # generated favicon + OG (optional, see §11)
│  ├─ robots.ts  sitemap.ts
│  └─ not-found.tsx
├─ components/
│  ├─ Nav.tsx  Footer.tsx
│  ├─ CaseStudyLayout.tsx            # renders one case study from its data object
│  ├─ ProjectCard.tsx                # work-grid card w/ hover preview
│  ├─ HoverImageCarousel.tsx         # hover-preview behavior
│  ├─ GsapReveal.tsx                 # scroll-reveal wrapper
│  ├─ PageTransition.tsx             # route transitions
│  ├─ AnimatedEyebrow.tsx            # animated section eyebrow/label
│  ├─ IntroAnimation.tsx             # first-load hero animation
│  ├─ SiteCopyProvider.tsx           # provides UI microcopy from content.copy
│  ├─ motifs/
│  │  ├─ AsciiFlower.tsx
│  │  ├─ FrameHandles.tsx
│  │  ├─ GradientField.tsx
│  │  └─ StickerCard.tsx
│  └─ admin/
│     ├─ DashboardEditor.tsx         # the big client-side editing UI
│     └─ DashboardLoginForm.tsx
├─ public/                           # Cherry's images (case-study art, headshot, motifs)
├─ next.config.ts  tsconfig.json  postcss.config.mjs
├─ .env.example
└─ README.md
```

> The source portfolio's `DashboardEditor.tsx` is ~5000 lines because it edits many sections with fine-grained style controls. Cherry's can be **substantially smaller** — edit the sections in §6 with sensible fields, skip the exhaustive per-component style knobs. Favor a clean, usable editor over feature-completeness.

---

## 6. Content model

The entire site is one validated JSON file: `content/site-content.json`, typed by `lib/site-content-schema.ts` with an `isSiteContent(x): x is SiteContent` guard used by the loader. Adding a project = adding an object to the JSON, never touching code.

### Top-level shape

```ts
interface SiteContent {
  home: {
    hero: HomeHero              // name, tagline, intro; drives the IntroAnimation
    selectedWork: HomeSection   // heading, body, items: WorkProject[]
    about: HomeAboutContent     // short about blurb for the home page
  }
  workPage: {
    heroTitle: string
    heroBody: string
    projects: WorkProject[]     // the work grid
  }
  aboutPage: {
    heroBody: string
    whoIAm: string              // rich text (markdown/sanitized HTML)
    experience: EntryItem[]     // org, role, date, desc
    education: EntryItem[]
    tools: string[]
    contactTitle: string
    contactBody: string
    contactLinks: LinkItem[]    // LinkedIn, email, etc.
  }
  creative: {                   // built now, hidden until ready
    heroTitle: string
    heroBody: string
    items: CreativeItem[]       // visual/gallery pieces
  }
  play: {                       // built now, hidden until ready
    heroTitle: string
    heroBody: string
    experiments: PlayItem[]
  }
  copy: SiteCopy                // UI microcopy (nav labels, buttons, empty states)
  visibleSections: SectionKey[] // controls what appears in nav — see §8
  caseStudies: CaseStudyContent[]
}
```

### Supporting types (keep close to the source; trim what Cherry won't use)

```ts
interface WorkProject {
  title: string
  oneliner: string
  tags: string[]
  href: string                 // e.g. "/work/aurora"
  cover?: string
  hoverImage?: string
  previewImages?: string[]
  accent?: string              // optional per-project accent token
}

interface CaseStudyContent {
  slug: string
  title: string
  oneliner: string
  type: string                 // e.g. "Branding", "Product Design"
  tags: string[]
  accent?: string              // optional per-study palette
  heroImage?: string
  prev: ProjectLink | null
  next: ProjectLink | null
  // narrative arc — all optional, rendered in order when present:
  problem?: string;   problemHeadline?: string
  role?: string;      roleHeadline?: string
  research?: string;  researchHeadline?: string
  process?: string;   processHeadline?: string
  solution?: string;  solutionHeadline?: string
  outcomes?: string;  outcomesHeadline?: string
  pullQuote?: string
  mediaBlocks?: MediaBlock[]   // ordered images/embeds interleaved through the study
}

interface MediaBlock {
  kind: 'image' | 'gallery' | 'embed'
  images?: string[]
  embedUrl?: string            // validated via isSafeEmbedUrl
  caption?: string
  layout?: 'full' | 'inset' | 'split'
}

interface EntryItem { org: string; role: string; date: string; desc: string }
interface LinkItem  { label: string; href: string }   // href validated via isSafeLinkHref
interface ProjectLink { title: string; href: string }
```

Narrative text fields (`problem`, `research`, `whoIAm`, …) are rendered as **sanitized rich text** (`marked` → `isomorphic-dompurify`, gated by `isSafeRichTextHtml`). Never dangerouslySetInnerHTML without sanitizing.

---

## 7. The dashboard (full editor)

Mechanism copied faithfully from the source; visuals are yours.

- **Auth:** `app/dashboard/login` posts a password to `api/admin/login`. Server compares with `constantTimeEqual` against `ADMIN_PASSWORD` env, then sets an **HMAC-signed session cookie** (secret in `ADMIN_SESSION_SECRET`, 14-day TTL). `app/dashboard/page.tsx` redirects to login unless `isAdminSession()`.
- **Editing:** `DashboardEditor.tsx` (client) loads `initialContent`, lets Cherry edit every section in §6 (incl. adding/reordering case studies and media blocks), and picks images via `api/admin/file-picker` (lists `/public`).
- **Saving — three write modes** (`dashboard-storage.ts`):
  - `local` — dev: write `content/site-content.json` to disk directly.
  - `github` — prod: commit the updated JSON to GitHub via API (`github-content.ts`), which triggers a Vercel redeploy. **This is the database.**
  - `readonly` — on Vercel without GitHub creds configured: view-only, save disabled.
  - Resolver: GitHub creds present → `github`; else not on Vercel → `local`; else `readonly`.
- **Env:** `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, and for publishing: `GITHUB_TOKEN`, `GITHUB_REPO_OWNER`, `GITHUB_REPO_NAME`, `GITHUB_CONTENT_BRANCH`, optional `GITHUB_CONTENT_PATH`. Document all in `.env.example`.
- The dashboard route must be `noindex, nofollow`.

**Simplify vs. the source:** skip the exhaustive per-component style-setting panels (card padding, image-fit knobs, etc.). Edit *content*, not fine-grained theme. Theme lives in `globals.css` tokens.

---

## 8. Section visibility

Build **all** sections now (Home, Work, About, Creative, Play) but only **surface Home, Work, About** in the nav. A `visibleSections` array in the content controls which routes appear in `Nav`. Hidden routes still render if visited directly (useful for Cherry to preview), but aren't linked. Flipping Creative/Play live later = a one-line content edit (or a dashboard toggle).

---

## 9. Motion personality

Same GSAP + Motion kit, tuned playful-but-tasteful. All timing/easing/distance as **motion tokens** in `globals.css` (`--motion-*`, `--ease-*`).

- Scroll-triggered **staggered reveals** (`GsapReveal`).
- An **intro animation** on first load — suggestion: `FrameHandles` snapping onto Cherry's name, or an ASCII-flower blooming. **Experiment.**
- **Page transitions** between routes (`PageTransition`).
- **Hover-preview** carousels on work cards.
- Gentle **float/tilt** on sticker elements.
- **Respect `prefers-reduced-motion`** — provide reduced/no-motion fallbacks throughout. Non-negotiable.

Again: the *toolkit* is fixed, the *choreography* is yours. Make navigating the site feel like a small delight without ever getting in the way of the work.

---

## 10. Seed content

Populate `site-content.json` with **3–5 case studies**. Two are real (fill with the info available; leave clearly-marked placeholders for missing detail):

1. **Aurora** — a jewelry / fashion brand where "legacy meets technology." Branding + product design: brand message, tone of voice, logo system, 3D product renders (a locket/necklace, a "music box of memory"), app interface screens. Type: Branding / Product Design. Rich visual case study.
2. **Resolutions / habit-tracker app** — an app organized around **Record → Reflect → Revisit**: choose a tracking cadence for goals, log reflections with photos, and revisit accomplishments + words of encouragement from a past self. Type: Product Design. Warm, personal, scrapbook aesthetic.

Add 1–3 **placeholder** case studies with the same shape so the grid feels populated and the "add a project" flow is demonstrated. Mark placeholders clearly in their copy.

Fill `aboutPage` from: SCAD UX design student; LinkedIn `https://www.linkedin.com/in/cherry-phan-b03857395/`. Leave clearly-marked TODOs where real bio/experience detail is needed.

---

## 11. Out of scope (do not build unless asked)

- Database of any kind (Supabase, etc.) — **not needed.**
- The source portfolio's `life/` daily-tracker, Spotify integration, calendar, tasks, photography galleries.
- Contact-form email delivery (Resend), analytics, sound effects, generated OG images — **easy adds later.** You may stub `robots.ts`/`sitemap.ts` and a simple static OG image, but don't build dynamic OG generation or analytics now.

---

## 12. Success criteria

- `npm run dev` serves the site; `npm run build` passes with no type errors.
- Home, Work (+ dynamic case studies), and About render from `site-content.json` and look like **Cherry's** site — not a reskin of a template, not the source portfolio.
- Adding a project is a pure JSON edit.
- The dashboard: login works, edits persist (local in dev), content re-renders. GitHub publish path is implemented and documented even if creds aren't set locally.
- Creative + Play exist and render but are absent from the nav.
- `prefers-reduced-motion` is honored.
- The identity system (§4) is real and token-driven, and the result is **distinctive, experimental, and unmistakably a strong visual designer's portfolio.**
