import html2canvas from 'html2canvas';
import ReactDOM from 'react-dom';
import {
  AreaChart,
  BarChart,
  ComposedChart,
  LineChart,
  PieChart,
  RadarChart,
  RadialBarChart,
  ScatterChart,
  Treemap,
} from 'recharts';

export type RechartsChart =
  | AreaChart
  | BarChart
  | ComposedChart
  | LineChart
  | PieChart
  | RadarChart
  | RadialBarChart
  | ScatterChart
  | Treemap;

/**
 * Returns a PNG URL string
 * @param instance - The Rechart component to generate the PNG for
 */
export async function getPngData(
  instance: Element | React.Component | RechartsChart,
  options?: Html2Canvas.Html2CanvasOptions
): Promise<string> {
  const element = ReactDOM.findDOMNode(instance) as HTMLElement;

  const pngData = await html2canvas(element, options).then((canvas) =>
    canvas.toDataURL('image/png', 1.0)
  );

  return pngData;
}
