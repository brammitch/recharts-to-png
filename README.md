[![npm](https://img.shields.io/npm/v/recharts-to-png)](https://www.npmjs.com/package/recharts-to-png)
[![Build Status](https://travis-ci.com/brammitch/recharts-to-png.svg?branch=master)](https://app.travis-ci.com/github/brammitch/recharts-to-png)
[![Netlify Status](https://api.netlify.com/api/v1/badges/35b3343e-3abe-4c8b-bd68-e74e2e043a3d/deploy-status)](https://app.netlify.com/sites/recharts-to-png/deploys)
[![GitHub](https://img.shields.io/github/license/brammitch/recharts-to-png)](LICENSE)

# recharts-to-png

A wrapper around [html2canvas](https://github.com/niklasvh/html2canvas) that will convert any element to an image with the `useGenerateImage` hook.

Originally written specifically to transform [Recharts](https://github.com/recharts/recharts) charts to PNG.

Inspired by these Stack Overflow questions and answers from [peter.bartos](https://stackoverflow.com/questions/45086005/recharts-component-to-png/56223127?noredirect=1#comment100914961_56223127) and [AlbertMunichMar](https://stackoverflow.com/questions/57206626/download-chart-as-png-format-in-react-without-overwriting-the-dom). Special thanks to [HarmNullix](https://github.com/brammitch/recharts-to-png/issues/160#issuecomment-852812993) for helping to improve the performance of this library.

## Install

```
npm install recharts-to-png
```

## Demo

### Hooks

See the demo [here](https://recharts-to-png.netlify.app/).

It implements `useGenerateImage` and `useCurrentPng` with different chart types and [file-saver](https://www.npmjs.com/package/file-saver).

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/brammitch/recharts-to-png-demo?file=src%2FApp.tsx)

### Class Components

For usage with clas components, implement `CurrentPng` component with render props.

[![Edit reacharts-to-png-class-render-props](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/reacharts-to-png-class-render-props-vk4jbl)

## Usage

### useGenerateImage

`useGenerateImage` is a React hook that returns a tuple. The first parameter is a promise that will return a string if the image is valid. The second parameter is an object with two properties: `ref`, which is required to be attached to the target HTML element, and `isLoading`, which is optional and changes state from false to true while the image is being generated.

You can pass arguments to `useGenerateImage`:

```ts
options?: HTML2CanvasOptions;
quality?: number;
type?: string;
```

```tsx
// Implement useGenerateImage to get an image of any element (not just a Recharts component)
const [getDivJpeg, { ref }] = useGenerateImage<HTMLDivElement>({
  quality: 0.8,
  type: 'image/jpeg',
});

const handleDivDownload = useCallback(async () => {
  const jpeg = await getDivJpeg();
  if (jpeg) {
    FileSaver.saveAs(jpeg, 'div-element.jpeg');
  }
}, []);

return <div ref={ref}>{/* content goes here */}</div>;
```

### useCurrentPng

`useCurrentPng` is a React hook that returns a tuple. The first parameter is a promise that will return a string if the PNG is valid. The second parameter is an object with two properties: `ref`, which is required to be attached to the target Recharts component, and `isLoading`, which is optional and changes state from false to true while the PNG is being generated.

```jsx
function MyApp(props) {
  // useCurrentPng usage (isLoading is optional)
  const [getPng, { ref, isLoading }] = useCurrentPng();

  // Can also pass in options for html2canvas
  // const [getPng, { ref }] = useCurrentPng({ backgroundColor: '#000' });

  const handleDownload = useCallback(async () => {
    const png = await getPng();

    // Verify that png is not undefined
    if (png) {
      // Download with FileSaver
      FileSaver.saveAs(png, 'myChart.png');
    }
  }, [getPng]);

  return (
    <>
      <ComposedChart data={props.data} ref={ref}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        <Brush dataKey="name" height={30} stroke="#8884d8" />
      </ComposedChart>
      <br/>
      <button onClick={handleDownload}>
        {isLoading ? 'Downloading...' : 'Download Chart'}
      </button>
    </>
  );

```

### CurrentPng

Per user request, `CurrentPng` implements the same functionality as useCurrentPng but as a class component using render props. See background in [this issue](https://github.com/brammitch/recharts-to-png/issues/445).

```tsx
// index.tsx
ReactDOM.render(
  <CurrentPng>{(props) => <RenderPropsExample {...props} />}</CurrentPng>,
  rootElement
);

// RenderPropsExample.tsx
export default class RenderPropsExample extends React.Component<CurrentPngProps, State> {
  state: State = {
    chartData: [],
  };

  componentDidMount() {
    this.setState({
      chartData: getData(100),
    });
  }

  handleDownload = async () => {
    const png = await this.props.getPng();

    if (png) {
      FileSaver.saveAs(png, 'chart.png');
    }
  };

  render() {
    return (
      <>
        <h4>
          <code>Example: Download chart with React.Component Render Props </code>
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={this.state.chartData} ref={this.props.chartRef}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            <Brush dataKey="name" height={30} stroke="#8884d8" />
          </ComposedChart>
        </ResponsiveContainer>
        <br />
        <button disabled={this.props.isLoading} onClick={() => this.handleDownload()}>
          {this.props.isLoading ? (
            <span className="download-button-content">
              <i className="gg-spinner" />
              <span className="download-button-text">
                <code>Downloading...</code>
              </span>
            </span>
          ) : (
            <span className="download-button-content">
              <i className="gg-software-download" />
              <span className="download-button-text">
                <code>Download Chart</code>
              </span>
            </span>
          )}
        </button>
      </>
    );
  }
}
```

## Contributing/Developing

1. Fork/clone the repository
   - [How to contribute to a project on Github](https://gist.github.com/MarcDiethelm/7303312)
1. Install dependencies

   ```
   npm i
   ```

1. Build recharts-to-png in watch mode

   ```
   npm run watch
   ```

1. Start the demo to observe your changes

   ```
   npm run demo:app
   ```

1. Ensure all tests pass

   ```
   npm run test
   ```
