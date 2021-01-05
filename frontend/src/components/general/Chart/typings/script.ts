import { Params, ChartStyle } from "./chart";

export type CalculateOptions = {
    data: [Date, number, number, number, number, number][]; // Time, Open, High, Low, Close, Volume
    params: Params;
}

/** Data format acceptable by DyGraphs */
export type DyData = [Date, ...number[]][]

export type CalculateReturn = {
    data: DyData;
    labels: string[]; // e.g. ["Open", "High", "Low", "Close"]. do NOT include Date (this is added automatically)
    style: ChartStyle;
    colors: string[];
}


export type CalculateFunction = (options: CalculateOptions) => CalculateReturn;
