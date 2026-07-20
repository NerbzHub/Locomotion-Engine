# Packaging plan

The best near-term packaging path is a hosted static web build. Dungeon Defense
is already browser-first, deterministic, and built by Vite, so the simplest
tester experience is a single URL or a single launcher file that opens the
production build in their browser.

## Recommendation

Use this order:

1. **Hosted static build for testers and public release.**
   Deploy the `dist/` output to a static host such as GitHub Pages, itch.io HTML
   upload, Netlify, Cloudflare Pages, or another simple static site host. The
   tester presses one link and the game starts.
2. **Zip archive of the static build as a fallback.**
   Package `dist/` into a named archive for testers who cannot access the hosted
   version. Include a short `README` telling them to open `index.html` or run a
   tiny local server if their browser blocks local module loading.
3. **Desktop wrapper only after the web release is stable.**
   A Tauri or Electron wrapper can provide a double-click app, but it adds
   installer, signing, operating-system, and update complexity. It is not the
   best first packaging step for this project.

## Why hosted static first

- no installation for testers;
- works with the existing Vite build;
- matches the browser-first engine direction;
- easy to replace with a new release candidate;
- easy to ask testers for browser and device details;
- avoids desktop app signing before the game has proved its release loop.

## Current build command

Run:

```sh
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
```

The production artifact is:

```text
dist/
```

## One-button options

For playtesting, the most practical "press a button and it starts" option is a
hosted button or link:

```text
Play Dungeon Defense
```

That button should open the hosted `dist/` build.

For local testing without a host, use a small launcher script later:

```text
Start Dungeon Defense.command
```

The launcher would start a local static server and open the browser. This is
friendlier than asking testers to install Node, but it still has macOS security
prompt considerations and should be treated as a fallback, not the main
distribution method.

## Package naming

Use explicit candidate names:

```text
dungeon-defense-0.1.0-rc.1
dungeon-defense-0.1.0-rc.2
dungeon-defense-0.1.0
```

Keep feedback separated by candidate. Do not mix reports from different builds
unless the issue is confirmed in both.

## Release-candidate checklist

- [ ] Select a candidate name.
- [ ] Record the source commit.
- [ ] Run `pnpm install --frozen-lockfile`.
- [ ] Run `pnpm run check`.
- [ ] Run `pnpm run build`.
- [ ] Smoke-test the built game in a browser.
- [ ] Publish or archive the exact `dist/` output.
- [ ] Send testers `docs/PLAYTESTER_CRITERIA.md`.
- [ ] Triage feedback using the severity guide.

## Public release blocker

No public distribution should happen until the project owner selects and adds a
root `LICENSE` file. Private tester sharing can proceed only if the owner is
comfortable with the sharing scope and the testers understand the build is not
licensed for reuse or redistribution yet.

## Later desktop-app option

Revisit a desktop wrapper after Gate 1 if there is evidence that players need a
downloadable app. At that point, compare:

- **Tauri:** smaller bundles and stronger native-shell story, but adds Rust and
  platform signing work.
- **Electron:** larger bundles but mature tooling and straightforward web-app
  wrapping.

Do not choose either until the hosted static release has exposed real player
needs.
