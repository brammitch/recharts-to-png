# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.0](https://github.com/brammitch/recharts-to-png/compare/v2.0.2...v2.1.0) (2022-05-27)

## [2.1.0-rc.2](https://github.com/brammitch/recharts-to-png/compare/v2.1.0-rc.1...v2.1.0-rc.2) (2022-05-27)

- **other**: unify eslintrc and tsconfigs; clean up demo

## [2.1.0-rc.1](https://github.com/brammitch/recharts-to-png/compare/v2.1.0-rc.0...v2.1.0-rc.1) (2022-05-27)

### Features

- **other:** :bricks: change demo from cra to next ([0658c49](https://github.com/brammitch/recharts-to-png/commit/0658c49227873c91fd33382e5fa5a8d946ac4021))

## [2.1.0-rc.0](https://github.com/brammitch/recharts-to-png/compare/v2.0.3-rc.0...v2.1.0-rc.0) (2022-05-27)

### Features

- **other:** :building_construction: convert to workspace ([4dc7cad](https://github.com/brammitch/recharts-to-png/commit/4dc7caded00c513bbc7cc91682ad374b7ee969ec))

### Bug Fixes

- **deps:** :heavy_plus_sign: ensure deps and peerDeps are added to release ([14e62a5](https://github.com/brammitch/recharts-to-png/commit/14e62a53c35428a540848a2fedf80e8af2b158df))

### [2.0.3-rc.0](https://github.com/brammitch/recharts-to-png/compare/v2.0.2...v2.0.3-rc.0) (2022-05-26)

- **dist:** do not publish test files

### [2.0.2](https://github.com/brammitch/recharts-to-png/compare/v2.0.1...v2.0.2) (2022-04-18)

- **dist:** :bug: Fix build
- **deps:** Support React 18

### [~~2.0.1~~](https://github.com/brammitch/recharts-to-png/compare/v1.1.2...v2.0.1) (2022-04-05) _Broken release has been deprecated in npm; use 2.0.2 instead_

### [2.0.0](https://github.com/brammitch/recharts-to-png/compare/v1.1.2...v2.0.0) (2022-01-06)

### Breaking

- :warning: Removed deprecated function `useRechartToPng` in favor of `useCurrentPng`

### [1.1.2](https://github.com/brammitch/recharts-to-png/compare/v1.1.1...v1.1.2) (2021-12-29)

- **deps:** Upgrade html2canvas to ^1.2.0; fixes [#317](https://github.com/brammitch/recharts-to-png/issues/317)

### [1.1.1](https://github.com/brammitch/recharts-to-png/compare/v1.1.0...v1.1.1) (2021-07-14)

- **deps:** Upgrade html2canvas to v1; remove @types/html2canvas

## [1.1.0](https://github.com/brammitch/recharts-to-png/compare/v1.0.1...v1.1.0) (2021-06-02)

### Release

- Add `useCurrentPng` hook; see [PR #181](https://github.com/brammitch/recharts-to-png/pull/181)

### [1.0.1](https://github.com/brammitch/recharts-to-png/compare/v1.0.0...v1.0.1) (2021-06-02)

### Bug Fixes

- **lib:** :bug: make options optional ([d655b3f](https://github.com/brammitch/recharts-to-png/commit/d655b3f75b4d49c6403bdb9649d5ce2d265283cc))

## [1.0.0](https://github.com/brammitch/recharts-to-png/compare/v0.8.4...v1.0.0) (2021-04-06)

### Release

- :shipit: Verified support for recharts v2; still compatible with v1

### Breaking

- :warning: After being deprecated in previous releases, `getPngData` has been removed
- If you haven't already migrated to the `useRechartToPng` hook, check the [README](https://github.com/brammitch/recharts-to-png#usage) for usage instructions.

### [0.8.2](https://github.com/brammitch/recharts-to-png/compare/v0.8.1...v0.8.2) (2020-12-17)

### Bug Fixes

- **lib:** :label: update types to match current version ([4c8796c](https://github.com/brammitch/recharts-to-png/commit/4c8796ca80a9135dc52c0eed2fbe4c9d7c9bbe56))

### [0.8.1](https://github.com/brammitch/recharts-to-png/compare/v0.8.1-0...v0.8.1) (2020-12-15)

- **deps:** Move `react` and `react-dom` to peerDependencies

### [0.8.1-0](https://github.com/brammitch/recharts-to-png/compare/v0.8.0...v0.8.1-0) (2020-12-15)

### Bug Fixes

- **lib:** :label: fix types ([2354a6e](https://github.com/brammitch/recharts-to-png/commit/2354a6e32174f1ca19361a8225c4cbb01abbb0bf)), closes [#18](https://github.com/brammitch/recharts-to-png/issues/18)

### [0.8.0](https://github.com/brammitch/recharts-to-png/compare/v0.7.0...v0.8.0) (2020-12-15)

### Bug Fixes

- **lib:** :label: added `useRechartToPng` hook for compatibility with React 17 ([8158f16](https://github.com/brammitch/recharts-to-png/commit/5e08c261c18f13c31914797d9a512b43eba4ea1f)), closes [#6](https://github.com/brammitch/recharts-to-png/issues/6)
