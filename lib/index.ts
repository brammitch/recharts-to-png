import html2canvas from 'html2canvas';
import React from 'react';
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
  Treemap
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
 * @deprecated Not compatible with React 17. Use the useRechartToPng hook instead.
 * Returns a PNG URL string
 * @param instance - The Rechart component to generate the PNG for
 * @param options - Html2Canvas formatting options
 */
export async function getPngData(
  instance: Element | React.Component | RechartsChart,
  options?: Html2CanvasOptions
): Promise<string> {
  const element = ReactDOM.findDOMNode(instance) as HTMLElement;

  const pngData = await html2canvas(element, options).then((canvas) =>
    canvas.toDataURL('image/png', 1.0)
  );

  return pngData;
}

/**
 * Returns a PNG URL string
 * @param options - Html2Canvas formatting options
 */
export function useRechartToPng(options: Html2CanvasOptions = {}): (string | ((node: any) => Promise<void>) | null)[] {
  const [png, setPng] = React.useState<string | null>(null);

  const ref = React.useCallback(async (node: any) => {
    if (node !== null && node?.container) {
      const data = await html2canvas(node.container as HTMLElement, options).then((canvas) => canvas.toDataURL('image/png', 1.0));
      setPng(data);
    }

  }, [options])

  return [png, ref];
}