import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DyGraph from "dygraphs";
import path from "path";
import { CropLandscapeOutlined, ControlPointSharp } from "@material-ui/icons";
import Axios from "axios";
import { ThemeContext, ThemeType } from "../../../styles/GlobalUserTheme";
import { ChartContainer, ChartContainer2 } from "../styles/ChartStyles";
import { OHLCPlotter } from "./OHLCPlotter";
import {
    mouseDown, mouseMove, mouseUp, mouseClick, mouseDoubleClick, mouseScroll,
} from "./interactionModel";
import { X_AXIS_WIDTH, Y_AXIS_WIDTH } from "./defaults";
import synchronize from "./DyPlugins/synchronize";
import { ohlcData } from "../../../assets/data/aapl_1d";
import { ChartSettings } from "./chart_typings";
import chartSettings from "./ChartSettings";
//@ts-ignore
DyGraph.synchronize = synchronize;

const TIME_OFFSET = 0;
const OPEN_OFFSET = 1;
const HIGH_OFFSET = 2;
const LOW_OFFSET = 3;
const CLOSE_OFFSET = 4;
const VOLUME_OFFSET = 5;

for (let i = 0; i < ohlcData.length; i++) {
    ohlcData[i][TIME_OFFSET] = new Date(ohlcData[i][TIME_OFFSET]);
    ohlcData[i].pop(); //Temporarily remove volume
}

const otherData = JSON.parse(JSON.stringify(ohlcData)); // Deep copy
for (let i = 0; i < otherData.length; i++) {
    otherData[i][TIME_OFFSET] = new Date(ohlcData[i][TIME_OFFSET]);

    // otherData[i].pop();
    // otherData[i].pop();
    // otherData[i].pop();
}

interface Props { }

/**
 * Styles of Dygraphs are embedded into the styled component in style/ChartStyle.js
 *
 */
function Chart(props: Props): React.ReactElement {
    const [ohlcs, setOHLCs] = useState([]);
    const [forceUpdateVal, forceUpdate] = useState(false);
    const [graph, setGraph] = useState();
    const [graph2, setGraph2] = useState();
    const chartRef = useRef(null);
    const chartRef2 = useRef(null);


    if (!chartSettings.isInitialised) {
        /** //TODO:: THIS NEEDS TO BE A SINGLETON */
        Axios.get("http://localhost:8081/api/v1/chart?user_id=1")
            .then((ret) => {
                if (!ret.data.isError) {
                    chartSettings.initialise(ret.data.payload);
                    chartSettings.date_start = new Date(chartSettings.date_start);
                    chartSettings.date_end = new Date(chartSettings.date_end);
                }
            });
    }

    useEffect(() => {
        //TODO: pass args to plotter for EMA etc.
        let g1 = new DyGraph(chartRef.current, ohlcData,
            {
                labels: ["time", "open", "high", "low", "close"],
                digitsAfterDecimal: 5,
                plotter: (e) => { OHLCPlotter(e, "Other", "args"); },
                series: {
                    open: { axis: "y2" },
                    high: { axis: "y2" },
                    low: { axis: "y2" },
                    close: { axis: "y2" },
                },
                interactionModel: {
                    mousedown: mouseDown,
                    mousemove: mouseMove,
                    mouseup: mouseUp,
                    click: mouseClick,
                    dblclick: mouseDoubleClick,
                    mousewheel: mouseScroll,
                },
                axes: {
                    x: { axisLabelFontSize: X_AXIS_WIDTH, drawGrid: false, drawAxis: false },
                    y: {
                        drawGrid: false, // Must be true to see y2 grid
                        axisLabelWidth: 0,
                        independentTicks: false,
                        // To hide y1 axis, set font size to 0 in styles
                    },
                    y2: {
                        drawGrid: true,
                        axisLabelWidth: Y_AXIS_WIDTH,
                        independentTicks: true,
                    },
                },
                highlightCircleSize: 0, // remove highlight circles,
            });
        let g2 = new DyGraph(chartRef2.current, otherData,
            {
                labels: ["time", "open", "high", "low", "close"],
                digitsAfterDecimal: 5,
                // plotter: (e) => { OHLCPlotter(e, "Other", "args"); },
                series: {
                    open: { axis: "y2" },
                    high: { axis: "y2" },
                    low: { axis: "y2" },
                    close: { axis: "y2" },
                },
                interactionModel: {
                    mousedown: mouseDown,
                    mousemove: mouseMove,
                    mouseup: mouseUp,
                    click: mouseClick,
                    dblclick: mouseDoubleClick,
                    mousewheel: mouseScroll,
                },
                axes: {
                    x: { axisLabelFontSize: X_AXIS_WIDTH, drawGrid: false },
                    y: {
                        drawGrid: false, // Must be true to see y2 grid
                        axisLabelWidth: 0,
                        independentTicks: false,
                        // To hide y1 axis, set font size to 0 in styles
                    },
                    y2: {
                        drawGrid: true,
                        axisLabelWidth: Y_AXIS_WIDTH,
                        independentTicks: true,
                    },
                },
                highlightCircleSize: 0, // remove highlight circles,
            });

        setGraph(g1);
        setGraph2(g2);
        let sync = DyGraph.synchronize(g1, g2);
    }, []);

    return (
        <>
            <ChartContainer ref={chartRef} />
            <ChartContainer2 ref={chartRef2} />
        </>
    );
}

export default Chart;
