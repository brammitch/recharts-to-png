[![npm](https://img.shields.io/npm/v/recharts-to-png)](https://www.npmjs.com/package/recharts-to-png)
[![GitHub](https://img.shields.io/github/license/brammitch/recharts-to-png)](LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/d38eafee-d90e-4696-9186-93d65ce38d61/deploy-status)](https://app.netlify.com/sites/csb-dyy8q/deploys)

# recharts-to-png

Converts a [Recharts](<[https://github.com/recharts/recharts](https://github.com/recharts/recharts)>) chart to PNG.

Inspired by these Stack Overflow questions and answers from [peter.bartos](https://stackoverflow.com/questions/45086005/recharts-component-to-png/56223127?noredirect=1#comment100914961_56223127) and [AlbertMunichMar](https://stackoverflow.com/questions/57206626/download-chart-as-png-format-in-react-without-overwriting-the-dom).

### Example

See an [example](https://csb-dyy8q.netlify.app/) of using recharts-to-png with [FileSaver](https://www.npmjs.com/package/file-saver).

### Install

```
npm i -S recharts-to-png
```

### Usage

```
import { getPngData } from 'recharts-to-png';

const pngData = await getPngData(chart, height, width);
```
