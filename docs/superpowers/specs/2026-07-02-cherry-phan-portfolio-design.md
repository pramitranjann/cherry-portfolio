# Cherry Phan — Portfolio Site Design Spec

**Date:** 2026-07-02
**For execution by:** Fable 5
**Author of spec:** Claude (with Pramit)

---

## 0. Read this first — the creative mandate

This spec has two layers, and they are governed by opposite rules.

- **The skeleton is fixed.** File types, folder nesting, the JSON-as-content pattern, the typed schema, the server-side loader, the dashboard mechanics, and the *category* of tools (Next.js / React / Tailwind / GSAP / Motion). Do not redesign these. They are a proven *pattern* observed in an existing portfolio; **reproduce the pattern by writing fresh files inside Cherry's own repo.** Reproduce the structure faithfully.

> **Nothing is "shared" across projects.** This is a **standalone, self-contained repository**. Every file is *written into or copied into Cherry's own folder* — no file is imported from, symlinked to, or referenced in another project. Where this spec says a pattern comes from an existing portfolio, that means **take inspiration and re-implement it here**, freshly, as Cherry's own code. There is exactly one codebase and it is hers.

- **Everything a visitor sees or touches is yours to invent.** Visual language, layout, composition, typography, color application, motion personality, micro-interactions, the feel of navigating between pages — **go be innovative and experimental here.** You (Fable 5) are the most capable and well-studied design model available; this spec deliberately does *not* pin pixels, because prescribing them would waste you. Take the identity system defined in §4 as a *starting palette*, not a cage. Push it. Surprise us. Avoid generic, templated, "AI-default" aesthetics at all costs — this is the portfolio of a designer with genuinely strong visual skills, and it must look like it.

**The test for every decision:** *Is this plumbing or is this experience?* Plumbing → follow the spec exactly. Experience → this spec is a floor, not a ceiling. When in doubt about whether you're allowed to be bold, you are.

One hard constraint on the boldness: it must read as **"sophisticated designer,"** not "juvenile." See §3 for the personality dial.

### Before you build: critique this spec, then improve it

**Do not treat this document as final.** It was written to give you a strong, faithful starting structure — but you (Fable 5) have better design thinking and more creative range than the process that produced it. So the first thing you should do is **read the whole spec and the implementation plan, then revise them according to your own judgment.**

Concretely, before writing any code:
1. Read this spec end to end, plus the implementation plan.
2. Push back on anything you believe is weaker than it could be — layout ideas, the motif system, the information architecture, the case-study flow, the motion concept, even the section list. Propose better.
3. Rewrite the affected parts of the spec/plan to reflect your improved design, and **note what you changed and why** (a short changelog at the top of the plan) so the human can see your reasoning.
4. Then build from *your* revised version.

The only things you may **not** revise away are the **fixed-skeleton items** (§0 first bullet: stack, file/folder structure, JSON-as-content pattern, typed schema, server loader, dashboard mechanics, no-database constraint) and the **two "good UX" keepers** in §1 (case-study narrative arc as a reorderable default, and the data-backed hover-preview work grid). Everything else is open to your improvement. If you think even a fixed item is wrong, don't silently override it — flag it in the changelog and explain, and leave the final call to the human.

In short: **treat this spec as a smart colleague's first draft that you've been asked to make better, not as orders.**

---

## 1. What this is

