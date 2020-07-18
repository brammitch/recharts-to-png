import {
  AreaChart,
  PieChart,
  RadarChart,
  ScatterChart,
  BarChart,
  ComposedChart,
  LineChart,
  RadialBarChart,
  Treemap,
} from 'recharts';
import ReactDOM from 'react-dom';

export type RechartChart =
  | AreaChart
  | BarChart
  | ComposedChart
  | LineChart
  | PieChart
  | RadarChart
  | RadialBarChart
  | ScatterChart
  | Treemap;

function svgToPng(svg: Node, width: number, height: number): Promise<string> {
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

export async function getPngData(chart: RechartChart, height: number, width: number) {
  const chartSVG = (ReactDOM.findDOMNode(chart) as Element)?.children?.[0];

  return await svgToPng(chartSVG, width, height);
}
