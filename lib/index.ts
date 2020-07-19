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
 * Converts a SVG element to a PNG URL string
 * @param svg The SVG from a Recharts chart
 */
function svgToPng(svg: SVGSVGElement): Promise<string> {
  const height = svg.height.baseVal.value;
  const width = svg.width.baseVal.value;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const xml = new XMLSerializer().serializeToString(svg);
      const dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(xml);
      const img = new Image(width, height);

      img.src = dataUrl;

      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const imageData = canvas.toDataURL('image/png', 1.0);
        // console.log(imageData);
        resolve(imageData);
      };

      img.onerror = () => reject();
    } else {
      reject();
    }
  });
}

/**
 * Returns a PNG URL string
 * @param chart - The Rechart chart to generate the PNG for
 */
export async function getPngData(chart: RechartsChart): Promise<string> {
  const chartSVG = (ReactDOM.findDOMNode(chart) as Element)?.children?.[0] as SVGSVGElement;

  return await svgToPng(chartSVG);
}