A personal portfolio site for **Cherry Phan**, UX design student at SCAD. It **takes inspiration from the *technical patterns*** of an existing portfolio (Pramit's) — the data structure, folder layout, code patterns, animation approach, and a content-editing dashboard — and **re-implements them freshly inside Cherry's own standalone repo**, while presenting a **completely different** visual language, page flow, and interaction feel.

Nothing a visitor experiences should resemble the source portfolio. And nothing is technically shared with it either: this is one self-contained codebase, entirely Cherry's.

### The pattern-vs-experience line

**Patterns to re-implement (invisible plumbing, written fresh as her own files):** file types, folder nesting, JSON-as-content + typed schema + server loader, the dashboard mechanism (auth → edit JSON → GitHub commit → redeploy), the GSAP/Motion token-driven animation approach. These are *conventions to copy*, not files to link.

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

**60% polished-editorial / 40% playful.** (Deliberately *not* buttoned-up — the earlier draft read too editorial. Cherry is whimsical and warm; the site should feel that way while still looking like a designer who knows restraint.)

- The **60%**: a considered editorial base — good typography, real whitespace, a grid you can feel. This keeps it credible and mature. It's the frame, not the whole picture.
- The **40%**: whimsy, warmth, and play — expressed generously through **gradients** (she loves them — see §4a references), ASCII/halftone motifs, character/illustration touches, motion, texture, and micro-interactions. This is a bigger, more present 40% than a typical portfolio — lean into it. Playful ≠ juvenile: it's clever, warm, and personal, never sloppy or childish-looking.

Cherry's own work reads as *sophisticated whimsy*: elegant italic serif signatures, lush multi-stop gradients, ASCII/halftone textures, character design (the Wally mascot), and Figma selection-handle/frame motifs used as decoration. Channel that. If a choice risks reading "juvenile," refine the craft — don't necessarily remove the play.

---

## 3a. Persona — design *from her*, not from a template

**Before choosing anything visual, hold this person in your head and let the site fall out of it.** Every design decision should be answerable with "because this is *her*." This persona is synthesized from her real work and words (§10) — treat it as the source of truth for tone, motion, color, and copy.

> **Cherry Phan — "the designer who tells you to slow down."**
> A first-year SCAD design student, Vietnamese, who designs with unusual emotional intelligence for someone so early in her journey. Her recurring subject is **time and memory** — slowing down (Mugmood), reflecting and revisiting (Everloop), reclaiming small in-between moments (Tessera). Her tagline is literally *"Design with empathy,"* and it isn't decoration: her projects are quiet arguments *against* efficiency and hustle, *for* warmth, ritual, and presence.
>
> **Where she comes from shows up in the work:** a grandpa waiting for coffee to brew on a porch in Vietnam; Sài Gòn coffee talk; the unhurried pace of Đà Nẵng. She was a Yearbook Design Lead and did theatre — she's a **storyteller and editorial thinker** first, who happens to build product. She also designs **characters** (the Wally mascot), so there's an illustrator's warmth in her, not just a systems-designer's rigor.
>
> **Her aesthetic instincts:** lush **gradients** (amber, pink, blue→lilac), soft light, ASCII/halftone texture, playful "designer-native" motifs (Figma frames/handles), gentle stars and small delights. Feminine but not saccharine. Whimsical but intentional. Warm, calm, a little dreamy — never cold, corporate, or minimal-for-minimal's-sake.

**How to use the persona:** when picking a transition, a color move, a piece of copy, or a layout — ask *"would the person above do this?"* A brisk, snappy, hyper-efficient interaction is **wrong for her** even if it's "good UX" in the abstract; her site should feel like it, too, is inviting you to slow down and notice. Motion should breathe. Copy should sound like a warm, thoughtful friend, not a brand. Gradients and soft light should carry emotion. Let the persona resolve ties.

---

## 4. Design language — the identity system (starting palette, not a cage)

All theming routes through **CSS custom properties in `app/globals.css`**, so the skin is swappable without touching components. This is the seam that makes "same skeleton, different skin" work. Define real tokens; reference them everywhere.

### Color
- **Base:** warm cream / paper / off-white grounds, ink-charcoal text. Editorial, airy, textural — *not* a pink-drenched site.
- **Palette character (per §4a):** muted, sophisticated, grown-up — cream, sage/olive, terracotta/oxblood, dusty rose, cobalt/cornflower — accented with **occasional punchy pops** (fire-engine red, chartreuse/lime, cobalt). Pink is *one* voice, not the identity.
- **Signature accent:** pink → peach remains a recurring accent + gradient moment (it's genuinely hers — Aurora, Everloop), but it shares the stage with the warmer/deeper tones above. **Present, not dominant.**
- Provide a coherent token set: `--color-bg`, `--color-surface`, `--color-ink`, `--color-body`, `--color-muted`, `--color-accent`, `--color-accent-2`, plus per-project accent + gradient stops (driven by the content `accent` field). Ensure text contrast meets **WCAG AA** for body copy.

### Typography
- A **high-contrast fashion-editorial display serif with a distinctive italic** for headlines/hero — this is her single strongest type signal (think the *Canela / Reckless / PP Editorial New / Ogg* register seen all over her moodboard: "Life is texture", "Atelier Sucré", "Portfolio"). Lean into dramatic italic ligatures as a hero moment. Pick a real, license-appropriate font in this family.
- A clean **grotesk sans** for body and UI (often set in **all-caps, wide letter-spacing** for labels, per her moodboard).
- A **mono** for "designer meta" labels/eyebrows (section numbers, tags, captions).
- Expose as `--font-serif`, `--font-sans`, `--font-mono` + a fluid type scale (`clamp()`-based `--text-display`, `--text-hero`, `--text-h1…`, `--text-body`, `--text-meta`, `--text-eyebrow`).

### Motif system — a reusable kit in `components/motifs/`
These are Cherry's recurring visual signatures. Build them as composable, prop-driven, token-tinted components so they can be dropped anywhere. **Experiment freely with how they're deployed and feel free to invent more** in the same spirit — the kit below is a starting vocabulary, not the complete set.

**a) The ASCII / halftone family — not just flowers.** This is a whole texture language, not one component. Build an `AsciiArt` primitive (renders text/dot/character-grid art from a source, tint- and scale-able via tokens) plus a small library of forms. Go well beyond flowers:
- **Flowers / botanicals** (her signature halftone florals)
- **Coffee / moka pot** (Mugmood — steam, cups)
- **Stars & sparkles** (recurring "small delight" in her posts)
- **Hearts, hands, faces** (empathy/warmth motifs)
- **Loops / infinity / arrows** (Everloop — memory, return, cycles)
- **Tessellation / mosaic tiles** (Tessera — "tessera" = a mosaic tile; lean into this literally)
- **Waves / clouds / soft weather** (slowness, calm)
- **ASCII typographic play** — headings or the name rendered in character-grid/dot-matrix as a hero moment.

Make it easy to add a new ASCII form as data (a character map or source glyph) so Cherry can grow the set. Uses: section backgrounds, dividers, hover-reveals, hero texture, loaders, empty states.

**b) `GradientField`** — **lush, multi-stop gradient washes.** Gradients are a *core* part of her identity (§4a references), not an afterthought — she loves them. Support smooth multi-stop, mesh/blurred, and grain-overlaid gradients across her real palettes (amber/gold, pink/peach, blue→lilac, and mixes). Use them boldly for section backgrounds, hero fields, card fills, and text-clip fills — while keeping the cream editorial base for reading surfaces so it never turns muddy.

