/// <reference types="react" />
/// <reference types="html2canvas" />
import { AreaChart, BarChart, ComposedChart, LineChart, PieChart, RadarChart, RadialBarChart, ScatterChart, Treemap } from 'recharts';
export declare type RechartsChart = AreaChart | BarChart | ComposedChart | LineChart | PieChart | RadarChart | RadialBarChart | ScatterChart | Treemap;
/**
 * @deprecated Not compatible with React 17. Use the useRechartToPng hook instead.
 * Returns a PNG URL string
 * @param instance - The Rechart component to generate the PNG for
 * @param options - Html2Canvas formatting options
 */
export declare function getPngData(instance: Element | React.Component | RechartsChart, options?: Html2CanvasOptions): Promise<string>;
/**
 * Returns a PNG URL string
 * @param options - Html2Canvas formatting options
 */
export declare function useRechartToPng(options?: Html2CanvasOptions): [string, (node: unknown) => Promise<void>];
