# Handoff prompt for Fable 5

> Paste everything in the code block below to Fable 5, with this repo open.

```
You are building a personal portfolio website for Cherry Phan, a SCAD UX design
student. This is a standalone Next.js project. Work inside THIS repository only —
it is entirely hers; nothing is shared with or imported from any other project.

## Read first (in this order)
1. docs/superpowers/specs/2026-07-02-cherry-phan-portfolio-design.md  — the full design spec.
2. docs/references/  — screenshots of Cherry's real work + her curated moodboard.
   Treat every image here as PRIMARY visual direction.
3. These two Behance links (her own curated taste): 
   https://www.behance.net/moodboard/225059917/Branding-Inspo
   https://www.behance.net/gallery/246908301/Life-is-Texture-MASISA

The spec's §3a (Persona), §4 (design language), and §4a (visual references) are the
soul of this project. Design FROM her, not from a template. She is fashion-editorial,
textural, warm, whimsical-but-crafted — high-contrast italic serif, lush gradients,
ASCII/halftone texture, stickers/ephemera, koi + water ripples (her Vietnamese
heritage), muted-sophisticated palette with punchy pops. Not generic pink whimsy.

## Your first task: critique the spec, then improve it
Do NOT treat the spec as final orders. You have stronger design judgment than the
process that wrote it. Per spec §0:
1. Read the whole spec end to end.
2. Push back on anything weaker than it could be — IA, layout concepts, the motif
   system, case-study flow, motion, section list. Propose better.
3. Write a short CHANGELOG at the top of your implementation plan noting what you
   changed and why.
4. Then build from YOUR revised version.

The only things you may NOT revise away (flag-and-explain instead of silently
overriding): the fixed skeleton (Next.js 16 / React 19 / TS / Tailwind 4 / GSAP +
Motion; the JSON-as-content + typed-schema + server-loader pattern; the dashboard
mechanism; NO database) and the two good-UX keepers (case-study narrative arc as a
reorderable default; data-backed hover-preview work grid).

## How to work: plan, then implement with subagents
1. PLAN: produce a phased, file-by-file implementation plan with verification
   checkpoints. Save it in docs/. Include your critique changelog at the top.
2. IMPLEMENT: orchestrate the build using SUBAGENTS working in parallel where tasks
   are independent (e.g. design tokens/globals.css, the motif component kit, the
   content schema + loader, the dashboard editor, each page). You (Fable 5) act as
   the orchestrator and design director; delegate implementation to subagents.
   - Run the SUBAGENTS on Sonnet 4.6 — NOT Sonnet 5.
   - You review and integrate their work; hold the visual bar and the persona.
3. After each phase, verify: `npm run build` passes with no type errors, and the
   pages render from content/site-content.json.

## Content
Populate content/site-content.json from spec §10 — Cherry's five REAL projects
(Aurora, Mugmood, Everloop [1st-place award], Tessera, Wally) and her real bio.
Only invent connective prose — never fake metrics, quotes, dates, or outcomes.
Leave clearly-marked TODOs for genuine unknowns (her email, Wally's accent color).

## Non-negotiables
- Standalone, self-contained repo. No file shared across projects. No database.
- Build all sections (Home, Work + case studies, About, Creative, Play) but only
  surface Home / Work / About in the nav at launch. Creative + Play hidden but
  dashboard-togglable via `visibleSections`.
- The dashboard: password + HMAC-cookie auth, edits the JSON, publishes via GitHub
  commit in prod (local-file writes in dev, read-only fallback). Document env vars
  in .env.example.
- Respect prefers-reduced-motion everywhere.
- 60% polished-editorial / 40% playful. Avoid generic "AI-default" aesthetics — this
  must look like the work of a designer with strong visual skills.

Ship it as her portfolio, not a reskin of anyone else's. Be bold.
```