**c) `FrameHandles`** — Figma-style corner-bracket selection handles + frame outlines wrapping elements (hero, cards, the name). Meta, designerly, playful. Consider animating them "snapping on."

**d) `StickerCard` / `Ephemera`** — tilted, layered, tape/cutout cards, **postage stamps, polaroids, paperclip notes**, and **hand-drawn line-art stickers** (like her *flowbutter* piece: simple outlined doodles in oxblood/cornflower/cream). Scrapbook-meets-mailroom. This carries a lot of the playful 40%.

**e) `TextureField`** — **texture and materiality as identity** (her moodboard is literally titled *"Life is texture"*). Grain overlays, paper fiber, halftone-on-photo, tactile material crops (sand ripples, linen, wood, leather). Layer subtly over gradients and the cream base so surfaces feel physical, not flat.

**f) `EditorialGrid`** — thin, *visible* layout grid lines as decoration (recurring in her pins). A designerly scaffold you can switch on for hero/section moments.

**g) `SoftBlur`** — dreamy motion-blur / soft-focus treatment for type or imagery (blurred "portfolio", perfume shots, glow script). Use for atmosphere and depth, and as an enter/exit motion (focus-pull).

**h) Cultural / natural motifs** — **goldfish & koi with water ripples**, botanicals, small stars/sparkles. These recur in her taste and connect to her **Vietnamese heritage** — use them as authentic, quiet threads (a rippling hover, a koi drifting through a hero), never as costume.

> Optional but on-brand: glossy **3D renders** (she uses them — Aurora products, ceramics) as hero objects where assets exist.

**Rule:** the editorial base is the frame; motifs + gradients + texture carry the **40%** — present and generous (per the 60/40 dial), but crafted, never sloppy wallpaper.

### Color-per-section
Her real projects each own a palette (amber Mugmood, pink Everloop/Aurora, blue-lilac Tessera). Give sections and individual case studies their own accent + gradient while keeping the cream reading base constant. Drive it from content (`accent` field) so it stays data-driven and Cherry can tune it.

---

## 4a. Visual references — study these before designing

Reference images of Cherry's actual work live in **`docs/references/`** (Pramit will drop the source files there — Aurora deck frames, Everloop app screens, Mugmood, Tessera, and her personal banner). **Look at them first.** They are the ground truth for her aesthetic; this spec's words are a summary of them. Match the *feeling*, don't copy the layouts.

What the references show (so this section stands even before the files land):

