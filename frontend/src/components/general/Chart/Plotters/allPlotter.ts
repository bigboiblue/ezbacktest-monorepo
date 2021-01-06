import DyGraph from "dygraphs";
import { DyEvent } from "../../../../typings/DyGraph";
import { ChartStyles } from "../typings/chart";
import { candlestickPlotter } from "./candlestickPlotter";


type PlotterSettings = {
    indicatorStyles: ChartStyles[];
}


export default function allPlotter(e: DyEvent, settings: PlotterSettings) {
    const indicatorStyles: ChartStyles[] = settings.indicatorStyles;
    let offset = 0;
    for (let i = 0; i < indicatorStyles.length; i++) {
        const styles = indicatorStyles[i];
        for (let key in styles) {
            if (styles[key].type === "candlestick") {
                candlestickPlotter(e, offset, styles[key]);
                offset += 4; // There are 4 values in OHLC
            } else if (styles[key].type === "bar") {
                barPlotter(e, offset, styles[key]);
            } else if (styles[key].type === "line") {
                linePlotter(e, offset, styles[key]);
            }
        }
    }
}


function linePlotter(e: DyEvent, index: number, colors: string[]) {

}

function barPlotter(e: DyEvent, index: number, colors: string[]) {

}
