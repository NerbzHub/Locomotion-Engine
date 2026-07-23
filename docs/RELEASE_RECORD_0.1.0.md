# Dungeon Defense v0.1.0 Release Record

**Release date:** 2026-07-23  
**Source revision:** Git tag `v0.1.0`  
**Package version:** `0.1.0`

## Scope

Gate 1 ships the deterministic Dungeon Defense vertical slice after the RC2
feedback cycle. The accepted UI work covers intentional entry, compact tactical
state, simplified level/difficulty setup, and removal of repeated gameplay
instructions.

## Verification record

- Dependency installation with the frozen lockfile passed.
- Type checking and the deterministic Vitest suite passed.
- The production Vite build passed.
- Desktop mouse and narrow-touch smoke checks passed.
- RC2 feedback satisfied its tester, browser, and input-method acceptance
  criteria; accepted FI2–FI5 fixes are incorporated.

## Known limitations

- Full keyboard-only setup/menu traversal is not a Gate 1 support claim.
- Distribution remains browser-first; desktop packaging is deferred.
- The all-rights-reserved, no-licence policy applies to the source and release
  materials.

## Artifact procedure

Build the exact release artifact from the tagged revision:

```sh
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
```

The resulting `dist/` directory is the deployable static artifact. Preserve it
with this record when creating a hosted or archive distribution.

## Verified artifact hashes

The following SHA-256 hashes were produced by the release build on 2026-07-23:

```text
5aa1b9baeed0f6b92ee9717ab4eadf36f222c7be0d3ae51315614e13e07fd870  dist/index.html
f2998c77ec199aba60f7d56a6d94de89327678bb8998ce8bea38c419a19f588d  dist/assets/index-D5T2CABU.css
0e06d196457307a914d6eb57682e5b162d8353afe7f4573b9ed0c0fa9f081283  dist/assets/index-DFmU6hwz.js
```