- **Personal banner** — white ground, grey **ASCII/halftone floral** texture bleeding across it, scattered thin outline squares + a small framed four-petal flower icon, her headshot, and her name in an **elegant italic serif** inside a **Figma selection-frame with corner handles and a cursor**. This is the truest single artifact of her identity: editorial serif + designer-native Figma motifs + halftone flowers on calm ground.
- **Aurora deck** — a suite of slide frames on **soft coral→pink→peach gradients** overlaid with halftone florals; big **italic serif titles** ("Aurora — When fashion, legacy meet technology", "Tone of Voice", "Branding", "Product Design", "App Design"), **mono** sub-labels and numbered tables-of-contents, and glossy **3D product renders** (necklaces/lockets, soft candy-colored objects). Lush, feminine, luxurious, warm.
- **Everloop app screens** — **pink→peach gradient** UI; cards for **Record / Reflect / Revisit**; a "Daily Tracker" dot-grid; **scrapbook-style reflection cards** with photos ("Running 5k in Savannah", "Learning how to drive in LA"); a "Words from yourself" **envelope** with a hand-written-feeling note of encouragement. Tender, memory-driven, tactile.
- **Mugmood** — **amber/gold gradient**, a **moka pot** illustration, gentle **stars**, phone mockups; the whole thing radiates warmth and slowness.
- **Tessera** — **blue→pink→lilac gradient**, clean phone mockups, soft light; calmer and cooler than the others.

**The through-line to reproduce:** lush gradients + soft light + halftone/ASCII texture + elegant italic serif + playful designer-native framing + tender, human copy. That combination *is* Cherry.

### Her curated taste (observed from her Behance moodboard)
Cherry's own *Branding Inspo* moodboard (18 pieces she chose) is the clearest window into her taste, and it's more **fashion-editorial and sophisticated** than "cute." This is the main reason the dial is 60/40 and not 40/60. Both links are primary direction for Fable:

- **Branding Inspo moodboard** — <https://www.behance.net/moodboard/225059917/Branding-Inspo>
- **Life is Texture — MASISA** — <https://www.behance.net/gallery/246908301/Life-is-Texture-MASISA>

**The concrete visual DNA across her pins** (design toward this):
- **High-contrast fashion italic display serif** as the star (see Typography above). Dramatic, elegant, a little theatrical.
- **Texture & materiality as subject, not garnish** — sand ripples, cabbage/leaf, wood, leather, linen, mesh, grain. "Some spaces feel emotionless. But life doesn't."
- **Visible editorial grids** and confident negative space.
- **Dreamy motion-blur / soft focus** — blurred wordmarks, glow scripts, out-of-focus product shots.
- **Glossy 3D renders** — acrylic keychains, pastel ceramics with tiny hand-drawn star doodles.
- **Postage / paper ephemera & collage** — stamps, polaroids, paperclip notes, "mailroom" scrapbook layouts.
- **Hand-drawn line-art stickers** — playful outlined doodles (her *flowbutter* piece) in muted oxblood / cornflower / cream. This is her childlike-but-crafted register.
- **Goldfish/koi + water ripples + halftone dots** — a recurring East-Asian motif that connects to her **Vietnamese heritage**; use it as a real thread.
- **Palette:** muted, sophisticated grounds (cream, off-white, sage/olive, terracotta/oxblood, dusty rose, cobalt/cornflower) with **punchy accent pops** (fire-engine red, chartreuse/lime, cobalt). **Not** candy pastels — richer and more grown-up than the pink-forward first read. Per-project accents can run warm/deep.

So: her whimsy sits on top of genuinely **sophisticated, textural, fashion-editorial** branding taste. Build for *that* designer — playful, but with the eye of someone who pins Atelier Sucré and MASISA.

> **Action for Pramit:** save the reference screenshots into `docs/references/` (any filenames; a short `docs/references/README.md` captioning each helps). Fable: consume every image in that folder **plus the two Behance links above** as primary visual direction. If the folder is empty at build time, proceed from the descriptions here and flag it in your changelog.

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

Build **all** sections now (Home, Work, About, Creative, Play) but only **surface Home, Work, About** in the nav at launch. A `visibleSections` array in the content controls which routes appear in `Nav`. Hidden routes still render if visited directly (so Cherry can preview them), but aren't linked.

**This must be togglable from the dashboard** — the same way the source portfolio lets its owner flip section visibility. The `DashboardEditor` includes a simple **visibility control** (a checkbox/toggle per section) that edits `visibleSections`; saving + publishing flips Creative/Play live with no code change. Default at launch: Home, Work, About visible; Creative, Play hidden.

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

## 10. Seed content — Cherry's real work (no placeholders)

All content below is from Cherry's actual LinkedIn. These are **real projects** — treat the copy with care; it represents a real designer's identity. Where a specific detail is missing (a metric, a date, an image), leave a clearly-marked `TODO` for Cherry rather than inventing facts.

