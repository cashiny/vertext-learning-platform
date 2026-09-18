# Implement the Vertex Design System

## Goal
Translate `design/vertex-designsystem.png` into reusable Tailwind tokens and UI
primitives in the `web` app, so every later page (catalog, course, lesson,
instructor, My Learning, search) builds on the same colors, type scale,
spacing, radii, shadows, icons, and components instead of ad hoc styling.

This is foundation work, not a page. There's no desktop/mobile page reference
here (per AGENTS.md section 3, that only applies once we build actual pages),
so responsiveness is just "components don't break at small widths," not
"reproduce a mobile layout."

## Skills / docs read
- `node_modules/next/dist/docs/01-app` (App Router font loading, layout
  conventions) — confirms `next/font/google` is the supported way to load
  Playfair Display + Inter.
- AGENTS.md section 3 (UI work) and section 6 (tech stack: Tailwind +
  typography plugin).
- No sanity/clerk/search skill applies here — this is pure Tailwind/React
  token + component work.

## Code inspected
- `app/globals.css` — Tailwind v4 `@import "tailwindcss"` + `@theme inline`
  block, currently only `--color-background` / `--color-foreground` mapped to
  Geist fonts.
- `app/layout.tsx` — loads `Geist` / `Geist_Mono` via `next/font/google`,
  default Next.js metadata.
- `app/page.tsx` — stock create-next-app boilerplate page.
- `package.json` — Next 16, React 19, Tailwind v4, no component/icon library
  installed yet.
