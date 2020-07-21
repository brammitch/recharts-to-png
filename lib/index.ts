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
 * @param fill The fill (background) color
 */
function svgToPng(
  svg: SVGSVGElement,
  fill: string | CanvasGradient | CanvasPattern
): Promise<string> {
  const height = svg.height.baseVal.value;
  const width = svg.width.baseVal.value;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = fill;
      ctx.fillRect(0, 0, width, height);

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
 * @param fill - The fill (background) color - optional; defaults to white
 */
export async function getPngData(
  chart: RechartsChart,
  fill: string | CanvasGradient | CanvasPattern = '#ffffff'
): Promise<string> {
  const chartSVG = (ReactDOM.findDOMNode(chart) as Element)?.children?.[0] as SVGSVGElement;

  return await svgToPng(chartSVG, fill);
}
