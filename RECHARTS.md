# Recharts hooks and components

`useCurrentPng` and `CurrentPng` are the original, Recharts-specific APIs of `recharts-to-png`. They always produce a PNG and expect a Recharts component. To capture any other HTML element — or a chart from any other library — use the universal `useGenerateImage` hook documented in the [README](README.md).

Your `recharts-to-png` and `recharts` major versions must match; see the compatibility table under [Recharts support](README.md#recharts-support).

## useCurrentPng

`useCurrentPng` is a React hook that returns a tuple. The first element is an async function that resolves to the PNG as a data URL string, or to `undefined` if the ref was never attached. The second element is an object with two properties: `ref`, which must be attached to the target Recharts component, and `isLoading`, which is `true` while the PNG is being generated.

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
      <br />
      <button onClick={handleDownload}>{isLoading ? 'Downloading...' : 'Download Chart'}</button>
    </>
  );
}
```

## CurrentPng

Per user request, `CurrentPng` implements the same functionality as `useCurrentPng` but as a class component using render props. See background in [this issue](https://github.com/brammitch/recharts-to-png/issues/445).

```tsx
// index.tsx
createRoot(rootElement).render(
  <CurrentPng>{(props) => <RenderPropsExample {...props} />}</CurrentPng>
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
