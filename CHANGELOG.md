# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.1.1](https://github.com/brammitch/recharts-to-png/compare/v1.1.0...v1.1.1) (2021-07-14)

- **deps:** Upgrade html2Canvas to v1; remove @types/html2Canvas

## [1.1.0](https://github.com/brammitch/recharts-to-png/compare/v1.0.1...v1.1.0) (2021-06-02)

### Release

- Add _useCurrentPng_ hook; see [PR #181](https://github.com/brammitch/recharts-to-png/pull/181)

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

- **deps:** Move _react_ and _react-dom_ to peerDependencies

### [0.8.1-0](https://github.com/brammitch/recharts-to-png/compare/v0.8.0...v0.8.1-0) (2020-12-15)

### Bug Fixes

- **lib:** :label: fix types ([2354a6e](https://github.com/brammitch/recharts-to-png/commit/2354a6e32174f1ca19361a8225c4cbb01abbb0bf)), closes [#18](https://github.com/brammitch/recharts-to-png/issues/18)

### [0.8.0](https://github.com/brammitch/recharts-to-png/compare/v0.7.0...v0.8.0) (2020-12-15)

### Bug Fixes

- **lib:** :label: added useRechartToPng hook for compatibility with React 17 ([8158f16](https://github.com/brammitch/recharts-to-png/commit/5e08c261c18f13c31914797d9a512b43eba4ea1f)), closes [#6](https://github.com/brammitch/recharts-to-png/issues/6)
