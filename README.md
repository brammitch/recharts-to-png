[![npm](https://img.shields.io/npm/v/recharts-to-png)](https://www.npmjs.com/package/recharts-to-png)
[![Build Status](https://travis-ci.com/brammitch/recharts-to-png.svg?branch=master)](https://travis-ci.com/brammitch/recharts-to-png)
[![GitHub](https://img.shields.io/github/license/brammitch/recharts-to-png)](LICENSE)

# recharts-to-png

Uses [html2canvas](https://github.com/niklasvh/html2canvas) to convert a [Recharts](https://github.com/recharts/recharts) chart to PNG.

Inspired by these Stack Overflow questions and answers from [peter.bartos](https://stackoverflow.com/questions/45086005/recharts-component-to-png/56223127?noredirect=1#comment100914961_56223127) and [AlbertMunichMar](https://stackoverflow.com/questions/57206626/download-chart-as-png-format-in-react-without-overwriting-the-dom).

## Install

```
npm install recharts-to-png
```

## Demo

See a [demo](https://csb-dyy8q.netlify.app/) using recharts-to-png alongside [file-saver](https://www.npmjs.com/package/file-saver).

## Usage

Compatible with React ^16.8.0:

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
