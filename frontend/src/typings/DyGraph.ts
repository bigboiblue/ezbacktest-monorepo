import DyGraph from "dygraphs";


type DyEvent = {
    points: DyPoint[];
    setName: string;
    drawingContext: CanvasRenderingContext2D;
    color: string;
    strokeWidth: number;
    dygraph: DyGraph;
    axis: Axis;
    plotArea: { x: number; y: number; w: number; h: number };
    seriesIndex: number;
    seriesCount: number;
    allSeriesPoints: DyPoint[][];
}

type Axis = {
    g: Dygraph;
    extremeRange: any[];
    computedValueRange: any[];
    independentTicks: boolean;
    ticks: any[];
    minyval: number;
    maxyval: number;
    yrange: number;
    yscale: number;
}

type DyPoint = {
    x: number;
    y: number;
    xval: number;
    yval: number;
    name: string;
    idx: number;
    canvasx: number;
    canvasy: number;
}

export { DyEvent, Axis, DyPoint };