- `public/` — only the default Next.js SVGs (next/vercel/globe/file/window).
- Repo is currently a single Next.js app at the root (the studio/web
  workspace split from AGENTS.md section 5 hasn't happened yet). This task
  only touches the existing app — it does not restructure the repo, since
  that's an unrelated, larger decision.

## Decisions / assumptions
1. **Where tokens live**: Tailwind v4 `@theme` block in `app/globals.css`.
   Colors, font families, radii, and shadows become theme tokens
   (`--color-primary-500`, `--font-display`, `--radius-md`, `--shadow-md`,
   etc.) so `bg-primary-500`, `font-display`, `rounded-md`, `shadow-md` work
   as Tailwind utilities everywhere. Spacing in the reference (4/8/12/16/24/
   32/40/48/64 on a 4px base) already matches Tailwind's default spacing
   scale, so no spacing overrides are needed.
2. **Fonts**: replace Geist/Geist Mono with `Playfair Display` (display/
   headings) and `Inter` (body/UI) via `next/font/google` in
   `app/layout.tsx`, exposed as `--font-display` and `--font-sans`.
3. **Icons**: the reference shows a generic outline/filled icon set (bell,
   search, play, document, bookmark, bar-chart, clock, user, chevron). No
   icon library is installed. I'll add `lucide-react` (outline by default,
   matches the spec's 24×24, 2px stroke, rounded caps) rather than hand-
   drawing SVGs — it's the standard pairing with Tailwind and already used
   in similar stacks. Filled variants aren't a separate lucide feature; I'll
   use `fill="currentColor"` on the same icon only where the spec explicitly
   shows a filled state (bell, search, play, bookmark, user — active status
   states).
4. **Component location**: new primitives go in `app/components/ui/`
   (Button, Input, Select, Badge, StatusIndicator, ProgressBar, Card variants,
   Navbar, Breadcrumbs, Pagination), each a plain presentational component
   with no data fetching — consistent with AGENTS.md's "pages are read only"
   boundary, since these are pure UI.
5. **Verification surface**: since no real pages exist yet to host these
   components, I'll build a `/design-system` route (`app/design-system/
   page.tsx`) that renders every token and component/state from the
   reference in one place. This is the acceptance surface for this task, not
   a product page — it's a static internal reference, matching the "do not
   overbuild" instruction by giving us exactly one place to verify against
   the image and nothing else.
6. **Dark mode**: the reference is light-mode only. I'll drop the current
   boilerplate `prefers-color-scheme: dark` override in `globals.css` rather
   than trying to invent a dark palette that isn't in the spec.

## Files expected to touch
- `app/globals.css` — theme tokens (colors, fonts, radii, shadows), remove
  boilerplate dark-mode block.
- `app/layout.tsx` — swap Geist fonts for Playfair Display + Inter, update
  metadata title.
- `app/page.tsx` — remove create-next-app boilerplate (replace with a
  minimal placeholder or redirect to `/design-system` for now — no real
  homepage exists yet).
- `app/design-system/page.tsx` — new showcase page.
- `app/components/ui/Button.tsx`
- `app/components/ui/Input.tsx`
- `app/components/ui/Select.tsx`
- `app/components/ui/Badge.tsx`
- `app/components/ui/StatusIndicator.tsx`
- `app/components/ui/ProgressBar.tsx`
- `app/components/ui/CourseCard.tsx`
- `app/components/ui/LessonCard.tsx`
- `app/components/ui/ResourceCard.tsx`
- `app/components/ui/Navbar.tsx`
- `app/components/ui/Breadcrumbs.tsx`
- `app/components/ui/Pagination.tsx`
- `package.json` / `package-lock.json` — add `lucide-react`.

## Requirements (from the reference image, section by section)
1. **Colors** — Primary 100–500 (`#FFEEE5`…`#F97316`) and Neutral 50–900 +
   white (`#FAFAFC`…`#0F172A`) as theme color tokens.
2. **Typography** — Playfair Display for display/heading type, Inter for
   everything else. Type scale as named utility classes or a `Text`/heading
   convention: Display 1 (48/56 bold), Display 2 (36/44 bold), Heading 1
   (28/36 semibold), Heading 2 (22/30 semibold), Heading 3 (18/26 medium),
   Body Large (16/24 regular), Body (14/20 regular), Small (12/16 regular).
3. **Spacing** — confirm Tailwind default scale covers 4/8/12/16/24/32/40/
   48/64px (base unit 4px); no custom scale needed.
4. **Radius & shadows** — radius tokens xs(4) sm(8) md(12) lg(16) xl(24)
   full(circle); shadow tokens sm/md/lg/xl with the exact rgba values shown.
5. **Icons** — outline default, filled for active/selected states, 24×24,
   2px stroke, rounded caps, consistent optical sizing.
6. **Buttons** — Primary (solid orange), Secondary (outline orange),
   Tertiary (outline neutral with icon, e.g. "View Lesson ↗"), Text (icon +
   label, e.g. "Watch Video ▷"), each with default/hover/disabled states.
   Height 44px default, radius 12px, padding 16px(lg)/12px(md), Inter
   Medium 14–16px.
7. **Inputs** — search/text input with leading search icon, placeholder,
   trailing `⌘K` hint; select dropdown. Height 44px, radius 12px, border
   `#E2E8F0`, padding 16px, focus border `#FB923C`.
8. **Badges/tags** — Video (orange solid), Lesson (neutral/blue-gray),
   Popular (light orange) — small pill labels.
9. **Status indicators** — In Progress, Completed, Now Playing, Locked, each
   with its own icon/color.
10. **Progress bar** — track + filled bar + percentage label (e.g. "35%
    complete").
11. **Cards** — Course Card (icon/logo, title, description, level, duration,
    module count), Lesson Card (Video variant: badge, title, description,
    lesson label + timestamp, "Watch from" action), Lesson Card (Lesson
    variant: badge, title, description, module label, "View lesson" action),
    Resource Card (file icon, title, description, file type + size).
12. **Navigation** — top navbar (logo + Courses/My Learning links),
    breadcrumbs (All Courses > Course > Lesson), pagination (numbered pages
    with prev/next arrows, ellipsis for skipped ranges).
13. **Principles** (Clarity First, Consistency, Focus & Calm, Accessible) —
    not literal UI, just guidance. No component needed; the acceptance
    criteria below hold components to these principles.

## Security considerations
None — this is presentational-only, static UI with no data fetching, no
secrets, no user input persistence, and no auth boundary involved.

## Acceptance criteria
- `/design-system` renders every section above and visually matches the
  reference image's colors, type, spacing, radii, shadows, icon style,
  button/input/badge/status/progress states, card variants, and nav/
  breadcrumb/pagination patterns.
- All new components are plain, typed, presentational React components (no
  `"use client"` unless a component needs interactivity like a Select's open
  state — most are static markup and stay server components).
- Tailwind utilities read from theme tokens (`bg-primary-500`, `font-display`,
  `rounded-lg`, `shadow-md`) rather than hardcoded hex/px values, so future
  pages inherit the system automatically.
- No unrelated boilerplate (create-next-app starter content, Geist fonts,
  default SVGs left unused) remains after the change.
- Root page (`/`) no longer shows create-next-app content.

## Checks to run
- `npm run lint`
- `npx tsc --noEmit` (type check)
- `npm run build` (routes/layout changed)
- `npm run dev` and visually diff `/design-system` against
  `design/vertex-designsystem.png`

## Manual test steps
1. `npm run dev`, open `http://localhost:3000/design-system`.
2. Compare colors, type scale, spacing swatches, radius/shadow samples side
   by side with the reference image.
3. Hover and click-disable the four button variants; confirm default/hover/
   disabled states match.
4. Focus the search input; confirm the border turns `#FB923C`. Open the
   select; confirm it renders options.
5. Check badge, status indicator, and progress bar sections render all
   listed states/values.
6. Check all four card variants (Course, Lesson/Video, Lesson/Lesson,
   Resource) render with sample data matching the reference layout.
7. Check the navbar, breadcrumbs, and pagination render and are keyboard/
   screen-reader reasonable (nav has `<nav>`/labels, pagination buttons are
   real `<button>`/`<a>` elements).
8. Resize the browser down to ~375px width; confirm nothing overflows or
   overlaps (no mobile reference exists, so this is just a non-breakage
   check, not a layout redesign).
