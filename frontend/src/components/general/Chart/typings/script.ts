import { Params, ChartStyles } from "./chart";

export type CalculateOptions = {
    data: [Date, number, number, number, number, number][]; // Time, Open, High, Low, Close, Volume
    params: Params;
}

/** Data format acceptable by DyGraphs */
export type DyData = [Date, ...number[]][]

export type CalculateReturn = {
    data: DyData;
    styles: ChartStyles;
}


export type CalculateFunction = (options: CalculateOptions) => CalculateReturn;
