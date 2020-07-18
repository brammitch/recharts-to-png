import { AreaChart, BarChart, ComposedChart, LineChart, PieChart, RadarChart, RadialBarChart, ScatterChart, Treemap } from 'recharts';
export declare type RechartsChart = AreaChart | BarChart | ComposedChart | LineChart | PieChart | RadarChart | RadialBarChart | ScatterChart | Treemap;
export declare function getPngData(chart: RechartsChart, height: number, width: number): Promise<string>;
