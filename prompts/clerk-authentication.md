# Add Clerk Authentication

## Goal

Wire up Clerk authentication in the `vertex` Next.js app (currently the sole
workspace at the repo root — no `web`/`studio` split exists yet since only
the homepage has been built so far) so learners can sign up, sign in, and
see a signed-in user control. This is infrastructure only: no page is
gated yet, since no protected features (My Learning, progress) exist in
the codebase yet.

## Skills and docs read

- `AGENTS.md` (section 5: auth is Clerk via Next.js middleware, secret key
  server-only, publishable key browser-safe; section 12/13 checks).
- `clerk-setup` skill (`.claude/skills/clerk/clerk-setup/`), routed via the
  top-level `clerk` skill.

## Code inspected

- Repo root `package.json`: Next.js 16.3.5, React 19.2.8, no Clerk package
  installed, no `web`/`studio` workspace split yet — everything lives in
  the root `app/` directory (App Router).
- No `.env`/`.env.local`/`.env.example` file exists yet.
- No `middleware.ts` or `proxy.ts` exists yet.
- `app/layout.tsx`, `app/page.tsx`, `app/components/` — homepage from the
  design reference, no nav auth controls yet.
- Clerk CLI (`clerk`) is not installed on this machine.

## Decisions and assumptions

- Treat this as an **existing project** for `clerk init` (it has an App
  Router app already), not an empty scaffold.
- Install the Clerk CLI globally via npm (repo already uses npm —
  `package-lock.json` present, no other lockfile).
- Link to the Clerk application `app_3JTcrINFQcTAWUP9EGNEDKPzW1y` as
  instructed by the clerk-setup skill, passing `--app` to `clerk init`.
- Do not restructure into the `web`/`studio` workspace split as part of
  this task — that is a larger structural change AGENTS.md calls for later
  and is out of scope for "add Clerk auth" alone. Clerk will be wired into
  the current root Next.js app; when the workspace split happens later,
  the Clerk wiring moves with the app code.
- Add sign-in/sign-up/user-button controls into the existing homepage nav
  (`app/components/`), matching existing styling, not a new design.
- No routes are gated yet since no protected pages exist — middleware is
  installed but the matcher stays permissive (public browsing), per
  AGENTS.md ("gate only what a feature marks as protected").
- `.env.example` will be created/updated with the Clerk key names (no
  secret values) as the canonical list per AGENTS.md section 12; `clerk
  init` will populate the real `.env.local`, which is not read or printed.

## Files expected to touch

- `package.json` / `package-lock.json` (adds `@clerk/nextjs`)
- New `middleware.ts` (or `proxy.ts` if that's what current Next.js 16
  conventions use — will verify against `node_modules/next/dist/docs/`)
- `app/layout.tsx` (wrap with `ClerkProvider`, inside `<body>`)
- `app/components/` nav component (add `SignInButton`, `SignUpButton`,
  `UserButton` via `Show`)
- `.env.local` (created by `clerk init`, not committed)
- `.env.example` (new or updated, client-safe keys only)

## Requirements

1. Install/update the Clerk CLI, `clerk auth login`, then
   `clerk init --app app_3JTcrINFQcTAWUP9EGNEDKPzW1y` for this existing
   Next.js project.
2. Verify (Next.js 16, so check current docs) whether the proxy/middleware
   matcher needs `'/__clerk/:path*'` after the `'/(api|trpc)(.*)'` entry,
   and add it if applicable.
3. Add visible sign-in, sign-up, and signed-in (`UserButton`) controls to
   the homepage nav, reusing existing nav styling.
4. Keep `CLERK_SECRET_KEY` server-only; only `NEXT_PUBLIC_CLERK_...` keys
   reach the browser.
5. `ClerkProvider` inside `<body>`, not wrapping `<html>`.
6. Update `.env.example` with the (non-secret) Clerk env var names.

## Security considerations

- Never print or commit `.env.local` contents.
- Confirm `CLERK_SECRET_KEY` is not referenced from any client component.
- Confirm middleware/proxy doesn't accidentally lock down public catalog
  routes (there are none yet besides `/`, but keep the matcher scoped so
  future public pages aren't gated by default).

## Acceptance criteria

- `clerk doctor` reports no issues.
- App builds and runs; homepage shows Sign in / Sign up when signed out.
- Signing up creates a first test user and the nav shows `UserButton`.
- Type check and lint pass.

## Checks to run

- `npm run lint`
- `npx tsc --noEmit` (or project's type-check script if one exists)
- `npm run build`
- `npm run dev` and manually test sign-up/sign-in

## Manual test steps

1. `npm run dev`, open the homepage.
2. Confirm "Sign in" / "Sign up" controls appear in the nav.
3. Click Sign up, complete the flow with a test email.
4. Confirm the nav now shows a `UserButton` with the account avatar.
5. Click the `UserButton`, confirm sign-out works and controls revert to
   Sign in / Sign up.
