import DyGraph from "dygraphs";
import { DyEvent } from "../../../../typings/DyGraph";
import { candlestickPlotter } from "./candlestickPlotter";


type PlotterSettings = {
    indicatorStyles: string[];
    indicatorColors: string[][];
}


export default function allPlotter(e: DyEvent, settings: PlotterSettings) {
    const { indicatorStyles, indicatorColors } = settings;
    for (let i = 0, j = 0; i < indicatorStyles.length; i++, j++) {
        const style = indicatorStyles[i];
        const colors = indicatorColors[i];
        if (style === "candlestick") {
            candlestickPlotter(e, j, colors);
            j += 3; // There are 4 values in OHLC
        } else if (style === "bar") barPlotter(e, j, colors);
        else if (style === "line") linePlotter(e, j, colors);
    }
}


function linePlotter(e: DyEvent, index: number, colors: string[]) {

}

function barPlotter(e: DyEvent, index: number, colors: string[]) {

}
