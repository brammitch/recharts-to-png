# Maintaining recharts-to-png

Maintainer runbook. Contributor-facing setup lives in the [README](README.md#contributingdeveloping).

## Releasing

**`npm run release` goes all the way to npm.** There is no manual publish step and no pause
for review — bump, tag, push, and publish all happen from that one command.

### 1. Preview

```sh
npm run release:dry
```

Shows the version it would pick, the changelog it would write, and the commands it would run.
Changes nothing.

### 2. Release

From `main`, with a clean working tree:

```sh
npm run release
```

What happens, in order:

1. `npm run build`
2. Bumps the version in `package.json` and `package-lock.json`, derived from the commits since
   the last tag
3. Regenerates `CHANGELOG.md`
4. Commits those files as `chore(release): X.Y.Z`
5. Creates the annotated tag `vX.Y.Z`
6. The `posttag` hook in [`.versionrc.json`](.versionrc.json) pushes the commit and tag to `origin`
7. The tag push triggers [`publish.yml`](.github/workflows/publish.yml), which runs `npm ci`,
   `npm test`, `npm run build`, then `npm publish --provenance --access public`

All of it happens from that one command — there is no manual step anywhere in the chain.
**Do not run `npm publish` yourself**, and don't use `npm version` to cut a release: it tags
without writing a changelog entry, and the tag alone is enough to trigger a publish.

### The version bump comes from your commits

| Commit                                         | Bump  | Example           |
| ---------------------------------------------- | ----- | ----------------- |
| `fix(...)`                                     | patch | `1.2.3` → `1.2.4` |
| `feat(...)`                                    | minor | `1.2.3` → `1.3.0` |
| `feat(...)!` or `BREAKING CHANGE:` in the body | major | `1.2.3` → `2.0.0` |

Other types (`chore`, `docs`, `ci`, `build`, `refactor`) don't drive a bump on their own.

### Verifying a release

```sh
gh run list --workflow "Publish Package to npmjs"   # did the workflow pass?
npm view recharts-to-png version                    # what's live?
npm pack recharts-to-png@X.Y.Z                      # inspect the actual tarball
```

The tarball should contain 8 files: `LICENSE`, `README.md`, `package.json`, and five `dist/`
files. **If `dist/` is missing, the build step didn't run** — that ships a package that fails
on import for every consumer.

### When something goes wrong

- **npm versions are immutable.** You cannot republish `X.Y.Z`, even if it was wrong. Fix
  forward and release again.
- **Tag pushed but nothing published?** Check that the tag matches `v*` and look at the
  workflow run.
- **Publishing uses npm Trusted Publishing (OIDC)** — there is no `NPM_TOKEN` and no repository
  secret to maintain. npm authorises the publish by matching the OIDC claim against the trusted
  publisher configured for this package, which is tied to this repository _and_ the workflow
  filename. Renaming `publish.yml`, moving the repo, or dropping `permissions: id-token: write`
  will break publishing and silently drop the provenance badge. Repo visibility must stay public.

## Commit messages

Enforced by commitlint via the `commit-msg` hook. Conventional Commits, **with a required
scope** limited to `lib`, `deps`, `release`, or `other`.

| Message                                   | Result                                                |
| ----------------------------------------- | ----------------------------------------------------- |
| `fix(lib): stop leaking the loading flag` | ✅                                                    |
| `chore(other): housekeeping`              | ✅                                                    |
| `fix: stop leaking the loading flag`      | ❌ `scope may not be empty`                           |
| `fix(api): ...`                           | ❌ `scope must be one of [lib, deps, release, other]` |

Scopes are configured in [`commitlint.config.js`](commitlint.config.js).

## Automated checks

| Stage          | Runs                         | Purpose                                        |
| -------------- | ---------------------------- | ---------------------------------------------- |
| `commit-msg`   | commitlint                   | Rejects non-conforming commit messages         |
| `pre-commit`   | `lint-staged`                | Auto-fixes staged files with ESLint + Prettier |
| `pre-push`     | `npm test`                   | Stops broken tests leaving your machine        |
| CI — `quality` | `format:check`, `lint:check` | Once, on Node 24                               |
| CI — `build`   | `npm test`, `npm run build`  | Node 20, 22, 24, 26                            |

The hooks and CI overlap on purpose. Hooks are convenience — they're skippable with
`--no-verify` and don't run at all for Dependabot's commits, which is exactly where formatting
drift has crept in before. CI is the actual gate.

### Hooks aren't running?

Hooks live in [`.husky/`](.husky) and are installed by the `prepare` script on `npm i`.

```sh
git config core.hooksPath      # must print .husky
git ls-files -s .husky/        # each hook must be mode 100755
```

A hook committed as `100644` is skipped silently — no error, no output.

## Scripts

| Command                               | Does                                            |
| ------------------------------------- | ----------------------------------------------- |
| `npm run build`                       | Cleans `dist/` and builds the library           |
| `npm run watch`                       | Rebuilds on change                              |
| `npm test`                            | Jest, in the `lib` workspace                    |
| `npm run coverage`                    | Tests with a coverage report                    |
| `npm run demo`                        | Runs the Next.js demo (installs its deps first) |
| `npm run lint:check` / `lint:fix`     | ESLint                                          |
| `npm run format:check` / `format:fix` | Prettier                                        |
| `npm run release:dry`                 | Preview a release, change nothing               |
| `npm run release`                     | Release and publish                             |

## Repository layout

- `lib/` — the published library (an npm workspace). Source in `lib/src/index.tsx`,
  build config in `lib/rollup.config.js`.
- `examples/next/` — the demo app. **Deliberately not a workspace**: it has its own
  `package-lock.json` so Next.js's dependency tree stays out of the root `npm audit`. It
  imports the built output by relative path (`../../../dist`), so run `npm run build` before
  the demo reflects your changes.
- `dist/` — build output, gitignored, and built in CI at publish time.
