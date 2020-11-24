import React, {
    useState, useEffect, useRef, ReactElement,
} from "react";
import DyGraph from "dygraphs";
import path from "path";
import { CropLandscapeOutlined, ControlPointSharp, GraphicEqOutlined } from "@material-ui/icons";
import axios from "axios";
import { setRef } from "@material-ui/core";
import { ThemeContext, ThemeType } from "../../../styles/GlobalUserTheme";
import { AllChartsContainer, ChartContainer, ChartContainer2 } from "../styles/ChartStyles";
import { OHLCPlotter } from "./OHLCPlotter";
import {
    mouseDown, mouseMove, mouseUp, mouseClick, mouseDoubleClick, mouseScroll,
} from "./interactionModel";
import { X_AXIS_WIDTH, Y_AXIS_WIDTH } from "./defaults";
import synchronize from "./DyPlugins/synchronize";
import { ohlcData } from "../../../assets/data/aapl_1d";
import { ChartSettings, Sector } from "./chart_typings";
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

let containers: ReactElement[] = [];
let graphs: DyGraph[] = [];
interface Props { }

/**
 * Styles of Dygraphs are embedded into the styled component in style/ChartStyle.js
 *
 */
function Chart(props: Props): React.ReactElement {
    const [forceUpdate, setForceUpdate] = useState(false);
    const chartRefs = useRef([]);

    if (!chartSettings.isInitialised) {
        /** //TODO:: THIS NEEDS TO BE A SINGLETON */
        axios.get("http://localhost:8081/api/v1/chart?user_id=1")
            .then((ret) => {
                if (!ret.data.isError) {
                    chartSettings.initialise(ret.data.payload);
                    chartSettings.date_start = new Date(chartSettings.date_start);
                    chartSettings.date_end = new Date(chartSettings.date_end);
                }

                /** //TODO:  remove this , this is temporary (for testing) */
                const wot = {
                    user_id: 1,
                    name: "default",
                    current: true,
                    symbol: "EURUSD",
                    period: "1D",
                    date_start: new Date(),
                    date_end: new Date(),
                    theming: {
                        bg_color: "#cccccc",
                        font_color: "#000000",
                        axis_line_color: "#ffffff",
                        axis_bg_color: "#cccccc",
                        x_axis_margin: 10,
                        y_axis_margin: 10,
                        grid_enabled: true,
                        grid_color: "#666666",
                    },
                    sectors: [{
                        position: 2,
                        size: 0.7,
                        indicators: [{
                            link: "raw.js",
                            params: {
                                style: "candlestick", upColor: "#3ccf5e", downColor: "#f75c5c", lineColor: "#202020",
                            },
                            z_index: 1,
                        }],
                        theming: {},
                        drawings: [{
                            type: "square",
                            location: [0, 0],
                            height: 10,
                            bg_color: "#0000ff",
                            line_color: "#000000",
                            width: 10,
                            z_index: 1,
                        }],
                    }, {
                        position: 1,
                        size: 0.3,
                        indicators: [{
                            link: "raw.js",
                            params: {
                                style: "candlestick", upColor: "#3ccf5e", downColor: "#f75c5c", lineColor: "#202020",
                            },
                            z_index: 1,
                        }],
                        theming: {},
                        drawings: [{
                            type: "square",
                            location: [0, 0],
                            height: 10,
                            bg_color: "#0000ff",
                            line_color: "#000000",
                            width: 10,
                            z_index: 1,
                        }],
                    }],
                };
                chartSettings.initialise(wot);
                setForceUpdate(!forceUpdate);
            });
    }

    useEffect(() => {
        if (!chartSettings.isInitialised) return;


        const { theming } = chartSettings;
        const allContainers: ReactElement[] = [];
        for (let i = 0; i < chartSettings.sectors.length; i++) {
            const sector = chartSettings.sectors[i];
            allContainers.push(<ChartContainer
                key={`${chartSettings.name}:${sector.position}`}
                flex={sector.size}
                order={sector.position}
                bg_color={theming.bg_color}
                font_color={theming.font_color}
                ref={(reference) => { chartRefs.current[i] = reference; }}
            />);
        }
        containers = allContainers;
        setForceUpdate(!forceUpdate);

        console.log("OIJ");
    }, [chartSettings.isInitialised]);

    // TODO: add margin, grid and axis theming loading
    useEffect(() => {
        if (containers.length === 0) return;
        const allGraphs: DyGraph[] = [];
        const maxPosition = Math.max(...(chartSettings.sectors.map((val) => val.position)));
        for (let i = 0; i < chartSettings.sectors.length; i++) {
            const sector = chartSettings.sectors[i];
            const shouldDrawXAxis = sector.position === maxPosition;
            allGraphs.push(new DyGraph(chartRefs.current[i], ohlcData,
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
                        x: { axisLabelFontSize: X_AXIS_WIDTH, drawGrid: false, drawAxis: shouldDrawXAxis },
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
                }));
        }
        graphs = allGraphs;
        if (graphs.length > 1) {
            // @ts-ignore
            let sync = DyGraph.synchronize(...graphs);
        }
    }, [containers]);

    const overallHeight = "50rem"; //rem
    return (
        <AllChartsContainer height={overallHeight}>
            {containers}
        </AllChartsContainer>
    );
}

export default Chart;
