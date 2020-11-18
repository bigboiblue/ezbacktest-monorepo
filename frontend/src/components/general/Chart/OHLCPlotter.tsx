import DyGraph from "dygraphs";
import { DyEvent } from "../../../typings/DyGraph";

// Indexes for OHLC
const OPEN = 0;
const HIGH = 1;
const LOW = 2;
const CLOSE = 3;
const VOLUME = 4;


function OHLCPlotter(e: DyEvent, x, y) { //TODO: use x and y as args for other things in chart
    let setCount = e.seriesCount;
    if (setCount !== 4) throw Error("Exactly 4 prices (open high low close) and 1 volume for each point must be provided for candle chart ");

    //////// TODO: THE BELOW IF STATEMENT TRIGGERS... WHYYYY or does it idk

    if (e.seriesIndex !== 0) return; // Only draw once (miss index 1-3)

    let sets = e.allSeriesPoints;
    if (sets[0].length < 2) return; // Need 2 bars to calc bar width

    let barWidth = (4 / 6) * (sets[0][1].canvasx - sets[0][0].canvasx);
    let secondBarWidth = (4 / 6) * (sets[0][2].canvasx - sets[0][1].canvasx);
    if (secondBarWidth < barWidth) barWidth = secondBarWidth; // Fixes sizing issues on weekend gaps

    let area = e.plotArea;
    let ctx = e.drawingContext;
    ctx.strokeStyle = "#202020";
    ctx.lineWidth = 0.6;


    for (let i = 0; i < sets[0].length; i++) {
        ctx.beginPath();
        ctx.moveTo(sets[HIGH][i].canvasx, sets[HIGH][i].canvasy);
        ctx.lineTo(sets[LOW][i].canvasx, sets[LOW][i].canvasy);
        ctx.closePath();
        ctx.stroke();
        const barX = sets[HIGH][i].canvasx - (barWidth / 2);
        let barY;
        let bodyHeight = area.h * Math.abs(sets[OPEN][i].y - sets[CLOSE][i].y);
        let fillColor;
        let borderColor;
        borderColor = "#000000";
        if (sets[OPEN][i].yval > sets[CLOSE][i].yval) {
            fillColor = "#f75c5c";
            barY = sets[OPEN][i].canvasy;
        } else if (sets[OPEN][i].yval < sets[CLOSE][i].yval) {
            fillColor = "#3ccf5e";
            barY = sets[CLOSE][i].canvasy;
        } else { // OPEN and CLOSE are the same
            fillColor = "#202020";
            barY = sets[CLOSE][i].canvasy;
            bodyHeight = 1;
        }
        ctx.fillStyle = borderColor;
        ctx.fillRect(barX - 0.6, barY - 0.6, barWidth + 1.2, bodyHeight + 1.2);
        ctx.fillStyle = fillColor;
        ctx.fillRect(barX, barY, barWidth, bodyHeight);
    }
}

export { OHLCPlotter };