### Who she is (for `aboutPage`)
- **Name:** Cherry Phan
- **Headline:** Product & UX Designer — *"Design with empathy"*
- **School:** Savannah College of Art and Design (SCAD), **BFA, Design and Visual Communications** (Jul 2025 – May 2029). Currently a **freshman** — this is a rising, early-career student portfolio; lean into promise and range, not fabricated seniority.
- **Prior:** Christchurch School (2022–2025) — Headmaster's List, Unity Council President, National Honor Society, Varsity Sailing, Theatre (writing/stage design/acting), **Yearbook Design Lead**. (Signals: leadership, storytelling, visual/editorial design from early on. Use lightly.)
- **SCAD activities:** Pre-College Assistant (PCA), SCAD Home Mentor, SCAD StartUp (Social Media), member of design competition communities (SCAD ClubHouse, CreateSC, Cornell CUxD).
- **Throughline for the About voice:** empathy-led, emotionally intelligent design about **slowness, reflection, memory, and heritage**. Her Vietnamese roots are a genuine creative source (see Mugmood) — present it authentically, not as decoration.
- **`aboutPage.experience`** should read as **design competitions / activities / awards**, not invented jobs. Notable award: **1st place, CreateSC 2026 UI/UX Designathon (USC "Innovative Design")** for Everloop.
- **Contact:** LinkedIn `https://www.linkedin.com/in/cherry-phan-b03857395/`. (Email/other links: `TODO` — Cherry to provide.)

### Case studies (5 real — this is the work grid)
Each palette differs; use the per-study `accent` field so the cream base stays constant while each case study carries its own color. Slugs suggested in parentheses.

1. **Aurora** (`/work/aurora`) — Type: **Branding / Product Design**. A jewelry brand where *"fashion, legacy, and technology meet."* Full brand system: brand message, tone of voice (Inspiring / Comforting / Futuristic — consistency, authenticity & connection), logo + logo color, typography, 3D product renders (a locket/necklace; a *"music box of memory"*), and app interface screens. Accent: **pink**. Her most visually rich, systems-heavy project.

2. **Mugmood** (`/work/mugmood`) — Type: **Product Design (concept)**. A journaling app that *"turns time waiting for coffee into a moment for reflection."* Born from a SCAD ClubHouse "Async" competition prompt about **slowing down**, and from a childhood memory of her grandpa waiting for his coffee to brew on the porch — rooted in **Vietnamese coffee culture** (Sài Gòn coffee talk, the unhurried life of Đà Nẵng). Daily prompt: *"Write about something you're grateful for today."* Tagline: *"Whenever everything feels fast, choose slow."* Moka-pot iconography, gentle stars. Accent: **amber / warm gold**.

3. **Everloop** (`/work/everloop`) — Type: **Product Design** · **🏆 1st place, CreateSC 2026 UI/UX Designathon** (hosted by Innovative Design @ USC; theme *"Design Against Efficiency"*). Team project with Aarya Mahapatra. Concept: **"Memory Architecture"** — designing for how content *gains meaning over time* — helping people keep New Year's resolutions by turning past experiences into future motivation. Built on the **3 R's: Record → Reflect → Revisit**. (This is the Record/Reflect/Revisit app from the original reference screens.) Accent: **pink**.

4. **Tessera** (`/work/tessera`) — Type: **Product Design (hackathon)**. Built at a **Cornell UX Design Club (CUxD)** hackathon with Steven Yanzhi Chen, Anna Vorontsova, and Jiwan Park. Turns fragmented in-between moments (waiting for the bus, standing in line) into **simple, meaningful actions** — reflections, goal-setting, a distraction-free to-do list with a timer — as an antidote to mindless scrolling. *"Use QuickStart to make the most of your small moments."* Cherry designed UI components and shaped the visual identity. Accent: **blue → lilac gradient**.

5. **Wally** (`/work/wally`) — Type: **Product Design (UX 101 / team)**. A **student wallet app** tackling college financial literacy — one place to learn, save, and manage money. Her first university UX project; team led by Aarya Mahapatra (with Ashley Cho, Jiwan Park, Anna Vorontsova). **Cherry designed the "Wally" character** — a mascot/character-design contribution worth highlighting (ties to her illustration/character strength). Accent: **TODO — Cherry to confirm**.

> Ordering on the grid: lead with the strongest/award-winning work (Aurora, Everloop) but let Cherry reorder via content. Every project above is real; the only invented content permitted is obvious connective prose — never fake metrics, quotes, or outcomes.

### Creative + Play (built, hidden — §8)
Seed lightly with real material: **Creative** can hold her character design (Wally), 3D renders (Aurora), and editorial/yearbook-leaning visual pieces. **Play** can hold small experiments. Both fine to ship sparse; they're not in the nav yet.

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
