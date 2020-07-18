import { AreaChart, PieChart, RadarChart, ScatterChart, BarChart, ComposedChart, LineChart, RadialBarChart, Treemap } from 'recharts';
export declare type RechartChart = AreaChart | BarChart | ComposedChart | LineChart | PieChart | RadarChart | RadialBarChart | ScatterChart | Treemap;
export declare function getPngData(chart: RechartChart, height: number, width: number): Promise<string>;
