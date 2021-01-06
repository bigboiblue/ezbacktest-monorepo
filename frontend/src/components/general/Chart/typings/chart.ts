export type ChartSettings = {
    user_id: number;
    name: string;
    current: boolean;
    symbol: string;
    period: string;
    date_start: Date;
    date_end: Date;
    sectors: Sector[];
    theming?: Theming;
}

export type Sector = {
    position: number;
    size: number;
    indicators: Indicator[];
    theming?: Theming;
    symbol?: string;
    drawings: Drawing[];
}

export type Drawing = {
    type: string;
    location: number[];
    z_index: number;
    [field: string]: any;
}

export type Theming = {
    bg_color?: string;
    font_color?: string;
    axis_line_color?: string;
    axis_bg_color?: string;
    x_axis_margin?: number;
    y_axis_margin?: number;
    grid_enabled?: boolean;
    grid_color?: string;
}

export type Indicator = {
    name: string; // Indicator name
    user_id: string; // User ID it belongs to
    private: boolean; // Is the indicator public or private?
    params?: Params;
    z_index: number;
}

export type ChartType = "candlestick" | "bar" | "histogram" | "line" | "area";

export type ChartStyle = {
    type: ChartType;
    color?: string;
    upColor?: string;
    upBorder?: string;
    downColor?: string;
    downBorder?: string;
    dojiColor?: string;
}

export type ChartStyles = {
    [field: string]: ChartStyle;
};

export type Params = {
    styles: ChartStyles;
    [field: string]: any;
}


export type Data = {
    dates: Date[];
    opens: number[];
    closes: number[];
    highs: number[];
    lows: number[];
    volumes: number[];
}


// const wot: Chart = {
//     user_id: 1,
//     name: "default",
//     current: true,
//     symbol: "EURUSD",
//     period: "1D",
//     date_start: new Date(),
//     date_end: new Date(),
//     theming: {
//         bg_color: "#cccccc",
//         font_color: "#000000",
//         axis_line_color: "#ffffff",
//         axis_bg_color: "#cccccc",
//         x_axis_margin: 10,
//         y_axis_margin: 10,
//         grid_enabled: true,
//         grid_color: "#666666",
//     },
//     sectors: [{
//         position: 1,
//         size: 1.0,
//         indicators: [{
//             name: "raw",
//             params: {
//                 style: "candlestick", upColor: "#3ccf5e", downColor: "#f75c5c", lineColor: "#202020",
//             },
//             z_index: 1,
//         }],
//         theming: {},
//         drawings: [{
//             type: "square",
//             location: [0, 0],
//             height: 10,
//             bg_color: "#0000ff",
//             line_color: "#000000",
//             width: 10,
//             z_index: 1,
//         }],
//     }],
// };
