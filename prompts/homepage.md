# Implement the Vertex Homepage

## Goal
Build `app/page.tsx` as the real Vertex homepage from `design/vertex-home.png`,
replacing the current placeholder ("Vertex" title + link to `/design-system`).
Reuse the design-system primitives built in the previous task instead of
re-styling from scratch.

## Skills / docs read
- AGENTS.md section 3 (UI work — reproduce the reference exactly, make
  responsive down to mobile, no restyling) and section 5/7 (pages are read
  only; content model not built yet, so this page uses local mock data, not a
  Sanity fetch).
- No sanity/clerk/search skill applies — this is pure presentational
  Tailwind/React page work, no data layer, no auth, no search backend yet.

## Code inspected
- `design/vertex-home.png` — the reference. Sections top to bottom:
  1. Navbar: logo + "Vertex", "Courses" / "My Learning" links, a bell icon and
     a circular user avatar on the right.
  2. Hero: small pill eyebrow badge "INTELLIGENT LEARNING", two-line Display 1
     serif headline "Search your learning in plain English.", a body subtext,
     a primary button "Explore Courses →", and below it a large search input
     "Ask anything about your learning..." with a "⌘K" hint.
  3. "All Courses" section header with a "View all courses →" text link, and
     a 3-column grid of course cards (Next.js/black icon, Docker/white-ish
     icon, TypeScript/blue icon), each with title, description, and a
     level/duration/module-count meta row.
  4. A thin divider line with a star icon + "New courses and lessons added
     every week." caption.
  5. A decorative gradient bar-chart graphic anchoring the bottom of the page.
- `app/components/ui/Navbar.tsx` — has logo + Courses/My Learning links, but
  no bell/avatar on the right yet.
- `app/components/ui/Button.tsx` — `primary` variant matches the hero CTA;
  supports `icon` + `iconPosition="right"`, so the arrow is a lucide icon, not
  new markup.
- `app/components/ui/Input.tsx` — `SearchInput` already renders the search
  icon + placeholder + `⌘K` hint, matches the hero search bar as-is.
- `app/components/ui/CourseCard.tsx` — matches title/description/meta-row
  layout, but hardcodes the icon tile to `bg-neutral-900` (black). The
  reference shows three different tile treatments (black, white/light,
  blue), so the tile background needs to become a prop instead of a
  hardcoded class.
- `app/components/ui/typography.ts` — `textStyles.display1` etc. already
  match the reference type scale.
- `app/globals.css` — color/radius/shadow tokens already cover everything
  this page needs (primary-100 for the eyebrow pill, neutral scale, shadow-sm
  for cards).
- No `lucide-react` icons for a generic "star" or "chevron-right" arrow are
  missing — both exist in the installed `lucide-react` package (`Star`,
  `ArrowRight`, `Bell`).
- No course/instructor Sanity schema or client exists yet (content model is a
  later task per AGENTS.md section 8), so course data on this page is local
  mock data, not a fetch. This keeps the page a pure presentational component,
  consistent with "pages are read only" — later this becomes a real fetch
  without changing the visual layer.

## Decisions / assumptions
1. **Data**: three mock courses (Next.js for Production, Docker Essentials,
   TypeScript Deep Dive) hardcoded as a local array in `page.tsx`, matching
   the reference exactly (title, description, level, duration, module count).
   No Sanity fetch yet — flagged as a follow-up once the course schema and
   client exist.
2. **CourseCard change**: add an optional `iconBgClassName` prop (default
   `bg-neutral-900`, matching current usage elsewhere) so this page can pass
   `bg-white border border-neutral-200` for Docker and `bg-blue-600` (a
   one-off, since blue isn't in the current neutral/primary token set and the
   reference clearly shows a brand blue tile) for TypeScript. This is a
   minimal, backwards-compatible prop addition, not a rewrite.
