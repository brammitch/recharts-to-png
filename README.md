[![npm](https://img.shields.io/npm/v/recharts-to-png)](https://www.npmjs.com/package/recharts-to-png)
[![Node.js CI](https://github.com/brammitch/recharts-to-png/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/brammitch/recharts-to-png/actions/workflows/node.js.yml)
[![CodeQL](https://github.com/brammitch/recharts-to-png/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/brammitch/recharts-to-png/actions/workflows/github-code-scanning/codeql)
[![Netlify Status](https://api.netlify.com/api/v1/badges/35b3343e-3abe-4c8b-bd68-e74e2e043a3d/deploy-status)](https://app.netlify.com/sites/recharts-to-png/deploys)
[![GitHub](https://img.shields.io/github/license/brammitch/recharts-to-png)](LICENSE)

# recharts-to-png

A wrapper around [html2canvas](https://github.com/niklasvh/html2canvas) that converts any HTML element to an image with the `useGenerateImage` hook. Despite the package name, the hook is universal: nothing about it is specific to Recharts.

The original Recharts-specific APIs, `useCurrentPng` and `CurrentPng`, are still supported — see [RECHARTS.md](RECHARTS.md).

## Install

```
npm install recharts-to-png
```

## Usage

### useGenerateImage

`useGenerateImage` is a React hook that returns a tuple. The first element is an async function that resolves to the image as a data URL string, or to `undefined` if the ref was never attached. The second element is an object with two properties: `ref`, which must be attached to the target HTML element, and `isLoading`, which is `true` while the image is being generated.

Every argument is optional:

```ts
export type UseGenerateImageArgs = {
  options?: HTML2CanvasOptions;
  quality?: number;
  type?: string;
};
```

`options` is passed to html2canvas. `type` and `quality` are passed to `canvas.toDataURL()`; `type` defaults to `image/png`, and `quality` only applies to formats that support it, such as `image/jpeg`.

```tsx
// Implement useGenerateImage to get an image from any HTML element
const [getDivJpeg, { ref }] = useGenerateImage<HTMLDivElement>({
  quality: 0.8,
  type: 'image/jpeg',
});

const handleDivDownload = useCallback(async () => {
  const jpeg = await getDivJpeg();
  if (jpeg) {
    FileSaver.saveAs(jpeg, 'div-element.jpeg');
  }
}, [getDivJpeg]);

return <div ref={ref}>{/* content goes here */}</div>;
```

### Passing a callback to `canvas.toBlob()`

In addition to resolving to a string, the returned function accepts an optional callback that is passed to `canvas.toBlob()`, allowing you to add your own custom logic.

```ts
export type UseGenerateImage<T extends HTMLElement = HTMLDivElement> = [
  (callback?: BlobCallback) => Promise<string | undefined>,
  {
    isLoading: boolean;
    ref: React.MutableRefObject<T | null>;
  },
];
```

Here's an example using the callback to copy the image to the clipboard:

```tsx
const [getDivPng, { ref }] = useGenerateImage<HTMLDivElement>({
  type: 'image/png',
});

const handleDivCopyToClipboard = useCallback(async () => {
  // Pass in optional callback for canvas.toBlob
  await getDivPng((blob) => {
    blob &&
      navigator.clipboard.write([
        new ClipboardItem({
          // The key is determined dynamically based on the blob's type.
          [blob.type]: blob,
        }),
      ]);
  });
}, [getDivPng]);

return <div ref={ref}>{/* content goes here */}</div>;
```

## Recharts support

This library was originally written specifically to transform [Recharts](https://github.com/recharts/recharts) charts to PNG, via `useCurrentPng` and `CurrentPng`.

Version 3 of Recharts included several breaking changes which affected compatibility with this library. If you're planning to use either `useCurrentPng` or `CurrentPng` directly with `recharts`, make sure to use the specified versions together:

| `recharts-to-png` |   `recharts` v2    |   `recharts` v3    |
| :---------------: | :----------------: | :----------------: |
|        2.X        | :white_check_mark: |        :x:         |
|        3.X        |        :x:         | :white_check_mark: |

_TL;DR: use v2 with v2, and v3 with v3_

See [RECHARTS.md](RECHARTS.md) for `useCurrentPng` and `CurrentPng` implementation details.

For usage with class components, implement the `CurrentPng` component with render props.

[![Edit reacharts-to-png-class-render-props](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/reacharts-to-png-class-render-props-vk4jbl)

## Demo

See the demo [here](https://recharts-to-png.netlify.app/).

It implements `useGenerateImage` on a plain `<div>` and `useCurrentPng` on several chart types, saving the results with [file-saver](https://www.npmjs.com/package/file-saver).

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/brammitch/recharts-to-png-demo?file=src%2FApp.tsx)

## Acknowledgments

`recharts-to-png` was inspired by these Stack Overflow questions and answers from [peter.bartos](https://stackoverflow.com/questions/45086005/recharts-component-to-png/56223127?noredirect=1#comment100914961_56223127) and [AlbertMunichMar](https://stackoverflow.com/questions/57206626/download-chart-as-png-format-in-react-without-overwriting-the-dom).

Special thanks to [HarmNullix](https://github.com/brammitch/recharts-to-png/issues/160#issuecomment-852812993) for helping to improve the performance of this library.

## Contributing/Developing

1. Fork/clone the repository
   - [How to contribute to a project on Github](https://gist.github.com/MarcDiethelm/7303312)

2. Install dependencies

   ```
   npm i
   ```

3. Build recharts-to-png in watch mode

   ```
   npm run watch
   ```

4. Start the demo to observe your changes

   ```
   npm run demo
   ```

5. Ensure all tests pass

   ```
   npm run test
   ```

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) and require
a scope of `lib`, `deps`, `release`, or `other` (e.g. `fix(lib): ...`). Git hooks format staged
files on commit and run the tests on push.

Maintainers: see [MAINTAINING.md](MAINTAINING.md) for the release process and CI details.
