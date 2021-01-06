import React, {
    useState, useEffect, useRef, ReactElement,
} from "react";
import DyGraph from "dygraphs";
import axios from "axios";
import path from "path";
import { ThemeContext, ThemeType } from "../../../styles/GlobalUserTheme";
import { AllChartsContainer, ChartContainer } from "../styles/ChartStyles";
import {
    mouseDown, mouseMove, mouseUp, mouseClick, mouseDoubleClick, mouseScroll,
} from "./interactionModel";
import { X_AXIS_WIDTH, Y_AXIS_WIDTH } from "./default_values.js";
import synchronize from "./DyPlugins/synchronize";
import { ohlcData } from "../../../assets/data/aapl_1d";
import {
    CalculateOptions, ChartSettings, ChartStyles, Data, Params, Sector,
} from "./typings/chart";
import chartSettings from "./ChartSettings";
import allPlotter from "./Plotters/allPlotter";
import calculate from "./Indicators/raw";
import { CalculateFunction, CalculateReturn, DyData } from "./typings/script";
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


const getBody = (str: string) => str.substring(
    str.indexOf("{") + 1,
    str.lastIndexOf("}"),
);


async function getScriptFunctions(sectors: Sector[]): Promise<Function[][]> {
    let user_ids = [];
    let names = [];
    for (let i = 0; i < sectors.length; i++) {
        let sector = sectors[i];
        let indicators = sector.indicators;
        user_ids = [...user_ids, ...(indicators.map((obj) => obj.user_id))];
        names = [...names, ...(indicators.map((obj) => obj.name))];
    }
    const scripts: { function: string; name: string; user_id: string }[] = (await axios({
        method: "POST",
        url: "http://localhost:8081/api/v1/script/get",
        data: { names, user_ids },
    })).data.scripts;
    if (scripts.length !== names.length) { // Fix for having less functions returned since you are using 2 of the same script on 1 chart
        for (let i = 0; i < names.length - 1; i++) {
            const sameAsNext = scripts[i].name === names[i + 1] && scripts[i].user_id === user_ids[i + 1];
            if (sameAsNext) { // Then duplicate
                scripts.splice(i + 1, 0, scripts[i]);
            }
        }
    }


    /** Turn returned array into an array of array. Each sub array corresponds to a sector
     *  Also converts strings into functions
     */
    const ret: Function[][] = [];
    let offset = 0;
    for (let i = 0; i < sectors.length; i++) {
        let sector = sectors[i];
        const indicatorFunctions: Function[] = [];
        for (let j = 0; j < sector.indicators.length; j++) {
            indicatorFunctions.push(new Function("_ref", getBody(scripts[offset].function))); // eslint-disable-line
            offset++;
        }
        ret.push(indicatorFunctions);
    }
    return ret;
}

/*** Combines the calculated indicator values into a format acceptable by DyGraphs.
 * * This format is: [Date, ...number[]][]
 */
function combineIndicatorVals(allData: DyData[]): DyData {
    const DATE_INDEX = 0;
    if (allData.length === 1) return allData[0];

    const ret: DyData = [];
    for (let i = 0; i < allData.length; i++) {
        const indicatorData = allData[i];
        for (let j = 0; j < indicatorData.length; j++) {
            const current = indicatorData[j];
            const len = current.length;
            /** Add all dates (all OHLC dates must remain present in OHLC return) */
            if (i === 0) ret.push([current[DATE_INDEX]]);
            for (let x = 1; x < current.length; x++) { // Starts at 1 to skip the date index
                ret[j].push(current[x]);
            }
        }
    }
    return ret;
}


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
                const wot: ChartSettings = {
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
                        position: 1,
                        size: 0.7,
                        indicators: [{
                            name: "raw",
                            user_id: "TEST",
                            private: false,
                            params: {
                                styles: {
                                    OHLC: {
                                        type: "candlestick",
                                        upColor: "#3ccf5e",
                                        upBorder: "#202020",
                                        downColor: "#f75c5c",
                                        downBorder: "#202020",
                                        dojiColor: "#202020",
                                    },
                                },
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
                        position: 2,
                        size: 0.3,
                        indicators: [
                            {
                                name: "raw",
                                user_id: "TEST",
                                private: false,
                                params: {
                                    styles: {
                                        OHLC: {
                                            type: "candlestick",
                                            upColor: "#3ccf5e",
                                            upBorder: "#202020",
                                            downColor: "#f75c5c",
                                            downBorder: "#202020",
                                            dojiColor: "#202020",
                                        },
                                    },
                                },
                                z_index: 1,
                            },
                            // {
                            //     name: "MACD",
                            //     user_id: "TEST",
                            //     private: false,
                            //     params: {
                            //         styles: {
                            //             "Slow MACD": {
                            //                 type: "line",
                            //                 color: "#3ccf5e",
                            //             },
                            //             "Fast MACD": {
                            //                 type: "line",
                            //                 color: "#3ccf5e",
                            //             },
                            //             Histogram: {
                            //                 type: "bar",
                            //                 color: "#3ccf5e",
                            //             },
                            //         },
                            //     },
                            //     z_index: 1,
                            // }
                        ],
                        theming: {},
                        drawings: [],
                    }],
                };
                chartSettings.initialise(wot);
                setForceUpdate(!forceUpdate);
            });
    }

    // Set refs for use in next useEffect
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
    }, [chartSettings.isInitialised]);

    // TODO: add margin, grid and axis theming loading
    useEffect(() => {
        (async () => {
            if (containers.length === 0) return;
            await axios({
                method: "POST",
                url: "http://localhost:8081/api/v1/script/add",
                data: { user_id: "TEST", name: "raw", function: calculate.toString() },
            });

            const allGraphs: DyGraph[] = [];
            const maxPosition = Math.max(...(chartSettings.sectors.map((val) => val.position)));
            const functions = await getScriptFunctions(chartSettings.sectors);
            //// Sector init
            for (let i = 0; i < chartSettings.sectors.length; i++) {
                const sector = chartSettings.sectors[i];
                const shouldDrawXAxis = sector.position === maxPosition; // Only draw x axis at the bottom


                //// Indicator init
                const indicatorStyles: ChartStyles[] = [];
                const indicatorVals: DyData[] = [];
                const indicatorLabels: string[] = [];
                for (let j = 0; j < sector.indicators.length; j++) {
                    const indicator = sector.indicators[j];
                    // @ts-ignore
                    const calcFunction: CalculateFunction = functions[i][j];
                    // @ts-ignore
                    const ret = calcFunction({ data: ohlcData, params: indicator.params });
                    indicatorStyles.push(ret.styles);
                    indicatorVals.push(ret.data);
                    if (Object.values(ret.styles)[0].upColor) { // If this is a candlestick chart
                        indicatorLabels.push("open", "high", "low", "close");
                    } else {
                        indicatorLabels.push(...(Object.keys(ret.styles).map((s) => s.toLowerCase())));
                    }
                }
                const graphData = combineIndicatorVals(indicatorVals);
                allGraphs.push(new DyGraph(chartRefs.current[i], graphData,
                    {
                        labels: ["time", ...indicatorLabels],
                        digitsAfterDecimal: 5,
                        plotter: (e) => { allPlotter(e, { indicatorStyles }); },
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
        })(); // Call the async function
    }, [containers]);

    const overallHeight = "50rem"; //rem
    return (
        <AllChartsContainer height={overallHeight}>
            {containers}
        </AllChartsContainer>
    );
}

export default Chart;
