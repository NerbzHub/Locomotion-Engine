# Release checklist

Use this checklist when preparing any public build of Locomotion Engine or
Dungeon Defense.

## Scope and version

- [ ] Decide the release version using Semantic Versioning.
- [ ] Update `package.json` and `CHANGELOG.md` with that version and date.
- [ ] Create release notes from `docs/RELEASE_NOTES_TEMPLATE.md`.
- [ ] Record known limitations and supported browser/runtime versions.

## Verification

- [ ] Install with `pnpm install --frozen-lockfile`.
- [ ] Run `pnpm run check` successfully.
- [ ] Run `pnpm run build` successfully.
- [ ] Perform a browser smoke test of a complete game flow.
- [ ] Confirm GitHub Actions has passed for the release commit.

## Playtest candidate

- [ ] Prepare tester instructions from `docs/PLAYTESTER_CRITERIA.md`.
- [ ] Record the candidate name, source commit, build date, and known
  limitations.
- [ ] Freeze gameplay/content changes for the candidate window.
- [ ] Triage feedback by critical, high, medium, or low severity.
- [ ] Link every accepted fix to feedback evidence from the candidate.

## Distribution and attribution

- [ ] Confirm root `LICENSE.md` retains the all-rights-reserved, no-licence
  notice, or explicitly update it if the owner's distribution policy changes.
- [ ] Review `NOTICE.md` for bundled dependency and asset attributions.
- [ ] Choose the distribution path from `docs/PACKAGING_PLAN.md`.
- [ ] Ensure no development-only files, credentials, or local save data are in
  the release archive.
- [ ] Preserve the generated `dist/` output only when a hosted/archive release
  needs it; it is not the repository source of truth.

## Final hand-off

- [ ] Tag the verified commit with the release version.
- [ ] Attach or deploy the production build.
- [ ] Publish the release notes and link the source revision.