3. **Navbar change**: add an optional right-side slot (bell icon button +
   avatar) directly in `Navbar.tsx` behind the existing layout, since every
   authenticated page will need this same right side later (per AGENTS.md
   Clerk/auth section) — not homepage-specific markup bolted onto `page.tsx`.
   Avatar is a placeholder round image/initial (no Clerk wired up yet per
   AGENTS.md section 5, auth is a separate task); I'll use a static placeholder
   avatar circle (initials or a neutral silhouette), not a real user photo.
4. **Bottom bar-chart graphic**: pure decorative CSS (a row of divs with
   varying heights and an orange gradient, `aria-hidden`), not an image asset
   or a charting library — matches "do not overbuild" and there's no exported
   asset for it.
5. **New icon**: `Star` and `ArrowRight` from `lucide-react` (already a
   dependency) for the eyebrow-adjacent footer line and button/link arrows.
6. **Responsiveness**: reference is desktop-only. Stack nothing needed for
   the hero/section (already single column), but the 3-column course grid
   collapses to 1 column below `sm`/`md` per AGENTS.md section 3's "adapt
   sensibly" instruction, and hero heading/search width become fluid
   (`max-w-*` + padding) rather than a fixed desktop px width.

## Files expected to touch
- `app/page.tsx` — full rewrite: navbar, hero, search, all-courses grid,
  footer strip, decorative graphic.
- `app/components/ui/CourseCard.tsx` — add `iconBgClassName` prop (optional,
  defaulted), no breaking change to existing callers (design-system page).
- `app/components/ui/Navbar.tsx` — add bell + avatar right-side slot.

## Requirements
1. Navbar: logo, Courses / My Learning links (existing), plus a bell icon
   button and a circular avatar placeholder on the far right.
2. Hero: eyebrow pill badge, two-line serif Display 1 headline, subtext,
   primary "Explore Courses" button with right arrow, search input below with
   `⌘K` hint — center-aligned, matching the reference's vertical rhythm.
3. All Courses section: heading + "View all courses" text link with an arrow,
   3-column responsive card grid using `CourseCard` with the three distinct
   icon-tile treatments.
4. Divider + "New courses and lessons added every week." caption with a star
   icon, centered.
5. Decorative bottom graphic, purely visual, `aria-hidden="true"`.
6. Reuse existing tokens/components; no new hardcoded hex values except the
   one-off TypeScript blue tile background, and no new component primitives
   beyond the two small, justified prop/slot additions above.

## Security considerations
None — static presentational page, no data fetching, no user input persisted,
no auth boundary. The search input is decorative/non-functional until the
real search route (AGENTS.md section 11) is built; it renders but submits
nothing in this task.

## Acceptance criteria
- `/` visually matches `design/vertex-home.png`: layout, spacing, type,
  colors, icon set, and all listed sections present.
- Responsive down to mobile widths: course grid stacks to 1 column, hero and
  search bar stay legible and don't overflow at ~375px, without redesigning
  the desktop layout.
- `CourseCard` remains backwards compatible (design-system page still renders
  correctly with the default black tile).
- No new hardcoded design tokens besides the one documented blue exception.
- No `"use client"` needed anywhere on this page — all static markup, no
  interactivity/state.

## Checks to run
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- `npm run dev` and visually diff `/` and `/design-system` against their
  reference images.

## Manual test steps
1. `npm run dev`, open `http://localhost:3000/`.
2. Compare navbar, hero copy/button/search bar, course grid, and footer strip
   against `design/vertex-home.png` at desktop width.
3. Resize down to ~375px; confirm the course grid stacks to one column and
   nothing overflows or overlaps.
4. Open `http://localhost:3000/design-system`; confirm the Course Card
   section still renders with its original black icon tile (no regression
   from the new `iconBgClassName` prop).
5. Click the search input and the "Explore Courses" / "View all courses"
   controls; confirm they render/focus correctly (no functional navigation
   expected yet beyond `Explore Courses` linking to `/courses` and
   `View all courses` linking to `/courses`).
