import DyGraph from "dygraphs";
import { DyEvent } from "../../../../typings/DyGraph";

// offset: the start index of OHLC data in e.allSeriesPoints (inclusive)
function candlestickPlotter(e: DyEvent, offset: number, colors: string[]) {
    let setCount = e.seriesCount;
    if (setCount !== 4) throw Error("Exactly 4 prices (open high low close) and 1 volume for each point must be provided for candle chart ");
    if (e.seriesIndex !== 0) return; // Only draw once (miss index 1-3)

    let sets = e.allSeriesPoints;
    if (sets[0].length < 2) return; // Need 2 bars to calc bar width

    // TODO: Fix bar issues 100% of the time (this technique doesn't always work...)
    let barWidth = (4 / 6) * (sets[0][1].canvasx - sets[0][0].canvasx);
    let secondBarWidth = (4 / 6) * (sets[0][2].canvasx - sets[0][1].canvasx);
    if (secondBarWidth < barWidth) barWidth = secondBarWidth; // Fixes sizing issues on weekend gaps

    let area = e.plotArea;
    let ctx = e.drawingContext;

    ctx.lineWidth = 0.6;


    const OPEN = 0 + offset;
    const HIGH = 1 + offset;
    const LOW = 2 + offset;
    const CLOSE = 3 + offset;
    const upColor = colors[0];
    const upBorder = colors[1];
    const downColor = colors[2];
    const downBorder = colors[3];
    const dojiColor = colors[4];
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

        if (sets[OPEN][i].yval > sets[CLOSE][i].yval) { // Downbar
            fillColor = downColor;
            ctx.strokeStyle = downBorder;
            borderColor = downBorder;
            barY = sets[OPEN][i].canvasy;
        } else if (sets[OPEN][i].yval < sets[CLOSE][i].yval) { // Upbar
            fillColor = upColor;
            ctx.strokeStyle = upBorder;
            borderColor = upBorder;
            barY = sets[CLOSE][i].canvasy;
        } else { // OPEN and CLOSE are the same
            fillColor = dojiColor;
            borderColor = dojiColor;
            barY = sets[CLOSE][i].canvasy;
            bodyHeight = 1;
        }
        ctx.fillStyle = borderColor;
        ctx.fillRect(barX - 0.6, barY - 0.6, barWidth + 1.2, bodyHeight + 1.2);
        ctx.fillStyle = fillColor;
        ctx.fillRect(barX, barY, barWidth, bodyHeight);
    }
}

export { candlestickPlotter };
