[![npm](https://img.shields.io/npm/v/recharts-to-png)](https://www.npmjs.com/package/recharts-to-png)
[![Build Status](https://travis-ci.com/brammitch/recharts-to-png.svg?branch=master)](https://app.travis-ci.com/github/brammitch/recharts-to-png)
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

For usage with class components, see an implementation of the _CurrentPng_ component with render props [here](https://codesandbox.io/s/reacharts-to-png-class-render-props-vk4jbl?file=/src/RenderPropsExample.tsx:461-476).

## Usage

### useCurrentPng

`useCurrentPng` is a React hook that returns a tuple. The first parameter is a promise that will return a string if the PNG is valid. The second parameter is an object with two properties: `ref`, which is required to be attached to the target Recharts component, and `isLoading`, which is optional and changes state from false to true while the PNG is being generated and downloaded.

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

Implements the same functionality as useCurrentPng but as a class component using render props.

```jsx
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
   npm run demo
   ```

1. Ensure all tests pass

   ```
   npm run test
   ```
