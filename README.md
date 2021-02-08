[![npm](https://img.shields.io/npm/v/recharts-to-png)](https://www.npmjs.com/package/recharts-to-png)
[![Build Status](https://travis-ci.com/brammitch/recharts-to-png.svg?branch=master)](https://travis-ci.com/brammitch/recharts-to-png)
[![GitHub](https://img.shields.io/github/license/brammitch/recharts-to-png)](LICENSE)

# recharts-to-png

Made for Recharts 1. Compatibility with Recharts 2 not yet verified. See [#64](https://github.com/brammitch/recharts-to-png/issues/64#issue-803586805) for more information.

Uses [html2canvas](https://github.com/niklasvh/html2canvas) to convert a [Recharts](https://github.com/recharts/recharts) chart to PNG.

Inspired by these Stack Overflow questions and answers from [peter.bartos](https://stackoverflow.com/questions/45086005/recharts-component-to-png/56223127?noredirect=1#comment100914961_56223127) and [AlbertMunichMar](https://stackoverflow.com/questions/57206626/download-chart-as-png-format-in-react-without-overwriting-the-dom).

## Install

```
npm install recharts-to-png
```

## Hook

The recommended way of using `recharts-to-png`. It is compatible with React 16.8+, does not rely on `findDOMNode`, and is required for React 17:

```javascript
import { useRechartToPng } from "recharts-to-png";

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

# Deprecated

The original `getPngData` function this library offered does not work with React 17 (see [#6](https://github.com/brammitch/recharts-to-png/issues/6)). This section is still included for backwards compatibility, but will probably be removed at some point along with `getPngData`.

#### Demo

See a [demo](https://csb-dyy8q.netlify.app/) using recharts-to-png alongside [FileSaver](https://www.npmjs.com/package/file-saver).

#### Usage

```javascript
// chart: Element | React.Component | AreaChart | BarChart | PieChart | etc.
await getPngData(chart);
```

Allows all [html2canvas configuration options](https://html2canvas.hertzen.com/configuration) to be passed:

```javascript
await getPngData(chart, options);
```

#### Example

```javascript
function App() {
  // The chart that we want to download the PNG for.
  const [chart, setChart] = React.useState();

  const handleDownload = React.useCallback(async () => {
    if (chart !== undefined) {
      // Send the chart to getPngData
      const pngData = await getPngData(chart);
      // Use FileSaver to download the PNG
      FileSaver.saveAs(pngData, 'test.png');
    }
  }, [chart]);

  const data = [...];

  return (
    <>
      <LineChart
        ref={(ref) => setChart(ref)} // Set target element
        data={data}
        height={300}
        width={600}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend wrapperStyle={{ bottom: 0 }} />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      <span style={{ float: 'left' }}>
        <button onClick={handleDownload}>Download</button>
      </span>
    </>
  );
}
```
