import Dygraph from "dygraphs";
import { X_AXIS_WIDTH, Y_AXIS_WIDTH } from "./default_values.js";

let xAxisWidth = X_AXIS_WIDTH;
let yAxisWidth = Y_AXIS_WIDTH;

let isClickingX = false;
let isClickingY = false;


window.addEventListener("mouseup", () => {
    isClickingX = false;
    isClickingY = false;
});

export function mouseDown(event: MouseEvent, graph: Dygraph, context: CanvasRenderingContext2D) {
    context.initializeMouseDown(event, graph, context);

    // context px is canvas start location on x
    if ((graph.width_ + context.px) - event.x <= yAxisWidth + 10) { // There seems to be 10 pixels of padding for y axis
        console.log("Clicking Y axis!");
        isClickingY = true;
    }
    if ((graph.height_ + context.py) - event.y <= xAxisWidth + 5) { // There seems to be 5 pixels of padding for x axis
        console.log("Clicking X axis!");
        isClickingX = true;
    }

    if (!(isClickingX || isClickingY)) {
        if (event.altKey || event.shiftKey) {
            Dygraph.startZoom(event, graph, context);
        } else {
            Dygraph.startPan(event, graph, context);
        }
    }
}

export function mouseMove(event: MouseEvent, graph: Dygraph, context: CanvasRenderingContext2D) {
    const y2Range = graph.yAxisRanges()[1];
    const dif = y2Range[1] - y2Range[0];
    const scalingSpeed = 0.0025;
    const scaleAmount = (event.movementY * dif * scalingSpeed);
    const newUpperBound = y2Range[0] - scaleAmount;
    const newLowerBound = y2Range[1] + scaleAmount;
    if (isClickingY) {
        graph.updateOptions({
            axes: { y2: { valueRange: [newUpperBound, newLowerBound] }, y: { valueRange: [0, 0] } },
        });
    }

    if ((graph.width_ + context.px) - event.x <= yAxisWidth + 10) { // There seems to be 10 pixels of padding for y axis
        document.body.style.cursor = "ns-resize";
    } else {
        document.body.style.cursor = "default";
    }

    if (context.isPanning) {
        Dygraph.movePan(event, graph, context);
    } else if (context.isZooming) {
        Dygraph.moveZoom(event, graph, context);
    }
}

// Adjusts [x, y] toward each other by zoomInPercentage%
// Split it so the left/bottom axis gets xBias/yBias of that change and
// tight/top gets (1-xBias)/(1-yBias) of that change.
//
// If a bias is missing it splits it down the middle.
function zoom(g, zoomInPercentage, xBias, yBias, xAxisOnly = false) {
    xBias = xBias || 0.5;
    yBias = yBias || 0.5;
    function adjustAxis(axis, zoomInPercentage, bias) {
        let delta = axis[1] - axis[0];
        let increment = delta * zoomInPercentage;
        let foo = [increment * bias, increment * (1 - bias)];
        return [axis[0] + foo[0], axis[1] - foo[1]];
    }
    let yAxes = g.yAxisRanges();
    let newYAxes = [];
    for (let i = 0; i < yAxes.length; i++) {
        newYAxes[i] = adjustAxis(yAxes[i], zoomInPercentage, yBias);
    }

    if (xAxisOnly) {
        const valRangeOption = g.getOption("axes").y2.valueRange;
        const realValRange = g.yAxisRanges()[1];
        const newRange = valRangeOption ? realValRange : null;
        (g as Dygraph).updateOptions({
            dateWindow: adjustAxis(g.xAxisRange(), zoomInPercentage, xBias),
            axes: { y2: { valueRange: newRange } },
        });
    } else {
        (g as Dygraph).updateOptions({
            dateWindow: adjustAxis(g.xAxisRange(), zoomInPercentage, xBias),
            axes: { y2: { valueRange: newYAxes[1] }, y: { valueRange: [0, 0] } },
        }); // y2 is right hand side y scale, y is left. y (aka y1) has been hidden}
    }
}

export function mouseUp(event, g, context) {
    if (context.isPanning) {
        // console.log(event);
        // console.log(g);
        // console.log(context);
        Dygraph.endPan(event, g, context);
    } else if (context.isZooming) {
        Dygraph.endZoom(event, g, context);
    }
}

// Take the offset of a mouse event on the dygraph canvas and
// convert it to a pair of percentages from the bottom left.
// (Not top left, bottom is where the lower value is.)
function offsetToPercentage(g, offsetX, offsetY) {
    // This is calculating the pixel offset of the leftmost date.
    let xOffset = g.toDomCoords(g.xAxisRange()[0], null)[0];
    let yar0 = g.yAxisRange(0);

    // This is calculating the pixel of the higest value. (Top pixel)
    let yOffset = g.toDomCoords(null, yar0[1])[1];

    // x y w and h are relative to the corner of the drawing area,
    // so that the upper corner of the drawing area is (0, 0).
    let x = offsetX - xOffset;
    let y = offsetY - yOffset;

    // This is computing the rightmost pixel, effectively defining the
    // width.
    let w = g.toDomCoords(g.xAxisRange()[1], null)[0] - xOffset;

    // This is computing the lowest pixel, effectively defining the height.
    let h = g.toDomCoords(null, yar0[0])[1] - yOffset;

    // Percentage from the left.
    let xPct = w === 0 ? 0 : (x / w);
    // Percentage from the top.
    let yPct = h === 0 ? 0 : (y / h);

    // The (1-) part below changes it from "% distance down from the top"
    // to "% distance up from the bottom".
    return [xPct, (1 - yPct)];
}

export function mouseDoubleClick(event: MouseEvent, graph: Dygraph, context: CanvasRenderingContext2D) {
    // Reducing by 20% makes it 80% the original size, which means
    // to restore to original size it must grow by 25%


    if ((graph.width_ + context.px) - event.x <= yAxisWidth + 10) { // There seems to be 10 pixels of padding for y axis
        graph.updateOptions({
            axes: { y2: { valueRange: null }, y: { valueRange: null } }, // y1 valuerange must be updated for y2 changes to be triggered
        }); // Makes chart autoscale
    }

    event.preventDefault();
}

let lastClickedGraph = null;

export function mouseClick(event: MouseEvent, graph: Dygraph, context: CanvasRenderingContext2D) {
    lastClickedGraph = graph;

    const { canvas_ctx_: canvas } = graph;
    const canvasX = event.x - context.px;
    const canvasY = event.y - context.py;
    const squareSize = 50;
    canvas.fillStyle = "#00ccff";
    // canvas.fillRect(canvasX - squareSize / 2, canvasY - squareSize / 2, squareSize, squareSize);


    event.preventDefault();
}

export function mouseScroll(event, g, context) {
    if (lastClickedGraph != g) {
        return;
    }
    let normal = event.detail ? event.detail * -1 : event.wheelDelta / 40;
    // For me the normalized value shows 0.075 for one click. If I took
    // that verbatim, it would be a 7.5%.
    let percentage = normal / 50;

    if (!(event.offsetX && event.offsetY)) {
        event.offsetX = event.layerX - event.target.offsetLeft;
        event.offsetY = event.layerY - event.target.offsetTop;
    }

    let percentages = offsetToPercentage(g, event.offsetX, event.offsetY);
    let xPct = percentages[0];
    let yPct = percentages[1];


    zoom(g, percentage, xPct, yPct, true);
    event.preventDefault();
}

