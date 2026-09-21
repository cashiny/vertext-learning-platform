# Sanity Content Model + Standalone Studio + Read Data Layer

## Goal

Restructure the currently-embedded Sanity Studio into its own standalone
`studio/` workspace, build the content model for course, module, lesson,
instructor, and category (section 8 of AGENTS.md), and give the `web`
workspace (repo root) a server-only read client and typed fetch helpers.
Video documents, the search Context document, and progress records are
separate later tasks and are out of scope here.

## Skills and docs read

- `sanity-best-practices` skill: `references/project-structure.md`,
  `references/schema.md`, `references/nextjs.md`, `references/typegen.md`.
- `content-modeling-best-practices` skill (reference vs. embedding,
  separation of concerns).
- AGENTS.md sections 5 (workspace boundaries), 6 (stack), 8 (data shape),
  12 (private dataset, server-only token), 13 (checks).

## Code inspected

- Root `package.json`: Next.js 16.3.5 app lives at the **repo root**
  (not a `web/` subfolder). `azure-pipelines.yml` runs `npm install && npm
  run build` from the repo root, so the Next app cannot move into a
  subfolder without breaking CI — it stays at root and root *is* the web
  workspace.
- `sanity.config.ts` / `sanity.cli.ts` (root) + `app/studio/[[...tool]]/page.tsx`
  + `sanity/` (`env.ts`, `structure.ts`, `schemaTypes/index.ts` — empty,
  `lib/{client.ts,image.ts,live.ts}`): this is the embedded-Studio scaffold
  from `sanity init`, which AGENTS.md explicitly forbids ("do not embed the
  Studio inside Next.js"). Confirmed with the user this should be
  restructured into two standalone workspaces rather than left embedded.
- `sanity/lib/client.ts` currently has no read token and assumes a public
  dataset — needs a server-only token per AGENTS.md section 12.
- `.env.example` / `.env.local`: has Clerk vars and
  `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`, no read
  token yet.
- `app/components/ui/{CourseCard,LessonCard,ResourceCard}.tsx` and
  `app/page.tsx`: existing UI already expects `title`, `description`,
  `level`, `duration`, `moduleCount` for courses; `title`/`description`
  plus a lesson or module label for lesson cards; `title`/`description`/
  `fileType`/`fileSize` for resources. Schema field choices below keep
  these easy to project into.

## Decisions and assumptions

- **Workspace layout**: root stays the `web` workspace (Next app, CI
  depends on it). Add a new sibling `studio/` folder as the standalone
  Studio workspace with its own `package.json`, deployed independently.
  Delete `app/studio/`, root `sanity.config.ts`, root `sanity.cli.ts`, and
  move `sanity/schemaTypes/` + `sanity/structure.ts` into `studio/`.
- **Dependencies**: move `sanity`, `@sanity/vision`, `styled-components`
  (Studio-only peer deps) out of root `package.json` into
  `studio/package.json`, alongside `react`/`react-dom`/`typescript` that
  the Studio needs as its own app. Root keeps `next-sanity` and
  `@sanity/image-url` (needed for server-side fetching/image URLs).
- **Env vars**: Studio uses the Sanity CLI's `SANITY_STUDIO_`-prefixed
  vars (`SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`) in its own
  `studio/.env` (gitignored) with a `studio/.env.example` committed. Root
  keeps `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`
  (not secret, just identifiers) and gains a new server-only
  `SANITY_API_READ_TOKEN` for reading the private dataset. Root
  `.env.example` gets the new token entry.
- **No Live Content API / browser token**: AGENTS.md section 5 says the
  browser never holds a token. `next-sanity`'s `defineLive` typically also
  issues a `browserToken` for real-time preview, which would put a token
  in the client bundle. Skipping `defineLive`/`SanityLive` for now — the
  data layer is a plain server-only `client.fetch` with tag-based
  revalidation (`sanity/lib/fetch.ts`). Visual Editing/Presentation can be
  layered on later as its own task if wanted; not requested here.
- **Dataset privacy / CORS**: making the dataset private and adding
  `http://localhost:3333` to CORS origins requires a `sanity login`
  session, which isn't available non-interactively. These are called out
  as manual steps in "Manual test steps" below rather than attempted from
  here.
- **Schema field choices** (fixed relationships/fields per AGENTS.md
  section 8; everything else chosen sensibly):
  - `course`: `title`, `slug`, `summary` (text), `coverImage` (image, hotspot),
    `level` (string, options list: Beginner/Intermediate/Advanced, matches
    existing UI copy), `price` (number, dollars; 0/empty reads as free),
    `popular` (boolean flag — AGENTS.md calls it a flag explicitly),
    `studentCount` (number), `whatYoullLearn` (array of `learningOutcome`
    objects: `icon` string, `title`, `description`), `instructor`
    (reference), `category` (reference), `modules` (array of `module`
    objects).
  - `module` (object, not a document): `title`, `summary`, `lessons`
    (array of references to `lesson`). Module/lesson numbers are derived
    from array order in the frontend, not stored.
  - `lesson` (document): `title`, `slug`, `videoUrl` (url), `poster`
    (image), `duration` (number, seconds — precise and easy to format;
    consistent with `startSeconds` used elsewhere for video timing),
    `freePreview` (boolean), `studentCount` (number), `notes` (Portable
    Text), `keyPoints` (array of strings), `proTip` (text, optional),
    `resources` (array of `resource` objects: `type` string list
    [pdf/link/code/doc/video], `title`, `description`, `url`). No
    reference back to course — course→lesson is the owning direction, so a
    reverse lookup (`*[_type=="course" && references($lessonId)]`) derives
    the parent course.
  - `instructor` (document): `name`, `slug`, `photo` (image), `expertise`
    (array of strings), `bio` (text).
  - `category` (document): `title`, `slug`, `description` (text).
- **TypeGen**: enabled in `studio/sanity.cli.ts`, schema path points at
  root (`../**/*.{ts,tsx}` excluding `node_modules`/`.next`), output to
  root `sanity.types.ts` (committed, per "Option A" — small team, avoids
  needing typegen in CI). Root `tsconfig.json` gets `sanity.types.ts`
  added to `include`.

## Files expected to touch

New (`studio/` workspace):
- `studio/package.json`, `studio/tsconfig.json`, `studio/.gitignore`, `studio/.env.example`
- `studio/sanity.config.ts`, `studio/sanity.cli.ts`, `studio/structure.ts`
- `studio/schemaTypes/index.ts`
- `studio/schemaTypes/documents/{course,lesson,instructor,category}.ts`
- `studio/schemaTypes/objects/{module,learningOutcome,resource}.ts`

New (`web`/root data layer):
- `sanity/lib/fetch.ts` (tag-based revalidation wrapper around `client.fetch`)
- `sanity/lib/queries.ts` (GROQ via `defineQuery`)
- `sanity/lib/data.ts` (typed helpers: `getCourses`, `getCourseBySlug`,
  `getLessonBySlug`, `getInstructors`, `getInstructorBySlug`, `getCategories`)

Modified:
- `sanity/lib/client.ts` (add server-only read token, `useCdn: false`)
- `package.json` (remove Studio-only deps, add root `typegen` script)
- `.env.example` (add `SANITY_API_READ_TOKEN`)
- `tsconfig.json` (include generated `sanity.types.ts`)

Deleted:
- `app/studio/` (whole directory)
- root `sanity.config.ts`, root `sanity.cli.ts`
- `sanity/structure.ts`, `sanity/schemaTypes/` (moved into `studio/`)
- `sanity/lib/live.ts` (unused, and its browser-token pattern conflicts
  with the no-browser-token rule)

## Requirements

- Follow the sanity-best-practices schema rules: `defineType`/`defineField`/
  `defineArrayMember` everywhere, icons from `@sanity/icons/<Name>` on every
  document/object, `options.list` instead of ad-hoc strings for level/resource
  type, required validation on identifying fields (`title`, `slug`).
- No document type stores its own `_id` explicitly (let Sanity generate IDs);
  relationships go through `reference` fields.
- Studio workspace is fully standalone: own `package.json`, own
  `node_modules`, runs with `sanity dev` (not `next dev`).
- Root workspace never imports anything from `studio/`, and its read client
  and helpers are never imported from a `"use client"` file.

## Security considerations

- `SANITY_API_READ_TOKEN` stays out of `NEXT_PUBLIC_*` and is only read
  inside `sanity/lib/client.ts`, which itself is only ever imported from
  Server Components or Route Handlers.
- `studio/.env` (real project id/dataset) is gitignored; only
  `studio/.env.example` is committed.
- No secret values are written into any committed file in this task.

## Acceptance criteria

- `npm run dev` at root still boots the Next app with no `/studio` route.
- `npm run dev` inside `studio/` boots the Studio at `localhost:3333` showing
  Course, Lesson, Instructor, Category in the document list (Module isn't a
  document, so it won't appear there).
- Creating a Course in Studio, adding a Module with Lessons, and referencing
  an Instructor/Category round-trips correctly (no schema errors, no
  crashes).
- `getCourseBySlug` returns a course with its modules' lessons resolved via
  `->` and its instructor/category resolved via `->`.
- Root type check and lint pass; Studio type check passes.

## Checks to run

- Root: `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- Studio: `cd studio && npx tsc --noEmit` and a manual `sanity dev` smoke test
  (can't deploy without a login session from here).

## Manual test steps (for you to run, since they need a Sanity login)

1. `cd studio && npm install`.
2. `sanity login` if not already authenticated.
3. Copy `studio/.env.example` to `studio/.env` and fill in your project id/dataset.
4. `npx sanity cors add http://localhost:3333 --credentials` (and your deployed
   Studio URL later) so the Studio can talk to the API locally.
5. `npm run dev` in `studio/` → open `localhost:3333`, confirm Course / Lesson /
   Instructor / Category show up with the fields described above.
6. Create one Instructor, one Category, one Lesson, then one Course that
   references them via a Module — confirm no validation errors.
7. `npx sanity deploy` from `studio/` (required before the Context MCP can
   serve the dataset later).
8. Make the dataset private if it isn't already: `npx sanity dataset visibility set <dataset> private`.
9. Create a read token in [manage.sanity.io](https://manage.sanity.io) → API
   → Tokens (Viewer), put it in root `.env.local` as `SANITY_API_READ_TOKEN`.
10. Back at repo root: `npm install`, `npm run typegen`, then `npm run dev` and
    hit a test route/`console.log` of `getCourses()` to confirm the read path
    works end-to-end against the live dataset.
