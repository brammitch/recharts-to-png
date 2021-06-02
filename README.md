[![npm](https://img.shields.io/npm/v/recharts-to-png)](https://www.npmjs.com/package/recharts-to-png)
[![Build Status](https://travis-ci.com/brammitch/recharts-to-png.svg?branch=master)](https://travis-ci.com/brammitch/recharts-to-png)
[![GitHub](https://img.shields.io/github/license/brammitch/recharts-to-png)](LICENSE)

# recharts-to-png

Uses [html2canvas](https://github.com/niklasvh/html2canvas) to convert a [Recharts](https://github.com/recharts/recharts) chart to PNG.

Inspired by these Stack Overflow questions and answers from [peter.bartos](https://stackoverflow.com/questions/45086005/recharts-component-to-png/56223127?noredirect=1#comment100914961_56223127) and [AlbertMunichMar](https://stackoverflow.com/questions/57206626/download-chart-as-png-format-in-react-without-overwriting-the-dom). Special thanks to [HarmNullix](https://github.com/brammitch/recharts-to-png/issues/160#issuecomment-852812993) for helping to improve the performance of this library.

## Install

```
npm install recharts-to-png
```

## Demo

See the demo [here](https://csb-dyy8q.netlify.app/). It implements _useCurrentPng_ with different chart types and [file-saver](https://www.npmjs.com/package/file-saver).

Source:

[![Edit recharts-to-png](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/recharts-to-png-dyy8q?fontsize=14&hidenavigation=1&theme=dark)

## Usage

Compatible with React ^16.8.0:

### useCurrentPng

`useCurrentPng` is a React hook that returns a tuple. The first parameter is a promise that will return a string if the PNG is valid. The second parameter is an object with two properties: `ref`, which is required to be attached to the target Recharts component, and `isLoading`, which is optional and changes state from false to true while the PNG is being generated and downloaded.

```javascript
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

### useRechartToPng

This function has been deprecated and is no longer recommended for use due to poor performance.

```javascript
function MyComponent() {
  // Attach ref to a Recharts component, and the png will be returned
  // Also accepts an optional argument for Html2Canvas options: useRechartToPng(options)
  const [png, ref] = useRechartToPng();

  const handleDownload = React.useCallback(async () => {
    FileSaver.saveAs(png, "myChart.png");
  }, [png]);

  return (
    <LineChart ref={ref} ... />
  )
}
```
